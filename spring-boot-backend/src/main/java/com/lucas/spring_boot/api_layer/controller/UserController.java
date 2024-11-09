package com.lucas.spring_boot.api_layer.controller;

import com.lucas.spring_boot.model_layer.expection.PermissionDeniedException;
import com.lucas.spring_boot.model_layer.request.EmailRequest;
import com.lucas.spring_boot.service_layer.facade.UserFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import com.lucas.spring_boot.model_layer.expection.LoginException;

@RestController
@RequestMapping(path = "api/user")
@AllArgsConstructor
public class UserController {
    private UserFacade userFacade;
    @PostMapping("/validate-email")
    public @ResponseBody void postValidateEmailAddress(@RequestBody EmailRequest emailRequest) {
        final boolean isEmailRegistered = userFacade.isEmailRegisteredInDB(emailRequest.getEmailAddress());
        if (!isEmailRegistered) {
            throw new LoginException();
        }
    }

    /**
     * @param authentication The authenticated user who initiated someone's email to be added to the server.
     * @param emailRequest The email address to add to the server. It is different from the authenticator's email.
     */
    @PostMapping("/save-email")
    public @ResponseBody void postEmailAddressToDB(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authentication, /* This should be a Google OAuth2 token! */
            @RequestBody EmailRequest emailRequest
    ) {
        if (authentication == null) {
            throw new PermissionDeniedException();
        }
        /*
         * TODO: Extra step: Validate, if the Authentication is a valid Google OAuth2 token,
         *  and the email address from the token is present in the system or not.
         */
        final boolean isEmailRegistered = userFacade.isEmailRegisteredInDB(authentication);
        if (!isEmailRegistered) {
            throw new PermissionDeniedException();
        }
        userFacade.saveEmailAddress(emailRequest.getEmailAddress());
    }
}
