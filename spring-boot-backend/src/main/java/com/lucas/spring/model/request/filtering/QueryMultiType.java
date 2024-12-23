package com.lucas.spring.model.request.filtering;

import com.lucas.spring.model.enums.QueryElementRelations;
import com.lucas.spring.model.enums.QueryType;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QueryMultiType extends QueryRoot {
  private QueryElementRelations queryElementRelation;
  private QueryType queryType;
  private List<?> listOfQueries;
}
