package com.lucas.spring.components.year;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.year.model.entity.CreationYearEntity;
import com.lucas.spring.components.year.service.CreationYearService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the creation year.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/year")
public class CreationYearController {
  private final CreationYearService creationYearService;

  /**
   * Fetch the creation years from the server.
   *
   * @param authenticatedUser The user who initialized the connection to the server.
   * @return Returns the list of creation years.
   */
  @CrossOrigin
  @GetMapping("/get-creation-years")
  public List<CreationYearEntity> getCreationYears(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return creationYearService.getCreationYears();
  }
}
