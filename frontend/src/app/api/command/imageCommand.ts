import { NotificationSeverity, throwNotification } from "@helper/notificationUtil";
import { BackendImageControllerEndpoints, ServersToConnectTo } from "@model/enum";
import { getAuthToken } from "@api/handler/requestAuthToken";
import { postCommand } from "@api/handler/requestHandler";
import PageableResponse from '@model/response/PageableResponse';
import ImageDto from '@model/dto/ImageDto';
import FilteringQueryRequest from '@model/request/FilteringQueryRequest';
import PageableProperties from '@model/PageableProperties';

export const getImageByFilters = async (request: FilteringQueryRequest, pageableProperties: PageableProperties) => {
  try {
    const authToken = getAuthToken();
    if (!authToken) {
      return null;
    }
    const response = await postCommand(
      ServersToConnectTo.Backend,
      BackendImageControllerEndpoints.PostFilterImage,
      request,
      authToken,
      pageableProperties,
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
      "" + error,
    );
    return null;
  }
};
