import {
  BackendImageFetcherControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";

abstract class ImageFetcherCommands {
  public static downloadImagesByUrl = (request: string): Promise<string> =>
    commandHandler<string>({
      type: RequestCommandTypes.POST,
      server: ServersToConnectTo.Backend,
      endpoint: BackendImageFetcherControllerEndpoints.DownloadImagesByUrls,
      obj: [request],
      header: {
        isAuthTokenMandatory: true,
      },
    });
}

export default ImageFetcherCommands;
