package com.lucas.spring.api.controllers;

import com.lucas.spring.model.entity.CreationDirectionEntity;
import com.lucas.spring.services.service.CreationDirectionService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the creation direction.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/direction")
public final class CreationDirectionController {
  private final CreationDirectionService creationDirectionService;

  @GetMapping("/get-creation-direction")
  public ArrayList<CreationDirectionEntity> getCreationDirection() {
    return creationDirectionService.getCreationDirections();
  }
}
