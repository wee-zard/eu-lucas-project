import {
  QueryComponent,
  QueryGroup,
  QueryMultiType,
  QueryTypes,
} from "./../model/QueryBuilderModel";
import {
  QueryBuilderModel,
  QueryElementRelations,
} from "app/model/QueryBuilderModel";

export const FilteringHelper = {
  modifyQueryBuilderModel: (
    modifiedQueryMultiTypes: QueryMultiType[],
    queryBuilderModel: QueryBuilderModel
  ): QueryBuilderModel => ({
    id: queryBuilderModel.id,
    queryType: queryBuilderModel.queryType,
    queryMultiTypes: modifiedQueryMultiTypes,
    queryElementRelation:
      !queryBuilderModel.queryElementRelation &&
      modifiedQueryMultiTypes.length === 2
        ? QueryElementRelations.And
        : queryBuilderModel.queryElementRelation,
  }),

  handleSliceOutOldBranchReplaceWithNewOne: (
    queryBuilderModel: QueryBuilderModel,
    index: number,
    modifiedMultiType?: QueryMultiType
  ): QueryBuilderModel => {
    const newQueryBuilderModel: QueryBuilderModel = {
      ...queryBuilderModel,
      queryMultiTypes: modifiedMultiType
        ? queryBuilderModel.queryMultiTypes.map((multiType) =>
            multiType.id === index ? modifiedMultiType : multiType
          )
        : queryBuilderModel.queryMultiTypes.filter(
            (multiType) => multiType.id !== index
          ),
    };
    return FilteringHelper.modifyQueryBuilderModel(
      newQueryBuilderModel.queryMultiTypes,
      newQueryBuilderModel
    );
  },

  /**
   * Gives back the branch of the tree that has the same id as in the params.
   *
   * @param root The whole tree to search.
   * @param id The id to search in the tree.
   */
  getBranchFromTreeById: (root: QueryMultiType, id: number) => {
    const getSubBrachOfQueryBuilder = (queryBuilder: QueryBuilderModel) => {
      let tmpResult: QueryMultiType | QueryComponent | undefined;
      queryBuilder.queryMultiTypes.forEach((queryMultiType) => {
        const tmp = getSubBranchOfComponent(queryMultiType);
        if (tmp && !tmpResult) {
            tmpResult = tmp;
        }
      });
      return tmpResult;
    };

    const getSubBranchOfQueryGroup = (queryGroup: QueryGroup) =>
      queryGroup.queryComponents.find((item) => item.id === id);

    const getSubBranchOfComponent = (queryMultiType: QueryMultiType) => {
      if (queryMultiType.id === id) {
        return queryMultiType;
      }
      if (queryMultiType.queryType === QueryTypes.QUERY_BUILDER) {
        return getSubBrachOfQueryBuilder(queryMultiType as QueryBuilderModel);
      } else if (queryMultiType.queryType === QueryTypes.QUERY_GROUP) {
        return getSubBranchOfQueryGroup(queryMultiType as QueryGroup);
      }
    };

    let result = getSubBranchOfComponent(root);
    console.log("[getBranchFromTreeById] :::", id, root, result);
    return result;
  },
};
