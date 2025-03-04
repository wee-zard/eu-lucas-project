package com.lucas.spring.controllers;

import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.response.BaseResponse;
import com.lucas.spring.services.service.PlantNameService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the plant names.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/plant-name")
public class PlantNameController {
  private final PlantNameService plantNameService;

  /**
   * Remove specific procedure from the db.
   */
  @CrossOrigin
  @DeleteMapping("/delete-all")
  public BaseResponse deletePlantNames(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    plantNameService.deleteAll();
    return new BaseResponse();
  }
}
