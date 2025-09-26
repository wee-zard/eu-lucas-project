package com.lucas.spring.components.image.facade;

import com.lucas.spring.commons.model.model.AuthenticatedUser;

/**
 * Facade for the image header extraction where the images will be fetched
 * from a remote server, and their exif headers will be extracted and pushed
 * to the db.
 */
public interface ImageHeaderExtractionFacade {

  /**
   * Checks all those images that has already been processed on the db and
   * fetched them one by one from the server. After this, extracts the exif
   * and other header information from the images and upload them to the db.
   *
   * @param user The user who initiated the request.
   */
  void scalpLucasImageServer(AuthenticatedUser user);
}
