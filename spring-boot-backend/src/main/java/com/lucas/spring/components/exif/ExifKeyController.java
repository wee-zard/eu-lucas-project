package com.lucas.spring.components.exif;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.services.CustomConversionService;
import com.lucas.spring.components.exif.model.dto.ExifKeyDto;
import com.lucas.spring.components.exif.service.ExifKeyService;
import java.util.List;
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
  private final CustomConversionService conversionService;

  /**
   * Fetches the list of exif keys from the server.
   *
   * @param user The authenticated user who initiated the request.
   * @return Returns the list of exif keys.
   */
  @CrossOrigin
  @GetMapping
  public List<ExifKeyDto> getExifKeys(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user
  ) {
    return conversionService.convert(exifKeyService.getExifKeys(), ExifKeyDto.class);
  }
}
