package com.lucas.spring.controllers;

import com.lucas.spring.model.entity.CreationDirectionEntity;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.service.CreationDirectionService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the creation direction.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/direction")
public class CreationDirectionController {
  private final CreationDirectionService creationDirectionService;

  @CrossOrigin
  @GetMapping("/get-creation-direction")
  public ArrayList<CreationDirectionEntity> getCreationDirection(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return creationDirectionService.getCreationDirections();
  }
}
