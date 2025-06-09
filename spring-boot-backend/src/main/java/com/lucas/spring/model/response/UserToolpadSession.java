package com.lucas.spring.model.response;

import com.lucas.spring.model.dto.abstraction.RootDto;
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
