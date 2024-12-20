import { getQueryBuilderModel } from "app/dialogs/filteringDialog/FilteringMenu";
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

export type StateUpdateProps<T> = {
  root: QueryBuilderModel,
  filtered: T,
}

export const FilteringHelper = {
  modifyQueryBuilderModel: (
    modifiedQueryMultiTypes: QueryMultiType[],
    queryBuilderModel: QueryBuilderModel
  ): QueryBuilderModel => ({
    ...queryBuilderModel,
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
      for (const queryMultiType of queryBuilder.queryMultiTypes) {
        const tmp = getSubBranchOfComponent(queryMultiType);
        if (tmp) {
          tmpResult = tmp;
          break;
        }
      }
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
    return result;
  },

  handleFilteringQueryComponentChanges: (
    queryGroup: QueryGroup,
    queryComponent: QueryComponent,
    modifiedQueryComponent?: QueryComponent
  ) => {
    if (modifiedQueryComponent) {
      const components = queryGroup.queryComponents.map((item) =>
        item.id === queryComponent.id ? modifiedQueryComponent : item
      );
      const modifiedQueryGroup: QueryGroup = {
        ...queryGroup,
        queryComponents: components,
        queryElementRelation:
          !queryGroup.queryElementRelation && components.length === 2
            ? (queryGroup.queryElementRelation = QueryElementRelations.And)
            : queryGroup.queryElementRelation,
      };
      return modifiedQueryGroup;
    } else {
      const components = queryGroup.queryComponents.filter(
        (item) => item.id !== queryComponent.id
      );
      const modifiedQueryGroup: QueryGroup = {
        ...queryGroup,
        queryComponents: components,
        queryElementRelation:
          !queryGroup.queryElementRelation && components.length === 2
            ? (queryGroup.queryElementRelation = QueryElementRelations.And)
            : queryGroup.queryElementRelation,
      };
      return modifiedQueryGroup;
    }
  },

  // Optimization needs
  handleFilterChanges: (
    root: QueryMultiType,
    id: number,
    modifiedQueryComponent?: QueryComponent | QueryMultiType
  ): QueryBuilderModel => {
    const getSubBrachOfQueryBuilder = (
      queryBuilder: QueryBuilderModel,
      callback: (modifiedQueryBuilderModel: QueryBuilderModel) => void
    ) => {
      let tmpResult: QueryMultiType | QueryComponent | undefined;
      for (const queryMultiType of queryBuilder.queryMultiTypes) {
        const tmp = getSubBranchOfComponent(
          queryMultiType,
          (modifiedMultiType) =>
            callback(
              FilteringHelper.handleSliceOutOldBranchReplaceWithNewOne(
                queryBuilder,
                queryMultiType.id,
                modifiedMultiType
              )
            )
        );
        if (tmp) {
          tmpResult = tmp;
          break;
        }
      }
      return tmpResult;
    };

    const getSubBranchOfQueryGroup = (
      queryGroup: QueryGroup,
      callback: (group?: QueryGroup) => void
    ) => {
      const originalComponent = queryGroup.queryComponents.find(
        (item) => item.id === id
      );
      if (originalComponent) {
        callback(
          FilteringHelper.handleFilteringQueryComponentChanges(
            queryGroup,
            originalComponent,
            modifiedQueryComponent
          )
        );
      }
      return originalComponent;
    };

    // Optimization needs
    const getSubBranchOfComponent = (
      queryMultiType: QueryMultiType,
      callback: (queryMultiType?: QueryMultiType) => void
    ) => {
      if (queryMultiType.id === id) {
        callback(modifiedQueryComponent as QueryMultiType);
      }
      if (queryMultiType.queryType === QueryTypes.QUERY_BUILDER) {
        return getSubBrachOfQueryBuilder(
          queryMultiType as QueryBuilderModel,
          callback
        );
      } else if (queryMultiType.queryType === QueryTypes.QUERY_GROUP) {
        return getSubBranchOfQueryGroup(queryMultiType as QueryGroup, callback);
      }
    };

    let result: QueryBuilderModel | undefined;

    getSubBranchOfComponent(root, (builder) => {
      result = builder as QueryBuilderModel | undefined;
    });
    return result as QueryBuilderModel;
  },

  getEventListenerName: (componentId: number) =>
    `QueryBuilderEventListener_${componentId}`,

  sendUpdateEvent: (componentId: number) =>
    window.dispatchEvent(
      new Event(FilteringHelper.getEventListenerName(componentId))
    ),

  /**
   * Give back the states from the local storage.
   */
  getUpdatedStates<T>(id: number): StateUpdateProps<T> {
    const queryBuilderModel = getQueryBuilderModel();
    const builder = FilteringHelper.getBranchFromTreeById(
      getQueryBuilderModel(),
      id
    ) as T;
    return {
      root: queryBuilderModel,
      filtered: builder,
    };
  },
};
