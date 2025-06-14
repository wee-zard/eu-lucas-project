import UserDto from "@model/dto/UserDto";

export type ManageUserRowTypes = UserDto & {
  setting: boolean;
};
