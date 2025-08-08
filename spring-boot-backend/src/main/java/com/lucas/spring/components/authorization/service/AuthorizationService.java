package com.lucas.spring.components.authorization.service;

import com.lucas.spring.components.authorization.model.response.NewAccessTokenResponse;
import org.springframework.stereotype.Service;

/**
 * Service interface for the authorization of the users.
 */
@Service
public interface AuthorizationService {

  /**
   * Fetches a new access token from the Google's oath2 service.
   *
   * @return Returns a model that holds a new access token for the user.
   */
  NewAccessTokenResponse fetchNewAccessToken();
}
