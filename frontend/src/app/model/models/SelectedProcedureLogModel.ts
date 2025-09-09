import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import SelectedProcedureLogProperties from "./SelectedProcedureLogProperties";

type SelectedProcedureLogModel = {
  log: ProcedureLogDto;
  properties: SelectedProcedureLogProperties;
};

export default SelectedProcedureLogModel;
