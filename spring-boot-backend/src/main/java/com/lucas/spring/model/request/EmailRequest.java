package com.lucas.spring.model.request;

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
public class EmailRequest {
  private String emailAddress;
  private long roleId;
}
