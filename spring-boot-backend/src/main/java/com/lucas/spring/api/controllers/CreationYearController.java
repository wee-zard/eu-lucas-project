package com.lucas.spring.api.controllers;

import com.lucas.spring.helper.annotations.token.TokenValidation;
import com.lucas.spring.model.entity.CreationYearEntity;
import com.lucas.spring.services.service.CreationYearService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;

/**
 * Stores the endpoints related to the creation year.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/year")
public class CreationYearController {
  private final CreationYearService creationYearService;

  @CrossOrigin
  @TokenValidation
  @GetMapping("/get-creation-years")
  public ArrayList<CreationYearEntity> getCreationYears(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication
  ) {
    return creationYearService.getCreationYears();
  }
}
