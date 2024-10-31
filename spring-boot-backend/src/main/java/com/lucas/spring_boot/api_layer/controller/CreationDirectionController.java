package com.lucas.spring_boot.api_layer.controller;

import com.lucas.spring_boot.model_layer.entity.CreationDirectionEntity;
import com.lucas.spring_boot.service_layer.service.CreationDirectionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/direction")
public class CreationDirectionController {
    private CreationDirectionService creationDirectionService;
    @GetMapping("/get-creation-direction")
    public ArrayList<CreationDirectionEntity> getCreationDirection(){
        return creationDirectionService.getCreationDirections();
    };
}
