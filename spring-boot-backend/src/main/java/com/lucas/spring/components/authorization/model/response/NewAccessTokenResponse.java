package com.lucas.spring.components.authorization.model.response;

import lombok.AllArgsConstructor;

/**
 * The model of the new access tokens that has been fetched
 * with the oath2 service.
 */
@AllArgsConstructor
public class NewAccessTokenResponse {
  private String access_token;
  private Integer expires_in;
  private String id_token;
  private String refresh_token;
  private String scope;
  private String token_type;
}
