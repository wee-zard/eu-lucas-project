import { Dispatch } from "@reduxjs/toolkit";
import { ProcedureLogParamConsts } from "@redux/consts/procedureLogParamConsts";
import ProcedureLogParamDto from "@model/dto/ProcedureLogParamDto";
import { getProcedureLogParams } from "@api/command/procedureLogParamCommands";

export const setProcedureLogParamRequest = () => {
  return {
    type: ProcedureLogParamConsts.REQUEST_PROCEDURE_LOG_PARAM,
  };
};

export const setProcedureLogParamFailed = () => {
  return {
    type: ProcedureLogParamConsts.REQUESTING_PROCEDURE_LOG_PARAM_FAILED,
  };
};

export const setProcedureLogParamSucceeded = (data: ProcedureLogParamDto[]) => {
  return {
    type: ProcedureLogParamConsts.REQUESTING_PROCEDURE_LOG_PARAM_SUCCEEDED,
    payload: data,
  };
};

export const requestProcedureLogParams = (dispatch: Dispatch) => {
  dispatch(setProcedureLogParamRequest());
  getProcedureLogParams()
    .then((response) => {
      if (response) {
        dispatch(setProcedureLogParamSucceeded(response));
      } else {
        dispatch(setProcedureLogParamFailed());
      }
    })
    .catch(() => dispatch(setProcedureLogParamFailed()));
};
