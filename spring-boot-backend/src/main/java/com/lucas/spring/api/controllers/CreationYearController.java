package com.lucas.spring.api.controllers;

import com.lucas.spring.model.entity.CreationYearEntity;
import com.lucas.spring.services.service.CreationYearService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the creation year.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/year")
public final class CreationYearController {
  private final CreationYearService creationYearService;

  @GetMapping("/get-creation-year")
  public ArrayList<CreationYearEntity> getCreationYears() {
    return creationYearService.getCreationYears();
  }
}
