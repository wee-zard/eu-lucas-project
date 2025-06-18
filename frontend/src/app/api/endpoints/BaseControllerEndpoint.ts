export class BaseControllerEndpoint {
  /**
   * A base endpoint from which every other controller and their endpoints
   * are reachable. This prefix is used before every endpoint.
   */
  public static readonly BASE_API_URL = "/api";

  /**
   * Constructs a base path prefix which is present before every endpoints
   * of the controller.
   *
   * @param base The base name of the controller.
   * @returns
   */
  public static getPath = (base: string) => {
    return `${this.BASE_API_URL}${base}`;
  };
}
