package com.lucas.spring.components.compression;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.BaseResponse;
import com.lucas.spring.components.compression.model.CompressRequest;
import com.lucas.spring.components.compression.service.ImageCompressionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the image compressions.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/compression")
public class ImageCompressionController {
  private final ImageCompressionService imageCompressionService;

  /**
   * ...
   */
  @CrossOrigin
  @PostMapping
  public BaseResponse createFolder(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestBody CompressRequest request
  ) {
    imageCompressionService.compress(request);
    return new BaseResponse();
  }
}
