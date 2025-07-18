package com.lucas.spring.components.direction;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.direction.model.entity.CreationDirectionEntity;
import com.lucas.spring.components.direction.service.CreationDirectionService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the creation direction.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/direction")
public class CreationDirectionController {
  private final CreationDirectionService creationDirectionService;

  /**
   * Fetch the creation directions from the server.
   *
   * @param user The user who initialized the request.
   * @return Returns the list of creation directions.
   */
  @CrossOrigin
  @GetMapping("/get-creation-direction")
  public List<CreationDirectionEntity> getCreationDirection(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user
  ) {
    return creationDirectionService.getCreationDirections();
  }
}
