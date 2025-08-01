package com.lucas.spring.commons.services;

import org.springframework.stereotype.Service;

/**
 * A service dedicated to sends out requests
 * to other servers and giving back their results.
 */
@Service
public interface HttpRequestService {
  /**
   * Send out a request to the provided url with the provided object
   * and sends back the result of the request in a string format.
   *
   * @param url Path to the site.
   * @param obj Request param we want to send to the server.
   * @return Returns the response of the request.
   */
  String getResultOfRequest(String url, String obj);
}
