import { Dispatch } from "@reduxjs/toolkit";
import ProcedureDto from "@model/dto/ProcedureDto";
import { ProcedureConsts } from "@redux/consts/procedureConsts";
import { getProcedureList } from "@api/command/procedureCommands";

export const setProcedureRequest = () => {
  return {
    type: ProcedureConsts.REQUEST_PROCEDURE,
  };
};

export const setProcedureFailed = () => {
  return {
    type: ProcedureConsts.REQUESTING_PROCEDURE_FAILED,
  };
};

export const setProcedureSucceeded = (data: ProcedureDto[]) => {
  return {
    type: ProcedureConsts.REQUESTING_PROCEDURE_SUCCEEDED,
    payload: data,
  };
};

export const requestProcedureList = (dispatch: Dispatch) => {
  dispatch(setProcedureRequest());
  getProcedureList()
    .then((response) => {
      if (response) {
        dispatch(setProcedureSucceeded(response));
      } else {
        dispatch(setProcedureFailed());
      }
    })
    .catch(() => dispatch(setProcedureFailed()));
};
