import { UserRoleEnum } from "@model/enum/UserRoleEnum";
import { UserStatusEnum } from "@model/enum/UserStatusEnum";

type UserDto = {
  id: number;
  email: string;
  userName: string;
  creationTime: string;
  statusName: string;
  statusId: UserStatusEnum;
  roleName: string;
  roleId: UserRoleEnum;
  profilePicture: string;
};

export default UserDto;
