package com.lucas.spring.components.folder;

import com.lucas.spring.commons.helper.ConversionHelper;
import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.BaseResponse;
import com.lucas.spring.commons.model.response.PageableResponse;
import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.components.folder.facade.FolderContentFacade;
import com.lucas.spring.components.folder.facade.FolderFacade;
import com.lucas.spring.components.folder.facade.FolderHelperFacade;
import com.lucas.spring.components.folder.model.dto.FolderContentDto;
import com.lucas.spring.components.folder.model.request.FolderCreationRequest;
import com.lucas.spring.components.folder.model.request.FolderImageAdditionRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the contents of the folders.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/folder-content")
public class FolderContentController {
  private final FolderFacade folderFacade;
  private final FolderContentFacade folderContentFacade;
  private final FolderHelperFacade folderHelperFacade;

  /**
   * Creates a new folder where the user could store their images.
   * If no images were provided, then an empty folder will be created,
   * else a folder with the content of the images.
   *
   * @param user The authenticated user who initiated the request.
   * @param folderId The id of the folder from which we want to delete a content
   * @param imageId The id of the image that will be removed from the folder
   */
  @CrossOrigin
  @DeleteMapping("/")
  public BaseResponse removeImageContentFromFolder(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestParam String folderId,
          @RequestParam String imageId
  ) {
    this.folderContentFacade.delete(
            FormatParseUtil.parseToLong(folderId),
            FormatParseUtil.parseToLong(imageId),
            user);
    return new BaseResponse();
  }

  /**
   * Completely deletes a specific folder and it's content provided by the param.
   * After the deletion, the folder and it's content will be no longer be available
   * for the users.
   *
   * @param user The authenticated user who initiated the request.
   * @return Returns a {@link BaseResponse} about the success of the request.
   */
  @CrossOrigin
  @DeleteMapping("/clear")
  public BaseResponse clearFolderContent(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestParam String folderId
  ) {
    final Long parsedFolderId = FormatParseUtil.parseToLong(folderId);
    folderContentFacade.clearFolderContent(parsedFolderId, user);
    folderHelperFacade.updateFolderModificationTime(parsedFolderId);
    return new BaseResponse();
  }

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
   * Add images to an existing folder.
   *
   * @param user The authenticated user who initiated the request.
   * @param request The request which can be used to create the new folder.
   *                Additionally, it contains the images and the queries.
   */
  @CrossOrigin
  @PostMapping("/add")
  public BaseResponse addToFolder(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestBody @Valid final FolderImageAdditionRequest request
  ) {
    this.folderFacade.save(request, user);
    return new BaseResponse();
  }

  /**
   * Fetches the list of images and their properties inside a folder.
   *
   * @param user The authenticated user who initiated the request.
   * @param pageable The pageable properties to fetch a records as paginated.
   * @param folderId The id of the folder from which the images and the properties
   *                 of the images will be fetched.
   * @return Returns the list of folders of the currently logged-in user.
   */
  @CrossOrigin
  @GetMapping("/")
  public PageableResponse<FolderContentDto> getFolderContentByFolderId(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestHeader(ConversionHelper.PAGEABLE_PROPERTIES) Pageable pageable,
          @RequestParam String folderId
  ) {
    return this.folderContentFacade.findAllByFolderId(folderId, user, pageable);
  }
}
