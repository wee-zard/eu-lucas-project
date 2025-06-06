import {
  BackendImageFetcherControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";
import commandHandler from "@api/handler/requestHandler";

abstract class ImageFetcherCommands {
  public static downloadImagesByUrl = (request: string): Promise<any> =>
    commandHandler<any>({
      type: RequestCommandTypes.POST,
      server: ServersToConnectTo.Backend,
      endpoint: BackendImageFetcherControllerEndpoints.DownloadImagesByUrls,
      obj: [request],
      header: {
        isAuthTokenMandatory: true,
      },
      errorMessage: "Nem sikerült letölteni a képet a szerverről.",
    });
}

export default ImageFetcherCommands;
