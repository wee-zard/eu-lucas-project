package com.lucas.spring_boot.api_layer.controller;

import com.lucas.spring_boot.model_layer.entity.CreationYearEntity;
import com.lucas.spring_boot.service_layer.service.CreationYearService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/year")
public class CreationYearController {
    private CreationYearService creationYearService;
    @GetMapping("/get-creation-year")
    public ArrayList<CreationYearEntity> getCreationYears(){
        return creationYearService.getCreationYears();
    };
}
