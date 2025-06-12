import UserDto from "@model/dto/UserDto";
import { UserConsts } from "./userConsts";
import AuthenticatedUserResponse from "@model/response/AuthenticatedUserResponse";

interface setListOfUsers {
  type: UserConsts.SET_LIST_OF_USERS;
  payload: UserDto[];
}
interface setIsUserListLoading {
  type: UserConsts.SET_IS_USER_LIST_LOADING;
  payload: boolean;
}
interface setAuthenticatedUser {
  type: UserConsts.SET_AUTHENTICATED_USER;
  payload: AuthenticatedUserResponse;
}

export type USerActionTypes = setListOfUsers | setIsUserListLoading | setAuthenticatedUser;
