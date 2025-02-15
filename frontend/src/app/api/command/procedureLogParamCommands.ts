import commandHandler from "@api/handler/requestHandler";
import ProcedureLogParamDto from "@model/dto/ProcedureLogParamDto";
import {
  BackendProcedureLogParamControllerEndpoints,
  RequestCommandTypes,
  ServersToConnectTo,
} from "@model/enum";

/**
 * Fetches the list of procedure log params from the server.
 *
 * @returns Returns a list of {@link ProcedureLogParamDto} if the request is successful.
 */
export const getProcedureLogParams = async () => {
  return commandHandler<ProcedureLogParamDto[]>({
    type: RequestCommandTypes.GET,
    server: ServersToConnectTo.Backend,
    endpoint: BackendProcedureLogParamControllerEndpoints.GetProcedureParamsByProcedureId,
    obj: {},
    header: {
      isAuthTokenMandatory: true,
    },
    errorMessage: "Váratlan hiba történt az eljárás paramétereinek lekérdezése során!",
  });
};
