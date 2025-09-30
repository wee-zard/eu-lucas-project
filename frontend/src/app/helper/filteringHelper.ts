import { LocalStorageUtils } from "@helper/localStorageUtil";
import { QueryTypes } from "@model/enum";
import {
  QueryBuilderModel,
  QueryComponent,
  QueryElementRelations,
  QueryGroup,
  QueryMultiType,
} from "@model/QueryBuilderModel";
import { IdUtils } from "./idUtils";
import i18n from "@i18n/i18nHandler";

export type StateUpdateProps<T> = {
  root: QueryBuilderModel;
  filtered: T;
};

export const FilteringHelper = {
  modifyQueryBuilderModel: (
    modifiedQueryMultiTypes: QueryMultiType[],
    queryBuilderModel: QueryBuilderModel,
  ): QueryBuilderModel => ({
    ...queryBuilderModel,
    listOfQueries: modifiedQueryMultiTypes,
    queryElementRelation:
      !queryBuilderModel.queryElementRelation && modifiedQueryMultiTypes.length === 2
        ? QueryElementRelations.And
        : queryBuilderModel.queryElementRelation,
  }),

  handleSliceOutOldBranchReplaceWithNewOne: (
    queryBuilderModel: QueryBuilderModel,
    index: number,
    modifiedMultiType?: QueryMultiType,
  ): QueryBuilderModel => {
    const newQueryBuilderModel: QueryBuilderModel = {
      ...queryBuilderModel,
      listOfQueries: modifiedMultiType
        ? queryBuilderModel.listOfQueries.map((multiType) =>
            multiType.id === index ? modifiedMultiType : multiType,
          )
        : queryBuilderModel.listOfQueries.filter((multiType) => multiType.id !== index),
    };
    return FilteringHelper.modifyQueryBuilderModel(
      newQueryBuilderModel.listOfQueries,
      newQueryBuilderModel,
    );
  },

  /**
   * Gives back the branch of the tree that has the same id as in the params.
   *
   * @param root The whole tree to search.
   * @param id The id to search in the tree.
   */
  getBranchFromTreeById: (root: QueryMultiType, id: number) => {
    const getSubBranchOfQueryBuilder = (queryBuilder: QueryBuilderModel) => {
      let tmpResult: QueryMultiType | QueryComponent | undefined;
      for (const queryMultiType of queryBuilder.listOfQueries) {
        const tmp = getSubBranchOfComponent(queryMultiType);
        if (tmp) {
          tmpResult = tmp;
          break;
        }
      }
      return tmpResult;
    };

    const getSubBranchOfQueryGroup = (queryGroup: QueryGroup) =>
      queryGroup.listOfComponents.find((item) => item.id === id);

    const getSubBranchOfComponent = (queryMultiType: QueryMultiType) => {
      if (queryMultiType.id === id) {
        return queryMultiType;
      }
      if (queryMultiType.queryType === QueryTypes.QUERY_BUILDER) {
        return getSubBranchOfQueryBuilder(queryMultiType as QueryBuilderModel);
      } else if (queryMultiType.queryType === QueryTypes.QUERY_GROUP) {
        return getSubBranchOfQueryGroup(queryMultiType as QueryGroup);
      }
      return undefined;
    };

    return getSubBranchOfComponent(root);
  },

  handleFilteringQueryComponentChanges: (
    queryGroup: QueryGroup,
    queryComponent: QueryComponent,
    modifiedQueryComponent?: QueryComponent,
  ) => {
    if (modifiedQueryComponent) {
      const components = queryGroup.listOfComponents.map((item) =>
        item.id === queryComponent.id ? modifiedQueryComponent : item,
      );
      const modifiedQueryGroup: QueryGroup = {
        ...queryGroup,
        listOfComponents: components,
        queryElementRelation:
          !queryGroup.queryElementRelation && components.length === 2
            ? (queryGroup.queryElementRelation = QueryElementRelations.And)
            : queryGroup.queryElementRelation,
      };
      return modifiedQueryGroup;
    } else {
      const components = queryGroup.listOfComponents.filter(
        (item) => item.id !== queryComponent.id,
      );
      const modifiedQueryGroup: QueryGroup = {
        ...queryGroup,
        listOfComponents: components,
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
    modifiedQueryComponent?: QueryComponent | QueryMultiType,
  ): QueryBuilderModel => {
    const getSubBranchOfQueryBuilder = (
      queryBuilder: QueryBuilderModel,
      callback: (modifiedQueryBuilderModel: QueryBuilderModel) => void,
    ) => {
      let tmpResult: QueryMultiType | QueryComponent | undefined;
      for (const queryMultiType of queryBuilder.listOfQueries) {
        const tmp = getSubBranchOfComponent(queryMultiType, (modifiedMultiType) =>
          callback(
            FilteringHelper.handleSliceOutOldBranchReplaceWithNewOne(
              queryBuilder,
              queryMultiType.id,
              modifiedMultiType,
            ),
          ),
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
      callback: (group?: QueryGroup) => void,
    ) => {
      const originalComponent = queryGroup.listOfComponents.find((item) => item.id === id);
      if (originalComponent) {
        callback(
          FilteringHelper.handleFilteringQueryComponentChanges(
            queryGroup,
            originalComponent,
            modifiedQueryComponent,
          ),
        );
      }
      return originalComponent;
    };

    // Optimization needs
    const getSubBranchOfComponent = (
      queryMultiType: QueryMultiType,
      callback: (queryMultiType?: QueryMultiType) => void,
    ) => {
      if (queryMultiType.id === id) {
        callback(modifiedQueryComponent as QueryMultiType);
      }
      if (queryMultiType.queryType === QueryTypes.QUERY_BUILDER) {
        return getSubBranchOfQueryBuilder(queryMultiType as QueryBuilderModel, callback);
      } else if (queryMultiType.queryType === QueryTypes.QUERY_GROUP) {
        return getSubBranchOfQueryGroup(queryMultiType as QueryGroup, callback);
      }
      return undefined;
    };

    let result: QueryBuilderModel | undefined;

    getSubBranchOfComponent(root, (builder) => {
      result = builder as QueryBuilderModel | undefined;
    });
    return result as QueryBuilderModel;
  },

  sendUpdateEvent: (componentId: number) =>
    window.dispatchEvent(new Event(IdUtils.getEventListenerName(componentId))),

  /**
   * Give back the states from the local storage.
   */
  getUpdatedStates<T>(id: number): StateUpdateProps<T> {
    const queryBuilderModel = LocalStorageUtils.getQueryBuilderModel();
    const builder = FilteringHelper.getBranchFromTreeById(
      LocalStorageUtils.getQueryBuilderModel(),
      id,
    ) as T;
    return {
      root: queryBuilderModel,
      filtered: builder,
    };
  },

  isFormInvalid(): boolean {
    const queryBuilder = LocalStorageUtils.getQueryBuilderModel();
    return this.isQueryBuilderValid(queryBuilder.listOfQueries)
      .flat(Infinity)
      .some((value) => value === true);
  },

  isQueryBuilderValid(queryMultiTypes: QueryMultiType[]): any[] {
    return queryMultiTypes.map((model) => {
      if (model.queryType === QueryTypes.QUERY_BUILDER) {
        // Call the same method.
        return this.isQueryBuilderValid((model as QueryBuilderModel).listOfQueries);
      } else if (model.queryType === QueryTypes.QUERY_GROUP) {
        return (model as QueryGroup).listOfComponents.map((qc: QueryComponent) => {
          let isQcModified = false;

          // Check whether the operator input field has not been filled out.
          if (
            (qc.errors?.operatorInput === "" ||
              qc.errors?.operatorInput === i18n.t("validators.required")) &&
            (!qc.operatorInput || qc.operatorInput.length === 0)
          ) {
            isQcModified = true;
            qc = {
              ...qc,
              errors: {
                ...qc?.errors,
                operatorInput: i18n.t("validators.required"),
              },
            };
          }

          // Check whether the select input field has not been filled out.
          if (
            (qc.errors?.selectInput === "" ||
              qc.errors?.selectInput === i18n.t("validators.required")) &&
            (!qc.selectInput || qc.selectInput.length === 0)
          ) {
            isQcModified = true;
            qc = {
              ...qc,
              errors: {
                ...qc?.errors,
                selectInput: i18n.t("validators.required"),
              },
            };
          }

          // Check whether the select input field has not been filled out.
          if (
            qc.selectedFilterTab === "EXIF_DATA" &&
            (qc.errors?.secondSelectInput === "" ||
              qc.errors?.secondSelectInput === i18n.t("validators.required")) &&
            (!qc.secondSelectInput || qc.secondSelectInput.length === 0)
          ) {
            isQcModified = true;
            qc = {
              ...qc,
              errors: {
                ...qc?.errors,
                secondSelectInput: i18n.t("validators.required"),
              },
            };
          }

          // Check whether the selectedFilterTab input field has not been filled out.
          if (!qc.selectedFilterTab || qc.selectedFilterTab.length === 0) {
            isQcModified = true;
            qc = {
              ...qc,
              errors: {
                ...qc?.errors,
                selectedFilterTab: i18n.t("validators.required"),
              },
            };
          }

          if (isQcModified) {
            const states = FilteringHelper.getUpdatedStates<QueryComponent>(qc.id);
            const obj = FilteringHelper.handleFilterChanges(states.root, qc.id, qc);
            LocalStorageUtils.setQueryBuilderModelLocalStorage(obj);
            FilteringHelper.sendUpdateEvent(states.filtered.id);
          }

          return isQcModified;
        });
      } else {
        return false;
      }
    });
  },
};
