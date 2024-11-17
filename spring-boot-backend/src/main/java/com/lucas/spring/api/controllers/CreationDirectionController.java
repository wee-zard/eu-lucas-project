package com.lucas.spring.api.controllers;

import com.lucas.spring.helper.annotations.token.TokenValidation;
import com.lucas.spring.model.entity.CreationDirectionEntity;
import com.lucas.spring.services.service.CreationDirectionService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

/**
 * Stores the endpoints related to the creation direction.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/direction")
public class CreationDirectionController {
  private final CreationDirectionService creationDirectionService;

  @CrossOrigin
  @TokenValidation
  @GetMapping("/get-creation-direction")
  public ArrayList<CreationDirectionEntity> getCreationDirection(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication
  ) {
    return creationDirectionService.getCreationDirections();
  }
}
