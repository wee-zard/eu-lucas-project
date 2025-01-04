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
}
