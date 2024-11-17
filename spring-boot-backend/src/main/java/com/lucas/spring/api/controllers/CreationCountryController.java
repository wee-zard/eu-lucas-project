package com.lucas.spring.api.controllers;

import com.lucas.spring.helper.annotations.token.TokenValidation;
import com.lucas.spring.model.entity.CreationCountryEntity;
import com.lucas.spring.services.service.CreationCountryService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

/**
 * Stores the endpoints related to the creation country.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/country")
public class CreationCountryController {
  private final CreationCountryService creationCountryService;

  @CrossOrigin
  @TokenValidation
  @GetMapping("/get-creation-countries")
  public ArrayList<CreationCountryEntity> getCreationDirection(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication
  ) {
    return creationCountryService.getCreationCountries();
  }
}
