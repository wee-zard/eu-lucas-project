package com.lucas.spring.controllers;

import com.lucas.spring.helper.helper.ConversionHelper;
import com.lucas.spring.model.dto.PlantSpeciesDto;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.service.PlantSpeciesService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the species names of the plants.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/plant-species")
public class PlantSpeciesController {
  private final PlantSpeciesService plantSpeciesService;
  private final ConversionHelper conversionHelper;

  /**
   * Fetches the list of plant species.
   *
   * @param authenticatedUser The user who initiated the request.
   * @return Returns the list of plant species stored in the server.
   */
  @CrossOrigin
  @GetMapping("/")
  public List<PlantSpeciesDto> getPlantSpecies(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return conversionHelper.convertEntityToDto(
            plantSpeciesService.getPlantSpecies(),
            PlantSpeciesDto.class
    );
  }
}
