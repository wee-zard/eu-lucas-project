import ProcedureLogDto from "@model/dto/ProcedureLogDto";

type SelectedProcedureLogModel = {
  log: ProcedureLogDto;
  properties: SelectedProcedureLogProperties;
};

type SelectedProcedureLogProperties = {
  strokeStyle: string;
  lineWidth?: number;
};

export default SelectedProcedureLogModel;
