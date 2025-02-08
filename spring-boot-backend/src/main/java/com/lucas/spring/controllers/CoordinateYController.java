package com.lucas.spring.controllers;

import com.lucas.spring.model.entity.CoordinateYEntity;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.service.CoordinateYService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the y-th coordinates of the images.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/coordinate-y")
public class CoordinateYController {
  public final CoordinateYService coordinateYService;

  @CrossOrigin
  @GetMapping("/get-coordinate-y")
  public List<CoordinateYEntity> getCoordinateYEntities(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return coordinateYService.getCoordinateYs();
  }
}
