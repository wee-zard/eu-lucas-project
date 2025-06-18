package com.lucas.spring.model.request.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Defines a request where the users
 * could add their email to the server.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserCreationRequest {
  @Email(message = "Adj meg egy érvényes email címet!")
  @NotNull(message = "Az email cím nem került megadásra!")
  private String emailAddress;

  @Min(1)
  @Max(3)
  @NotNull(message = "A szerepkör megadása kötelező!")
  private long roleId;
}
