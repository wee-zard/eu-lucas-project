package com.lucas.spring.model.expection;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_ACCEPTABLE, reason="Something unexpected happened during email validation!")
public class LoginException extends RuntimeException{
    public LoginException() {
        super("Something unexpected happened during email validation!");
    }
}
