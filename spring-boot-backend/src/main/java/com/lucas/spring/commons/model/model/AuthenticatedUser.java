package com.lucas.spring.commons.model.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Stores the authenticated user's information.
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
public class AuthenticatedUser {
  private String email;
  private Long userId;
  private int roleId;
  private Long statusId;
}
