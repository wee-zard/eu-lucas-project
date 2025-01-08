import commandHandler from "@api/handler/requestHandler";
import { BackendProcedureControllerEndpoints, RequestCommandTypes, ServersToConnectTo } from "@model/enum";
import ProcedureResultRequest from "@model/request/ProcedureResultRequest";
import BaseResponse from "@model/response/BaseResponse";

export const uploadProcedureResult = async (request: ProcedureResultRequest) => {
    return commandHandler<BaseResponse>({
      type: RequestCommandTypes.POST,
      server: ServersToConnectTo.Backend,
      endpoint: BackendProcedureControllerEndpoints.UploadProcedureLog,
      obj: request,
      header: {
        isAuthTokenNeeded: true,
      },
      errorMessage: "Váratlan hiba történt az eljárások eredményének feltöltése során!",
    });
  };
  