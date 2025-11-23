package com.lucas.spring.components.plant;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.services.CustomConversionService;
import com.lucas.spring.components.plant.model.dto.PlantDto;
import com.lucas.spring.components.plant.service.PlantService;
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
  private final CustomConversionService conversionService;

  /**
   * Fetches the list of plants.
   *
   * @param authenticatedUser The user who initiated the request.
   * @return Returns the list of plants stored in the server.
   */
  @CrossOrigin
  @GetMapping("/")
  public List<PlantDto> getPlants(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser authenticatedUser
  ) {
    return conversionService.convert(plantService.getPlants(), PlantDto.class);
  }
}
