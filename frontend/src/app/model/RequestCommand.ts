import { RequestCommandTypes, RootEndpoints, ServersToConnectTo } from "@model/enum";
import PageableProperties from "@model/PageableProperties";

export default class RequestCommand {
  constructor(
    public type: RequestCommandTypes,
    /**
     * The server where the request will be sent to.
     */
    public server: ServersToConnectTo,
    /**
     * The endpoint of the server.
     */
    public endpoint: RootEndpoints,
    /**
     * This carries the object of the post requests,
     * or the params of the get requests.
     */
    public obj: unknown,
    /**
     * Optional header attributes of the requests.
     */
    public header: RequestCommandHeader,
    /**
     * If true, then the possible error messages will not be
     * thrown by the toast as they will be hidden.
     */
    public isToastHidden?: boolean,
  ) {}
}

type RequestCommandHeader = {
  isAuthTokenMandatory?: boolean;
  pageableProperties?: PageableProperties;
};
