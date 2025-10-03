import commandHandler from "@api/handler/requestHandler";
import ReportDto from "@model/dto/ReportDto";
import {
  BackendReportControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import { ReportFormGroupModel } from "@model/forms/ReportFormGroup";
import PageableProperties from "@model/PageableProperties";
import BaseResponse from "@model/response/BaseResponse";
import PageableResponse from "@model/response/PageableResponse";

export const saveReportCommand = (request: ReportFormGroupModel): Promise<BaseResponse> => {
  return commandHandler<BaseResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendReportControllerEndpoints.SaveReport,
    obj: request,
    header: {
      isAuthTokenMandatory: true,
    },
  });
};

export const listAllReportCommand = (
  page: PageableProperties,
): Promise<PageableResponse<ReportDto>> => {
  return commandHandler<PageableResponse<ReportDto>>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendReportControllerEndpoints.ListAllReport,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
      pageableProperties: page,
    },
  });
};
