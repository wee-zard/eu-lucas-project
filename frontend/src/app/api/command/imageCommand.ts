import { OperatorComparableItems, OperatorSelectItems } from './../../model/enum';
import { NotificationSeverity, throwNotification } from "../../helper/notificationUtil";
import { BackendImageControllerEndpoints, FilterDialogFilterOptions, ServersToConnectTo } from "../../model/enum";
import { FilterFormDataGrid, OperatorItems } from "../../model/FilterFormComponents";
import { getAuthToken } from "../handler/requestAuthToken";
import { postCommand } from "../handler/requestHandler";
import PageableResponse from '../../model/response/PageableResponse';
import ImageDto from '../../model/dto/ImageDto';

export const alma = 10;
/*
export const fetchImage = (
  imageRequest: ImageRequest[],
  callback: (data: string[]) => void
) => {
  postRequest(ImageServiceEndpoints.FetchImage, imageRequest, (response) => {
    if (response && response.err) {
      // TODO: Make a custom alert message.
      alert(response.err);
    } else if (response.res){
      const data: string[] = response.res;
      callback(data);
    }
  });
};

export const getRandomImage = (
    callback: (data: ImageModel) => void
  ) => {
    getRequestBackend(BackendControllers.ApiImage, BackendImageControllerEndpoints.RandomImage, {}, 
    (response) => {
      if (response && response.err) {
        // TODO: Make a custom alert message.
        alert(response.err);
      } else if (response.res && response.res instanceof ImageModel){
        callback(response.res);
      }
    });
  };

  export const getRandomImages = (
    callback: (data: ImageModel[]) => void
  ) => {
    getRequestBackend(BackendControllers.ApiImage, BackendImageControllerEndpoints.RandomImages, {}, 
    (response) => {
      if (response && response.err) {
        // TODO: Make a custom alert message.
        alert(response.err);
      } else if (response.res){
        const data: ImageModel[] = response.res;
        callback(data);
      }
    });
  };
*/

// TODO: Delete later.
const filterTabToConstEnum = (option: FilterDialogFilterOptions): string => {
  switch(option) {
    case FilterDialogFilterOptions.Year:
      return "YEAR";
    case FilterDialogFilterOptions.Country:
      return "COUNTRY";
    case FilterDialogFilterOptions.XCoordinates:
      return "X_COORDINATE";
    case FilterDialogFilterOptions.YCoordinates:
      return "Y_COORDINATE";
    case FilterDialogFilterOptions.Direction:
      return "DIRECTION";
    default:
      return "";
  }
}

// TODO: Delete later
const filterOperatorToConstEnum = (option?: OperatorItems): string => {
  switch(option) {
    case OperatorComparableItems.Greater:
      return "GREATER";
    case OperatorComparableItems.GreaterOrEqual:
      return "GREATER_OR_EQUAL";
    case OperatorComparableItems.Less:
      return "LESS";
    case OperatorComparableItems.LessOrEqual:
      return "LESS_OR_EQUAL";
    case OperatorSelectItems.DoesNotEqual:
      return "DOES_NOT_EQUALS";
    case OperatorSelectItems.Equals:
      return "EQUALS";
    default:
      return "";
  }
}

export const filterImageByFilters = async (filterFormDataGrid: FilterFormDataGrid) => {
  try {
    const authToken = getAuthToken();
    if (!authToken) {
      return null;
    }

    // TODO: Remove later.
    const obj = filterFormDataGrid.filterComponents.map((group) => ({
      ...group,
      groupFormId: 1,
      selectedFilterTab: filterTabToConstEnum(group.selectedFilterTab),
      operatorInput: filterOperatorToConstEnum(group.operatorInput),
    }));
    const obj2 = filterFormDataGrid.groupRelations.map((relation) => ({
      inputComponentId: 1,
      outputComponentId: 1,
      logicalExpression: relation.logicalExpression
    }));
    const filt = {
      filterComponents: obj,
      groupRelations: obj2,
    }

    const response = await postCommand(
      ServersToConnectTo.Backend,
      BackendImageControllerEndpoints.PostFilterImage,
      filt,
      authToken
    );
    if (response.status !== 200) {
      throwNotification(NotificationSeverity.Error, response.data.message);
      return null;
    }
    const result: PageableResponse<ImageDto> = response.data;
    return result;
  } catch (error) {
    throwNotification(
      NotificationSeverity.Error,
      "Error while executing the filter images by filters!"
    );
    return null;
  }
};