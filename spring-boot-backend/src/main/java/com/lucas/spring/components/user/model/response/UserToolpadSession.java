package com.lucas.spring.components.user.model.response;

import com.lucas.spring.commons.model.dto.RootDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * User toolpad session.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class UserToolpadSession implements RootDto {
  private String name;
  private String email;
  private String image;
}
