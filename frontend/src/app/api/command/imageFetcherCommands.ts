import {
  BackendImageFetcherControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";
import LocalImageRequest from "@model/request/LocalImageRequest";
import ImageResponse from "@model/response/ImageResponse";
import PageableResponse from "@model/response/PageableResponse";
import ImageDto from "@model/dto/ImageDto";
import ResourceModel from "@model/types/ResourceModel";

export const downloadImagesByUrlCommand = (request: string): Promise<string> =>
  commandHandler<string>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.Backend,
    endpoint: BackendImageFetcherControllerEndpoints.DownloadImagesByUrls,
    obj: [request],
    header: {
      isAuthTokenMandatory: true,
    },
  });

export const getRandomImagesCommand = (): Promise<PageableResponse<ImageDto>> =>
  commandHandler<PageableResponse<ImageDto>>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendImageFetcherControllerEndpoints.GetRandomImages,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
  });

export const getLocalImageServerResourcesCommand = (): Promise<ResourceModel[]> =>
  commandHandler<ResourceModel[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendImageFetcherControllerEndpoints.DownloadLocalImageServerResources,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
  });

export const fetchImagesFromLocalServerCommand = (
  request: LocalImageRequest,
): Promise<ImageResponse> =>
  commandHandler<ImageResponse>({
    type: RequestCommandTypes.POST,
    server: ServersToConnectTo.LucasImageServer,
    endpoint: BackendImageFetcherControllerEndpoints.FetchImagesFromLocalServer,
    obj: request,
    header: {},
    isToastHidden: true,
  });
