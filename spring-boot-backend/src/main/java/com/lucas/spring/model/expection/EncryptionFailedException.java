package com.lucas.spring.model.expection;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_ACCEPTABLE, reason="Something unexpected happened during encryption!")
public class EncryptionFailedException extends RuntimeException{
}
