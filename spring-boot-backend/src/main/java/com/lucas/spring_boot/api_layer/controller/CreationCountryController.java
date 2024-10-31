package com.lucas.spring_boot.api_layer.controller;

import com.lucas.spring_boot.model_layer.entity.CreationCountryEntity;
import com.lucas.spring_boot.service_layer.service.CreationCountryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/country")
public class CreationCountryController {
    private CreationCountryService creationCountryService;

    @GetMapping("/get-creation-countries")
    public ArrayList<CreationCountryEntity> getCreationDirection(){
        return creationCountryService.getCreationCountries();
    };
}
