import AuthorizationToken from "@model/AuthorizationToken";
import PageableProperties from "@model/PageableProperties";
import RequestCommand from "@model/RequestCommand";
import getAuthToken from "./requestAuthToken";

export default abstract class RequestHeaderHandler {
  /**
   * Adds the auth token to the header object if exists.
   *
   * @param requestHeader The header section of the http request.
   * @param authToken The auth token what we want to add to the request if it is exists.
   * @returns Returns a new header object that contains the auth token.
   */
  private static addAuthTokenToHeader = (requestHeader: any, authToken?: string) => {
    return authToken
      ? {
          headers: {
            ...requestHeader.headers,
            ...new AuthorizationToken(authToken).getHeader(),
          },
        }
      : requestHeader;
  };

  /**
   * Adds the auth token to the header object if exists.
   *
   * @param requestHeader The header section of the http request.
   * @param authToken The properties to the PageableResponse want to add to the request if it is exists.
   * @returns Returns a new header object that contains the auth token.
   */
  private static addPageablePropertiesToHeader = (
    requestHeader: any,
    pageableProperties?: PageableProperties,
  ) => {
    return pageableProperties
      ? {
          headers: {
            ...requestHeader.headers,
            ...{
              "X-Pageable-Properties": this.getPageablePropertiesQueryParam(pageableProperties),
            },
          },
        }
      : requestHeader;
  };

  private static getPageablePropertiesQueryParam = (pageableProperties: PageableProperties) => {
    return Object.keys(pageableProperties)
      .map((key, index) => `${key}=${Object.values(pageableProperties)[index]}`)
      .join(";");
  };

  /**
   * @param authToken The auth token of the currently browsing user.
   * @param pageableProperties The properties to the PageableResponse.
   * @returns Returns an object that hold the token in the header
   *     for the api requests.
   */
  private static getRequestHeader = (
    authToken?: string,
    pageableProperties?: PageableProperties,
  ) => {
    const requestHeader = {
      header: {},
    };
    const requestHeaderWithAuthToken = RequestHeaderHandler.addAuthTokenToHeader(
      requestHeader,
      authToken,
    );
    const requestHeaderWithPageableProperties = RequestHeaderHandler.addPageablePropertiesToHeader(
      requestHeaderWithAuthToken,
      pageableProperties,
    );
    return requestHeaderWithPageableProperties;
  };

  /**
   * Init the auth token of the request if it is requested.
   *
   * @param command A request command template which will be used to construct a new http request.
   * @returns Returns the auth token if it is required to send out by the {@link RequestCommand}.
   */
  private static initAuthToken = (command: RequestCommand): string | undefined => {
    return command.header.isAuthTokenMandatory ? getAuthToken() : undefined;
  };

  /**
   * Init the header of the requests. Provides the params if the command states them
   * to be there.
   *
   * @param command A request command template which will be used to construct a new http request.
   * @param isParamProvided Tells whether the request contains request params or not.
   * @returns Returns an object that contains the header of the request.
   */
  public static initRequestHeader = (command: RequestCommand, isParamProvided: boolean = false) => {
    return {
      ...RequestHeaderHandler.getRequestHeader(
        RequestHeaderHandler.initAuthToken(command),
        command.header.pageableProperties,
      ),
      param: isParamProvided ? (!!command.obj ? command.obj : undefined) : undefined,
    };
  };
}
