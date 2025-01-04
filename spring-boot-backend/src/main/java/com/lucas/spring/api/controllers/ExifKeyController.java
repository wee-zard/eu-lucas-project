package com.lucas.spring.api.controllers;

import com.lucas.spring.model.entity.ExifKeyEntity;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.service.ExifKeyService;
import java.util.ArrayList;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the exif keys.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/exif-key")
public class ExifKeyController {
  private final ExifKeyService exifKeyService;

  @CrossOrigin
  @GetMapping
  public ArrayList<ExifKeyEntity> getCreationYears(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return exifKeyService.getExifKeys();
  }
}
