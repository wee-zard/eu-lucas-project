package com.lucas.spring_boot.model_layer.expection;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND, reason="Image Creation Year is not found!")
public class YearNotFoundException extends RuntimeException{

}
