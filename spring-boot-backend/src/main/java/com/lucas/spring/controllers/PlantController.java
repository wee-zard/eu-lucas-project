package com.lucas.spring.controllers;

import com.lucas.spring.helper.helper.ConversionHelper;
import com.lucas.spring.model.dto.PlantDto;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.service.PlantService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the plants.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/plant")
public class PlantController {
  private final PlantService plantService;
  private final ConversionHelper conversionHelper;

  /**
   * Fetches the list of plants.
   *
   * @param authenticatedUser The user who initiated the request.
   * @return Returns the list of plants stored in the server.
   */
  @CrossOrigin
  @GetMapping("/")
  public List<PlantDto> getPlants(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return conversionHelper.convertList(plantService.getPlants(), PlantDto.class);
  }
}
