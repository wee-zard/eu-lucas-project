package com.lucas.spring.api.controllers;

import com.lucas.spring.model.entity.CoordinateXEntity;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.service.CoordinateXService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the x-th coordinates of the images.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/coordinate-x")
public class CoordinateXController {
  public final CoordinateXService coordinateXService;

  /**
   * Fetches the list of x coordinates and give them back as a list.
   *
   * @param authenticatedUser The user who initiated the request.
   * @return Returns the list of x coordinates.
   */
  @CrossOrigin
  @GetMapping("/get-coordinate-x")
  public ArrayList<CoordinateXEntity> getCoordinates(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return coordinateXService.getCoordinateXs();
  }
}
