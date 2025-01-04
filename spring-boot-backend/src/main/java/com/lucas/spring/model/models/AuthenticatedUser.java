package com.lucas.spring.model.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * Stores the authenticated user's information.
 */
@Builder
@Getter
@AllArgsConstructor
public class AuthenticatedUser {
  private String email;
  private Long userId;
}
