package com.lucas.spring.services.facade;

import org.springframework.stereotype.Service;

/**
 * Fetching the images from the remote lucas image server
 * and processing them, while updating them to the db.
 */
@Service
public interface ImageFetcherFacade {
  /**
   * Fetches the DOM three of the root lucas website.
   *
   * @param urlPath Path to the url.
   */
  void scalpLucasImageServer(String urlPath);

  /**
   * Download a specific image from a url
   * and converts it into a binary array.
   *
   * @param urlPath The url of the image from which we
   *                want to download the resource.
   * @return Returns the binary array version of the fetched image.
   */
  byte[] getImageByUrl(String urlPath);

  /**
   * Converts a binary to base64String.
   *
   * @param binary The binaries to convert into base64String
   * @return Returns a base64string.
   */
  String byteToBase64(byte[] binary);

  /**
   * Download a specific image from a url and converts it into a base64String.
   *
   * @param urlPath The url of the image from which we want to download the resource.
   * @return Returns the base64String converted version of the image.
   */
  String urlToBase64(String urlPath);
}
