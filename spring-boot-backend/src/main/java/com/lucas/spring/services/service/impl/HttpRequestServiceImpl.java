package com.lucas.spring.services.service.impl;

import com.lucas.spring.services.service.HttpRequestService;
import java.io.IOException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

/**
 * Implements the methods of the {@link HttpRequestService} service.
 */
@Service
public class HttpRequestServiceImpl implements HttpRequestService {

  /**
   * {@inheritDoc}
   */
  @Override
  public String getResultOfRequest(final String url, final String obj) {
    RestTemplate restTemplate = new RestTemplate();
    restTemplate.setErrorHandler(new DefaultResponseErrorHandler() {
      @Override
      public void handleError(final ClientHttpResponse response) throws IOException {}
    });
    return restTemplate.getForObject(
            obj == null ? String.format("%s", url) : String.format("%s%s", url, obj),
            String.class
    );
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public JSONObject parseRequestResult(final String jsonText) throws ParseException {
    JSONParser parser = new JSONParser();
    return (JSONObject) parser.parse(jsonText);
  }
}
