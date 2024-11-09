package com.lucas.spring.model.expection;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND, reason="User Status is not found in the server!")
public class StatusNotFoundException extends RuntimeException{
    public StatusNotFoundException() {
        super("User Status is not found in the server!");
    }
}
