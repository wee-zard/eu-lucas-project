package com.lucas.spring.components.plant;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.services.CustomConversionService;
import com.lucas.spring.components.plant.model.dto.PlantSpeciesDto;
import com.lucas.spring.components.plant.service.PlantSpeciesService;
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
  private final CustomConversionService conversionService;

  /**
   * Fetches the list of plant species.
   *
   * @param authenticatedUser The user who initiated the request.
   * @return Returns the list of plant species stored in the server.
   */
  @CrossOrigin
  @GetMapping("/")
  public List<PlantSpeciesDto> getPlantSpecies(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser authenticatedUser
  ) {
    return conversionService.convert(
            plantSpeciesService.getPlantSpecies(),
            PlantSpeciesDto.class
    );
  }
}
