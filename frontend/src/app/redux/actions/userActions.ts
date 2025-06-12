import { getUsersCommand } from "@api/command/userCommands";
import UserDto from "@model/dto/UserDto";
import AuthenticatedUserResponse from "@model/response/AuthenticatedUserResponse";
import { UserConsts } from "@redux/consts/userConsts";
import { Dispatch } from "@reduxjs/toolkit";

export const setListOfUsers = (data: UserDto[]) => {
  return {
    type: UserConsts.SET_LIST_OF_USERS,
    payload: data,
  };
};

export const setIsUserListLoading = (data: boolean) => {
  return {
    type: UserConsts.SET_IS_USER_LIST_LOADING,
    payload: data,
  };
};

export const setAuthenticatedUser = (data: AuthenticatedUserResponse) => {
  return {
    type: UserConsts.SET_AUTHENTICATED_USER,
    payload: data,
  };
};

export const requestListOfUsers = (dispatch: Dispatch) => {
  dispatch(setIsUserListLoading(true));
  getUsersCommand()
    .then((res) => dispatch(setListOfUsers(res)))
    .finally(() => dispatch(setIsUserListLoading(false)));
};
