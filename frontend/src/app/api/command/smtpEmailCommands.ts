import commandHandler from "@api/handler/requestHandler";
import {
  BackendSmtpEmailControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import SmtpEmailRequest from "@model/request/SmtpEmailRequest";
import BaseResponse from "@model/response/BaseResponse";

export const sendReportEmail = async (request: SmtpEmailRequest) => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendSmtpEmailControllerEndpoints.ReportEmail,
    obj: request,
    header: {
      isAuthTokenNeeded: true,
    },
    errorMessage: "Váratlan hiba történt a bejelentés elküldése során!",
  });
};
