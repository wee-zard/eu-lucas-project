import ProcedureLogDto from "@model/dto/ProcedureLogDto";

export default class SelectedProcedureLogModel {
  constructor(
    public log: ProcedureLogDto,
    public strokeStyle: string,
  ) {}
}
