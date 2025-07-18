package com.lucas.spring.components.user.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * A request that represent the id of the user who
 * should be activated from a 'deleted' status.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserActivateDeletedRequest {
  private Long id;
}
