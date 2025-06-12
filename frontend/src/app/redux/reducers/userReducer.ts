import UserDto from "@model/dto/UserDto";
import { USerActionTypes } from "@redux/consts/userActionTypes";
import { UserConsts } from "@redux/consts/userConsts";

interface UserReducerStateType {
  isUserListLoading: boolean;
  listOfUsers: UserDto[];
}

const initialState: UserReducerStateType = {
  isUserListLoading: false,
  listOfUsers: [],
};

const userReducer = (state = initialState, action: USerActionTypes): UserReducerStateType => {
  switch (action.type) {
    case UserConsts.SET_IS_USER_LIST_LOADING:
      return {
        ...state,
        isUserListLoading: action.payload,
      };
    case UserConsts.SET_LIST_OF_USERS:
      return {
        ...state,
        listOfUsers: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
