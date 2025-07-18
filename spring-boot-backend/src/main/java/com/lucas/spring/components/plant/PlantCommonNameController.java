package com.lucas.spring.components.plant;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.plant.model.entity.PlantCommonNameEntity;
import java.util.Collections;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the common names of the plants.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/plant-common")
public class PlantCommonNameController {

  /**
   * Fetches the list of plant common names.
   *
   * @param authenticatedUser The user who initiated the request.
   * @return Returns the list of plant common names stored in the server.
   */
  @CrossOrigin
  @GetMapping("/")
  public List<PlantCommonNameEntity> getPlantCommons(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    // TODO: Implement the fetch of plants common names from the server here.
    return Collections.emptyList();
  }
}
