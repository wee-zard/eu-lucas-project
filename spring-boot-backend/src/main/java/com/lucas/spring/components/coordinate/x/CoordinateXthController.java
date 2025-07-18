package com.lucas.spring.components.coordinate.x;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.coordinate.x.model.entity.CoordinateXthEntity;
import com.lucas.spring.components.coordinate.x.service.CoordinateXthService;
import java.util.List;
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
public class CoordinateXthController {
  private final CoordinateXthService coordinateXthService;

  /**
   * Fetches the list of x coordinates and give them back as a list.
   *
   * @param authenticatedUser The user who initiated the request.
   * @return Returns the list of x coordinates.
   */
  @CrossOrigin
  @GetMapping("/get-coordinate-x")
  public List<CoordinateXthEntity> getCoordinates(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return coordinateXthService.getCoordinateXs();
  }
}
