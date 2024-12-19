import React from "react";
import {
  QueryBuilderModel,
  QueryGroup,
  QueryMultiType,
  QueryTypes,
} from "app/model/QueryBuilderModel";
import FilteringQueryGroup from "./FilteringQueryGroup";
import FilteringMenuBody from "./FilteringMenuBody";

type Props = {
  multiType: QueryMultiType;
  callback: (multiType?: QueryMultiType) => void;
};

const FilteringQueryMultiType = ({ multiType, callback }: Props) => {
  console.log("[FilteringQueryMultiType]: RENDERED");

  return (
    <React.Fragment>
      {multiType.queryType === QueryTypes.QUERY_BUILDER ? (
        <FilteringMenuBody
          queryBuilderModel={multiType as QueryBuilderModel}
          callback={(modifiedQueryBuilderModel) =>
            callback(modifiedQueryBuilderModel)
          }
        />
      ) : multiType.queryType === QueryTypes.QUERY_GROUP ? (
        <FilteringQueryGroup
          queryGroup={multiType as QueryGroup}
          callback={(queryGroup) => callback(queryGroup)}
        />
      ) : null}
    </React.Fragment>
  );
};

export default FilteringQueryMultiType;
