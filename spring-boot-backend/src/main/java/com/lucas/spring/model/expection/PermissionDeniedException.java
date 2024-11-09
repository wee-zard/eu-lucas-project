package com.lucas.spring.model.expection;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.UNAUTHORIZED, reason="You do not have permission to access the resources!")
public class PermissionDeniedException extends RuntimeException {
    public PermissionDeniedException() {
        super("You do not have permission to access the resources!");
    }
}
