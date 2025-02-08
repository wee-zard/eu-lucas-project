import { Dispatch } from "@reduxjs/toolkit";
import ProcedureDto from "@model/dto/ProcedureDto";
import ApplicationStorageModel from "@model/ApplicationStorageModel";
import { fetchListFromApplicationStorage, setLocalStorageItem } from "@helper/localStorageUtil";
import { ApplicationStorageKeys, LocalStorageKeys } from "@model/enum";
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

const initStorage = (dispatch: Dispatch, storage: ApplicationStorageModel) => {
  getProcedureList()
    .then((response) => {
      if (response) {
        const newStorage: ApplicationStorageModel = { ...storage, procedure: response };
        setLocalStorageItem(JSON.stringify(newStorage), LocalStorageKeys.ApplicationStorage);
        dispatch(setProcedureSucceeded(response));
      } else {
        dispatch(setProcedureFailed());
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(setProcedureFailed());
    });
};

export const requestProcedureList = (dispatch: Dispatch) => {
  dispatch(setProcedureRequest());
  fetchListFromApplicationStorage<ProcedureDto[]>({
    dispatch,
    key: ApplicationStorageKeys.Procedure,
    initMethod: initStorage,
    successful: setProcedureSucceeded,
  });
};
