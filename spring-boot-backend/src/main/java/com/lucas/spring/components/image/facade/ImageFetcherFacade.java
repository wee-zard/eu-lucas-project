package com.lucas.spring.components.image.facade;

import com.lucas.spring.commons.model.model.AuthenticatedUser;

/**
 * Fetching the images from the remote lucas image server
 * and processing them, while updating them to the db.
 */
public interface ImageFetcherFacade {
  /**
   * Fetches the DOM three of the root lucas website.
   *
   * @param urlPath Path to the url.
   * @param user The user who initiated the request.
   */
  void scalpLucasImageServer(String urlPath, AuthenticatedUser user);
}
