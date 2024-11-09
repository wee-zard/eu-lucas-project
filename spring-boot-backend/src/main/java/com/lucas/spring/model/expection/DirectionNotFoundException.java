package com.lucas.spring.model.expection;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND, reason="Image Creation Direction is not found!")
public class DirectionNotFoundException extends RuntimeException{

}
