package com.lucas.spring.api.controllers;

import com.lucas.spring.helper.annotations.token.TokenValidation;
import com.lucas.spring.model.entity.CoordinateYEntity;
import com.lucas.spring.services.service.CoordinateYService;
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
@RequestMapping(path = "api/coordinate-y")
public class CoordinateYController {
  public final CoordinateYService coordinateYService;

  @CrossOrigin
  @TokenValidation
  @GetMapping("/get-coordinate-y")
  public ArrayList<CoordinateYEntity> getCoordinateYEntities(
        @RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication
  ) {
    return coordinateYService.getCoordinateYs();
  }
}
