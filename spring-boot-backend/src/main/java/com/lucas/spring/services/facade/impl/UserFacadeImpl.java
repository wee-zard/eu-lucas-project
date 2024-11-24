package com.lucas.spring.services.facade.impl;

import com.lucas.spring.model.entity.StatusEntity;
import com.lucas.spring.model.enums.StatusEnum;
import com.lucas.spring.model.expection.EncryptionFailedException;
import com.lucas.spring.services.facade.UserFacade;
import com.lucas.spring.services.service.EncryptionService;
import com.lucas.spring.services.service.StatusService;
import com.lucas.spring.services.service.UserService;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserFacadeImpl implements UserFacade {
    private static final String ADMIN_EMAIL = "udvattila99@gmail.com";
    private EncryptionService encryptionService;
    private UserService userService;
    private StatusService statusService;
    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isEmailRegisteredInDB(String emailAddress) {
        return userService.getAllUsersEmail()
            .stream()
            .map(hashedEmail -> encryptionService.decrypt(hashedEmail))
            .collect(Collectors.toCollection(ArrayList::new)
            ).stream()
            .anyMatch(nonHashedEmail -> nonHashedEmail != null && nonHashedEmail.split(" ")[0].equals(emailAddress));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void saveEmailAddress(String emailAddress) {
        StatusEntity statusEntity = statusService.getStatusById(StatusEnum.PENDING.getStatusId());
        String encryptedString = encryptionService.encrypt(emailAddress);
        if (encryptedString != null) {
            userService.saveEmailAddress(encryptedString, statusEntity);
        } else {
            throw new EncryptionFailedException();
        }
    }

    /**
     * Init the user table with a default user who could get
     * access to the application.
     */
    @PostConstruct
    private void defaultUserAddition() {
        ArrayList<String> userEmails = userService.getAllUsersEmail();
        if (userEmails.isEmpty()) {
            saveEmailAddress(ADMIN_EMAIL);
        }
    }
}
