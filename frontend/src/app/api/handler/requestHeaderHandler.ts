import AuthorizationToken from "@model/AuthorizationToken";
import PageableProperties from "@model/PageableProperties";

export const RequestHeaderHandler = {
  /**
   * Adds the auth token to the header object if exists.
   *
   * @param requestHeader The header section of the http request.
   * @param authToken The auth token what we want to add to the request if it is exists.
   * @returns Returns a new header object that contains the auth token.
   */
  addAuthTokenToHeader: (requestHeader: any, authToken?: string) => {
    return authToken
      ? {
          headers: {
            ...requestHeader.headers,
            ...new AuthorizationToken(authToken).getHeader(),
          },
        }
      : requestHeader;
  },

  /**
   * Adds the auth token to the header object if exists.
   *
   * @param requestHeader The header section of the http request.
   * @param authToken The properties to the PageableResponse want to add to the request if it is exists.
   * @returns Returns a new header object that contains the auth token.
   */

  addPageablePropertiesToHeader: (requestHeader: any, pageableProperties?: PageableProperties) => {
    return pageableProperties
      ? {
          headers: {
            ...requestHeader.headers,
            ...{
              "X-Pageable-Properties": `pageNo=${pageableProperties.pageNo};pageSize=${pageableProperties.pageSize}`,
            },
          },
        }
      : requestHeader;
  },

  /**
   * @param authToken The auth token of the currently browsing user.
   * @param pageableProperties The properties to the PageableResponse.
   * @returns Returns an object that hold the token in the header
   *     for the api requests.
   */
  getRequestHeader: (authToken?: string, pageableProperties?: PageableProperties) => {
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
  },
};
