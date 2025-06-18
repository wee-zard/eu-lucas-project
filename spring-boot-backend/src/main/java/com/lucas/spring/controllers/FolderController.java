package com.lucas.spring.controllers;

import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.folder.FolderCreationRequest;
import com.lucas.spring.model.response.BaseResponse;
import com.lucas.spring.services.facade.FolderFacade;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the folder.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/folder")
public class FolderController {
  private final FolderFacade folderFacade;

  /**
   * Creates a new folder where the user could store their images.
   * If no images were provided, then an empty folder will be created,
   * else a folder with the content of the images.
   *
   * @param user The authenticated user who initiated the request.
   * @param request The request which can be used to create the new folder.
   *                Additionally, it contains the images and the queries.
   */
  @CrossOrigin
  @PostMapping("/create")
  public BaseResponse createFolder(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestBody @Valid final FolderCreationRequest request
  ) {
    this.folderFacade.save(request, user);
    return new BaseResponse();
  }
}
