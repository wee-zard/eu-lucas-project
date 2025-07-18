package com.lucas.spring.components.coordinate.y;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.coordinate.y.model.entity.CoordinateYthEntity;
import com.lucas.spring.components.coordinate.y.service.CoordinateYthService;
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
public class CoordinateYthController {
  public final CoordinateYthService coordinateYthService;

  /**
   * Get the y-th coordinates from the server.
   *
   * @param user The user who initiated the request.
   * @return Returns the list of y coordinates.
   */
  @CrossOrigin
  @GetMapping("/get-coordinate-y")
  public List<CoordinateYthEntity> getCoordinateYthEntities(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user
  ) {
    return coordinateYthService.getCoordinateYs();
  }
}
