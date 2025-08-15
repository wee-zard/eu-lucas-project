package com.lucas.spring.components.image.facade.impl;

import com.lucas.spring.commons.services.HttpRequestService;
import com.lucas.spring.components.image.facade.ImageFacadeService;
import com.lucas.spring.components.image.facade.ImageFetcherFacade;
import com.lucas.spring.components.image.model.request.ImageRequest;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import javax.imageio.ImageIO;
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
    splitValuesDom.forEach(domElement -> {
      final String newPath = String.format("%s%s", urlPath, domElement);
      if (domElement.contains("/")) {
        try {
          Thread.sleep(5000);
        } catch (InterruptedException e) {
          // TODO: Throw a better exception here.
          throw new RuntimeException(e.getMessage());
        }
        scalpLucasImageServer(newPath);
      } else {
        processImageIntoObj(newPath);
      }
    });
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public byte[] getImageByUrl(final String urlPath) {
    try (BufferedInputStream in = new BufferedInputStream(new URI(urlPath).toURL().openStream())) {
      return in.readAllBytes();
    } catch (IOException | URISyntaxException e) {
      // handle exception
      return new byte[0];
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String byteToBase64(final byte[] binary) {
    return Base64.getEncoder().encodeToString(binary);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String urlToBase64(final String urlPath) {
    return this.byteToBase64(this.getImageByUrl(urlPath));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public byte[] base64ToByteArray(final String base64String) {
    return Base64.getDecoder().decode(base64String);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String scaleDownImage(final String imageUrl) {
    if (imageUrl.isEmpty()) {
      return null;
    }

    final byte[] imageBinaries = this.getImageByUrl(imageUrl);
    final ByteArrayInputStream stream = new ByteArrayInputStream(imageBinaries);

    try {
      final BufferedImage originalImage = ImageIO.read(stream);
      final BufferedImage resizedImage = this.resizeImage(originalImage);
      final byte[] resizedImageBinaries = this.toByteArray(resizedImage);
      return this.byteToBase64(resizedImageBinaries);
    } catch (IOException e) {
      return null;
    }
  }

  private byte[] toByteArray(final BufferedImage bi)
          throws IOException {

    final ByteArrayOutputStream baos = new ByteArrayOutputStream();
    ImageIO.write(bi, "jpg", baos);
    return baos.toByteArray();
  }

  /**
   * Resizes the provided image to a smaller one.
   *
   * @param originalImage The image to resize.
   * @return Returns the result Buffered image.
   */
  private BufferedImage resizeImage(final BufferedImage originalImage) {
    final int width = 200;
    final int height = 200;
    final BufferedImage resizedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
    final Graphics2D graphics2D = resizedImage.createGraphics();
    graphics2D.drawImage(originalImage, 0, 0, width, height, null);
    graphics2D.dispose();
    return resizedImage;
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
    // TODO: Throw a better exception here.
    throw new RuntimeException(String.format("%s %s", "Direction is not defined!", imageName));
  }
}
