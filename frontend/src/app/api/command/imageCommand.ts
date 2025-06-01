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
import { ProcedureResultRequestFile } from "@model/request/ProcedureResultRequest";
import i18n from "@i18n/i18nHandler";

abstract class ImageCommands {
  public static getImagesByFilters = (
    request: FilteringQueryRequest,
    pageableProperties: PageableProperties,
  ): Promise<PageableResponse<ImageDto> | null> =>
    commandHandler<PageableResponse<ImageDto>>({
      type: RequestCommandTypes.POST,
      server: ServersToConnectTo.Backend,
      endpoint: BackendImageControllerEndpoints.PostFilterImage,
      obj: request,
      header: {
        isAuthTokenMandatory: true,
        pageableProperties: pageableProperties,
      },
      errorMessage: i18n.t("api.commands.image.getImagesByFilters"),
    });

  public static postByImageNameAndCreationYear = (
    files: ProcedureResultRequestFile[],
  ): Promise<ImageDto[]> =>
    commandHandler<ImageDto[]>({
      type: RequestCommandTypes.POST,
      server: ServersToConnectTo.Backend,
      endpoint: BackendImageControllerEndpoints.GetImageByImageNameAndCreationYear,
      obj: {
        files: files,
      },
      header: {
        isAuthTokenMandatory: true,
      },
      errorMessage: i18n.t("api.commands.image.postByImageNameAndCreationYear"),
    });
}

export default ImageCommands;
