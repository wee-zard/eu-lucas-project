import commandHandler from "@api/handler/requestHandler";
import ProcedureDto from "@model/dto/ProcedureDto";
import {
  BackendProcedureControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import ProcedureResultRequest from "@model/request/ProcedureResultRequest";
import BaseResponse from "@model/response/BaseResponse";

/**
 * Upload the results of the procedures to the server.
 *
 * @param request The object that holds the log of the procedure that needs to be uploaded to the server.
 * @returns Returns a {@link BaseResponse} if the request is successful.
 */
export const uploadProcedureResult = async (request: ProcedureResultRequest) => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendProcedureControllerEndpoints.UploadProcedure,
    obj: request,
    header: {
      isAuthTokenMandatory: true,
    },
    errorMessage: "Váratlan hiba történt az eljárások eredményének feltöltése során!",
  });
};

/**
 * Fetches the list of procedures from the server.
 *
 * @returns Returns a list of {@link ProcedureDto} if the request is successful.
 */
export const getProcedureList = async () => {
  return commandHandler<ProcedureDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendProcedureControllerEndpoints.GetProcedures,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
    errorMessage: "Váratlan hiba történt az eljárások lekérdezése során!",
  });
};

/**
 * Deletes all procedures from the server.
 */
export const deleteProceduresCommand = async () => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.DELETE,
    server: ServersToConnectTo.Backend,
    endpoint: BackendProcedureControllerEndpoints.DeleteProcedures,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
    errorMessage: "Váratlan hiba történt az eljárások törlése során!",
  });
};
