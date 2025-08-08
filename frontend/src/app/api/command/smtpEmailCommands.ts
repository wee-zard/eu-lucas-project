import commandHandler from "@api/handler/requestHandler";
import {
  BackendSmtpEmailControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import { ReportFormGroupModel } from "@model/forms/ReportFormGroup";
import BaseResponse from "@model/response/BaseResponse";

export const sendReportEmail = async (request: ReportFormGroupModel) => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendSmtpEmailControllerEndpoints.ReportEmail,
    obj: request,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};
