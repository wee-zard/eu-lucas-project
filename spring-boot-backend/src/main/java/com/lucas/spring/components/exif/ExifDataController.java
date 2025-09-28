package com.lucas.spring.components.exif;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.components.exif.service.ExifDataService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the exif keys.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/exif-data")
public class ExifDataController {
  private final ExifDataService exifDataService;

  /**
   * Fetches the list of exif data values based on the provided exif key.
   *
   * @param user The authenticated user who initiated the request.
   * @return Returns the list of exif keys.
   */
  @CrossOrigin
  @GetMapping
  public List<String> getExifValuesByKey(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestParam String keyId
  ) {
    return exifDataService.findAllByExifKey(FormatParseUtil.parseToLong(keyId));
  }
}
