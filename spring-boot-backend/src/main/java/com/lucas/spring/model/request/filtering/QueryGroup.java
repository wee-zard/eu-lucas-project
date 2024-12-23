package com.lucas.spring.model.request.filtering;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QueryGroup extends QueryMultiType {
  private List<QueryComponent> listOfQueries;
}