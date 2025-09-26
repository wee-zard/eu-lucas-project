package com.lucas.spring.components.image.facade.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.services.HttpRequestService;
import com.lucas.spring.components.image.enums.ImageFetcherExceptionEnums;
import com.lucas.spring.components.image.exception.ImageFetcherException;
import com.lucas.spring.components.image.facade.ImageFacadeService;
import com.lucas.spring.components.image.facade.ImageFetcherFacade;
import com.lucas.spring.components.image.model.request.ImageRequest;
import com.lucas.spring.components.user.service.UserService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Implements the methods of the following interface: {@link ImageFetcherFacade}.
 */
@Service
@AllArgsConstructor
public class ImageFetcherFacadeImpl implements ImageFetcherFacade {
  private final HttpRequestService httpRequestService;
  private final ImageFacadeService imageFacadeService;
  private final UserService userService;
  private static final Logger logger = LoggerFactory.getLogger(ImageFetcherFacadeImpl.class);
  private static final int WAIT_UNTIL_NEXT_FETCH_IN_MILI_SECS = 5000;

  /**
   * {@inheritDoc}
   */
  @Override
  public void scalpLucasImageServer(final String urlPath, final AuthenticatedUser user) {
    userService.validateIsUserAdminElseException(user);
    scalpRemoteServer(urlPath);
  }

  private void scalpRemoteServer(final String urlPath) {
    final List<String> splitValuesDom = getSplitValuesDom(urlPath);
    logger.info("{} {}\n", "Processed Url:", urlPath);

    splitValuesDom.forEach(domElement -> {
      final String newPath = String.format("%s%s", urlPath, domElement);

      if (domElement.contains("/")) {
        try {
          Thread.sleep(WAIT_UNTIL_NEXT_FETCH_IN_MILI_SECS);
        } catch (InterruptedException e) {
          Thread.currentThread().interrupt();
          throw new ImageFetcherException(ImageFetcherExceptionEnums.IMAGE_FETCHER_INTERRUPTED, e.getMessage());
        }
        scalpRemoteServer(newPath);
      } else {
        processImageIntoObj(newPath);
      }
    });
  }

  /**
   * Fetches the dom of an application and filter it, so the directories could remain
   * in the end of the filter.
   *
   * @param urlPath a url path to the server.
   * @return Returns dom splices that contains the possible directories found on the url.
   */
  private List<String> getFilteredUrlDom(final String urlPath) {
    final String urlDom = httpRequestService.getResultOfRequest(urlPath, null);
    final String[] splitUrlDom = urlDom.split("\n");
    return Arrays.stream(splitUrlDom)
            .filter(domElement -> domElement.contains("a href=") && !domElement.contains("PARENTDIR"))
            .filter(domElement -> domElement.contains("DIR") || domElement.contains("IMG"))
            .toList();
  }

  private List<String> getSplitHrefDom(final String urlPath) {
    final List<String> filteredUrlDom = getFilteredUrlDom(urlPath);
    return filteredUrlDom.stream().map(domElement -> domElement.split("a href=\"")[1]).toList();
  }

  private List<String> getSplitValuesDom(final String urlPath) {
    final List<String> splitHrefDom = getSplitHrefDom(urlPath);

    // This contains "xyz.jpg" filenames or "xyz/" as a directories name.
    // Removing the 'temp/' folders from the list.
    final List<String> splitValuesDom = splitHrefDom.stream()
            .map(domElement -> domElement.split("\"")[0])
            .filter(domElement -> !domElement.contains("temp/"))
            .toList();

    // This will always give back the images that have been stored in the HU folder.
    final String hungaryImageFolder = "HU/";
    if (splitValuesDom.contains(hungaryImageFolder)) {
      return splitValuesDom.stream()
              .filter(domElement -> Objects.equals(domElement, hungaryImageFolder))
              .toList();
    } else {
      return splitValuesDom;
    }
  }

  private void processImageIntoObj(final String pathToImage) {
    final String[] splitPath = pathToImage.split("/");
    final ImageRequest imageRequest = ImageRequest.builder()
              .imageName(splitPath[splitPath.length - 1])
              .coordinateY(Integer.parseInt(splitPath[splitPath.length - 2]))
              .coordinateX(Integer.parseInt(splitPath[splitPath.length - 3]))
              .countryCode(splitPath[splitPath.length - 4])
              // TODO: Replace the use of 'Locale' here, because it is deprecated.
              .countryName(new Locale("", splitPath[splitPath.length - 4]).getDisplayCountry())
              .year(Integer.parseInt(splitPath[splitPath.length - 5]))
              .directionName(getDirection(splitPath[splitPath.length - 1]))
              .exifData(new ArrayList<>())
              .build();
    imageFacadeService.getImageEntity(imageRequest);
  }

  final String getDirection(final String imageName) {
    final String imageNameWithOutDot = imageName.split("\\.")[0];
    final Map<String, String> directionList = new HashMap<>();
    directionList.put("E", "East");
    directionList.put("W", "West");
    directionList.put("N", "North");
    directionList.put("S", "South");
    directionList.put("P", "Point");
    directionList.put("C", "Crop");

    for (Map.Entry<String, String> directionEntry : directionList.entrySet()) {
      if (imageNameWithOutDot.toUpperCase().contains(directionEntry.getValue().toUpperCase())) {
        return directionEntry.getValue();
      }
    }

    for (Map.Entry<String, String> directionEntry : directionList.entrySet()) {
      if (imageNameWithOutDot.toUpperCase().contains(directionEntry.getKey().toUpperCase())) {
        return directionEntry.getValue();
      }
    }

    throw new ImageFetcherException(ImageFetcherExceptionEnums.IMAGE_FETCHER_DIRECTION_NOT_DEFINED, imageName);
  }
}
