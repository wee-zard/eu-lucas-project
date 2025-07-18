package com.lucas.spring.components.country;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.country.model.entity.CreationCountryEntity;
import com.lucas.spring.components.country.service.CreationCountryService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the creation country.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/country")
public class CreationCountryController {
  private final CreationCountryService creationCountryService;

  /**
   * Fetch the creation countries from the server.
   *
   * @param authenticatedUser The user who initialized the connection to the server.
   * @return Returns the list of creation countries.
   */
  @CrossOrigin
  @GetMapping("/get-creation-countries")
  public List<CreationCountryEntity> getCreationDirection(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return creationCountryService.getCreationCountries();
  }
}
