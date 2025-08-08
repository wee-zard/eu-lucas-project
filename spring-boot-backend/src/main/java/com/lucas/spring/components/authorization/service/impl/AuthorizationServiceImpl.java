package com.lucas.spring.components.authorization.service.impl;

import com.lucas.spring.components.authorization.model.response.NewAccessTokenResponse;
import com.lucas.spring.components.authorization.service.AuthorizationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implementation of the {@link AuthorizationService}.
 */
@Service
@AllArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

  /**
   * {@inheritDoc}
   */
  @Override
  public NewAccessTokenResponse fetchNewAccessToken() {
    return null;
  }
}
