package com.lucas.spring.components.image.model.request;

import com.lucas.spring.components.folder.enums.QueryElementRelations;
import com.lucas.spring.components.image.enums.QueryType;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * TODO: Write here a more better javadoc.
 * An object that wraps around a query builder.
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QueryMultiType extends QueryRoot {
  private QueryElementRelations queryElementRelation;
  private QueryType queryType;
  private List<QueryMultiType> listOfQueries;
  private List<QueryComponent> listOfComponents;
}
