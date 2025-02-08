import {
  BackendImageControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";
import PageableResponse from "@model/response/PageableResponse";
import ImageDto from "@model/dto/ImageDto";
import FilteringQueryRequest from "@model/request/FilteringQueryRequest";
import PageableProperties from "@model/PageableProperties";

export const getImageByFilters = async (
  request: FilteringQueryRequest,
  pageableProperties: PageableProperties,
) => {
  return commandHandler<PageableResponse<ImageDto>>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendImageControllerEndpoints.PostFilterImage,
    obj: request,
    header: {
      isAuthTokenMandatory: true,
      pageableProperties: pageableProperties,
    },
    errorMessage: "Error while executing the image filter command!",
  });
};
