import React from "react";
import {
  QueryMultiType,
  QueryTypes,
} from "app/model/QueryBuilderModel";
import FilteringQueryGroup from "./FilteringQueryGroup";
import FilteringMenuBody from "./FilteringMenuBody";
import { useSelector } from "react-redux";
import { selectQueryBranch } from "app/redux/selectors/imageSelector";
import { RootState } from "app/redux/store";

type Props = {
  id: number;
  callback: (multiType?: QueryMultiType) => void;
};

const FilteringQueryMultiType = ({ id, callback }: Props) => {
  console.log("[FilteringQueryMultiType]: RENDERED");

  const multiType = useSelector((state) => selectQueryBranch(state as RootState, id)) as QueryMultiType;

  return (
    <React.Fragment>
      {multiType.queryType === QueryTypes.QUERY_BUILDER ? (
        <FilteringMenuBody
          id={multiType.id}
          callback={(modifiedQueryBuilderModel) =>
            callback(modifiedQueryBuilderModel)
          }
        />
      ) : multiType.queryType === QueryTypes.QUERY_GROUP ? (
        <FilteringQueryGroup
          id={multiType.id}
          callback={(queryGroup) => callback(queryGroup)}
        />
      ) : null}
    </React.Fragment>
  );
};

export default FilteringQueryMultiType;
