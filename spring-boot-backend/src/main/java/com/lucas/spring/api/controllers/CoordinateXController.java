package com.lucas.spring.api.controllers;

import com.lucas.spring.helper.annotations.token.TokenValidation;
import com.lucas.spring.model.entity.CoordinateXEntity;
import com.lucas.spring.services.service.CoordinateXService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/coordinate-x")
public class CoordinateXController {
  public final CoordinateXService coordinateXService;

  @CrossOrigin
  @TokenValidation
  @GetMapping("/get-coordinate-x")
  public ArrayList<CoordinateXEntity> getCoordinateXEntities(
      @RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication
  ) {
    return coordinateXService.getCoordinateXs();
  }
}
