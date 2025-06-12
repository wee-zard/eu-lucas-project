import UserDto from "@model/dto/UserDto";
import { UserConsts } from "./userConsts";

interface setListOfUsers {
  type: UserConsts.SET_LIST_OF_USERS;
  payload: UserDto[];
}
interface setIsUserListLoading {
  type: UserConsts.SET_IS_USER_LIST_LOADING;
  payload: boolean;
}

export type USerActionTypes = setListOfUsers | setIsUserListLoading;
