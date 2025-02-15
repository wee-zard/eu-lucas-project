package com.lucas.spring.model.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BaseOperatorModel implements Comparable<BaseOperatorModel> {

  private String name;

  @Override
  public boolean equals(Object o) {
    return false;
  }

  @Override
  public int hashCode() {
    return 0;
  }

  @Override
  public int compareTo(BaseOperatorModel o) {
    return 0;
  }
}
