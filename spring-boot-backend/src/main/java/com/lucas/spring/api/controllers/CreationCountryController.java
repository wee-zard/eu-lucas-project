package com.lucas.spring.api.controllers;

import com.lucas.spring.model.entity.CreationCountryEntity;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.service.CreationCountryService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the creation country.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/country")
public class CreationCountryController {
  private final CreationCountryService creationCountryService;

  @CrossOrigin
  @GetMapping("/get-creation-countries")
  public ArrayList<CreationCountryEntity> getCreationDirection(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return creationCountryService.getCreationCountries();
  }
}
