package com.lucas.spring.components.folder;

import com.lucas.spring.commons.constants.ApplicationConstants;
import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.BaseResponse;
import com.lucas.spring.commons.model.response.PageableResponse;
import com.lucas.spring.commons.services.CustomConversionService;
import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.components.folder.facade.FolderFacade;
import com.lucas.spring.components.folder.model.dto.FolderDtoSlice;
import com.lucas.spring.components.folder.model.model.FolderFormWithFolderIdModel;
import com.lucas.spring.components.folder.service.FolderService;
import jakarta.validation.Valid;
import java.util.List;
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
 * Stores the endpoints related to the folder.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/folder")
public class FolderController {
  private final FolderFacade folderFacade;
  private final FolderService folderService;
  private final CustomConversionService conversionService;

  /**
   * Updates a folder.
   *
   * @param user The authenticated user who initiated the request.
   * @param request The request from the frontend that holds the folder update information.
   */
  @CrossOrigin
  @PostMapping("/update")
  public BaseResponse updateFolder(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestBody @Valid final FolderFormWithFolderIdModel request
  ) {
    this.folderService.update(request);
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
  public PageableResponse<FolderDtoSlice> getFoldersByUserId(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestHeader(ApplicationConstants.PAGEABLE_PROPERTIES) Pageable pageable
  ) {
    return conversionService.convert(
            folderService.getFoldersByUserId(user.getUserId(), pageable),
            FolderDtoSlice.class);
  }

  /**
   * Fetches the list of folders what the user owns and shared with him,
   * while sorted by the 'updatedAt' properties of the folders.
   *
   * @param user The authenticated user who initiated the request.
   * @return Returns the list of folders of the currently logged-in user.
   */
  @CrossOrigin
  @GetMapping("/list-all")
  public List<FolderDtoSlice> getFoldersByUserIdSortedByUpdatedAt(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user
  ) {
    return folderService.getAllSortedFoldersByUserId(user.getUserId());
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
  @DeleteMapping("/")
  public BaseResponse deleteFolder(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestParam String folderId
  ) {
    final Long parsedFolderId = FormatParseUtil.parseToLong(folderId);
    this.folderFacade.delete(parsedFolderId, user);
    return new BaseResponse();
  }
}
