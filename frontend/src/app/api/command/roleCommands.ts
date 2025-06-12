import commandHandler from "@api/handler/requestHandler";
import RoleDto from "@model/dto/RoleDto";
import {
  BackendRoleControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";

export const getRolesCommand = (): Promise<RoleDto[]> => {
  return commandHandler<RoleDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendRoleControllerEndpoints.GetAllRole,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
    errorMessage: "Váratlan hiba történt a felhasználói szerepkörök lekérése során!",
  });
};
