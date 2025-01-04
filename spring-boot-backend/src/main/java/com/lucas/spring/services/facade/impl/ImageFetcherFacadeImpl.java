package com.lucas.spring.services.facade.impl;

import com.lucas.spring.model.request.ImageRequest;
import com.lucas.spring.services.facade.ImageFacadeService;
import com.lucas.spring.services.facade.ImageFetcherFacade;
import com.lucas.spring.services.service.HttpRequestService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implements the methods of the following interface: {@link ImageFetcherFacade}.
 */
@Service
@AllArgsConstructor
public class ImageFetcherFacadeImpl implements ImageFetcherFacade {

  private final HttpRequestService httpRequestService;
  private final ImageFacadeService imageFacadeService;

  /**
   * {@inheritDoc}
   */
  @Override
  public void scalpLucasImageServer(final String urlPath) {
    final List<String> splitValuesDom = getSplitValuesDom(urlPath);
    System.out.printf("%s %s\n", "Processed Url:", urlPath);
    splitValuesDom.forEach((domElement) -> {
      final String newPath = String.format("%s%s", urlPath, domElement);
      if (domElement.contains("/")) {
        try {
          Thread.sleep(5000);
        } catch (InterruptedException e) {
          throw new RuntimeException(e.getMessage());
        }
        scalpLucasImageServer(newPath);
      } else {
        processImageIntoObj(newPath);
      }
    });
  }

  private List<String> getFilteredUrlDom(final String urlPath) {
    final String urlDom = httpRequestService.getResultOfRequest(urlPath, null);
    final String[] splitUrlDom = urlDom.split("\n");
    return Arrays.stream(splitUrlDom)
            .filter((domElement) -> domElement.contains("a href=") && !domElement.contains("PARENTDIR"))
            .filter((domElement) -> domElement.contains("DIR") || domElement.contains("IMG"))
            .toList();
  }

  private List<String> getSplitHrefDom(final String urlPath) {
    final List<String> filteredUrlDom = getFilteredUrlDom(urlPath);
    return filteredUrlDom.stream().map((domElement) -> domElement.split("a href=\"")[1]).toList();
  }

  private List<String> getSplitValuesDom(final String urlPath) {
    final List<String> splitHrefDom = getSplitHrefDom(urlPath);

    // This contains "xyz.jpg" filenames or "xyz/" as a directories name.
    // Removing the 'temp/' folders from the list.
    final List<String> splitValuesDom = splitHrefDom.stream()
            .map((domElement) -> domElement.split("\"")[0])
            .filter(domElement -> !domElement.contains("temp/"))
            .toList();

    // This will always give back the images that have been stored in the HU folder.
    final String hungaryImageFolder = "HU/";
    if (splitValuesDom.contains(hungaryImageFolder)) {
      return splitValuesDom.stream()
              .filter(domElement -> domElement.equals(hungaryImageFolder))
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
    throw new RuntimeException(String.format("%s %s", "Direction is not defined!", imageName));
  }
}
