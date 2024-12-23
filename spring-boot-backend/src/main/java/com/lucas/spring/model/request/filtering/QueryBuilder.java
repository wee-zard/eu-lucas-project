package com.lucas.spring.model.request.filtering;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QueryBuilder extends QueryMultiType {
  private List<QueryMultiType> listOfQueries;
}
