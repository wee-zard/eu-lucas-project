package com.lucas.spring.api.controllers;

import com.lucas.spring.model.entity.CreationCountryEntity;
import com.lucas.spring.services.service.CreationCountryService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the creation country.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/country")
public final class CreationCountryController {
  private final CreationCountryService creationCountryService;

  @GetMapping("/get-creation-countries")
  public ArrayList<CreationCountryEntity> getCreationDirection() {
    return creationCountryService.getCreationCountries();
  }
}
