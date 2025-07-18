package com.lucas.spring.components.folder;

import com.lucas.spring.commons.helper.ConversionHelper;
import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.BaseResponse;
import com.lucas.spring.commons.model.response.PageableResponse;
import com.lucas.spring.components.folder.facade.FolderFacade;
import com.lucas.spring.components.folder.model.dto.FolderDto;
import com.lucas.spring.components.folder.model.request.FolderCreationRequest;
import com.lucas.spring.components.folder.service.FolderService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
  private final FolderService folderService;
  private final ConversionHelper conversionHelper;

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

  /**
   * Fetches the list of folders what the user owns (but not shared with him).
   *
   * @param user The authenticated user who initiated the request.
   * @param pageable The pageable properties to fetch a records as paginated.
   * @return Returns the list of folders of the currently logged-in user.
   */
  @CrossOrigin
  @GetMapping("/")
  public PageableResponse<FolderDto> getFoldersByUserId(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestHeader(ConversionHelper.PAGEABLE_PROPERTIES) Pageable pageable
  ) {
    return conversionHelper.convertPage(
            folderService.getFoldersByUserId(1L, pageable),
            FolderDto.class);
  }
}
