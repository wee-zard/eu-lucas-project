import commandHandler from "@api/handler/requestHandler";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import {
  BackendProcedureLogControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import PageableProperties from "@model/PageableProperties";
import PageableResponse from "@model/response/PageableResponse";
import { RequestParamType } from "@model/types/RequestParamType";

/**
 * Fetches the procedure logs associated with the requested image.
 *
 * @param imageId The id of the image.
 * @param pageableProperties Pageable properties to fetch a limited number of logs from the server.
 * @returns Returns a {@link PageableResponse<ProcedureLogDto>} if the request is successful.
 */
export const getProcedureLogByImageId = async (
  imageId: number,
  pageableProperties: PageableProperties,
) => {
  const requestParamType: RequestParamType[] = [
    {
      key: "imageId",
      value: `${imageId}`,
    },
  ];

  return commandHandler<PageableResponse<ProcedureLogDto>>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendProcedureLogControllerEndpoints.GetProcedureLogsByImageId,
    obj: requestParamType,
    header: {
      isAuthTokenMandatory: true,
      pageableProperties: pageableProperties,
    },
  });
};
