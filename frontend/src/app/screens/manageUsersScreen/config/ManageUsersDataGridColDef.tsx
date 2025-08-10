import UserDto from "@model/dto/UserDto";
import { GenericRowType } from "@model/types/GenericRowType";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params/gridCellParams";
import ManageUsersProfilePicture from "../ManageUsersProfilePicture";
import DateHelper from "@helper/dateHelper";
import ManageUsersSettings from "../ManageUsersSettings";
import StyledStackChip from "@components/StyledStackChip";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { UserStatusEnum } from "@model/enum/UserStatusEnum";
import ChipColorType from "@model/types/ChipColorType";

const userStatusHandler: GenericHandlerType<UserStatusEnum, ChipColorType> = {
  [UserStatusEnum.PENDING]: "warning",
  [UserStatusEnum.BLOCKED]: "error",
  [UserStatusEnum.ACTIVATED]: "success",
  [UserStatusEnum.DELETED]: "error",
};

export const manageUsersDataGridColDef: GridColDef[] = [
  {
    field: "profilePicture",
    headerName: "Account",
    sortable: false,
    flex: 2,
    renderCell: (param: GridRenderCellParams<GenericRowType<UserDto>>) => (
      <ManageUsersProfilePicture row={param.row} />
    ),
  },
  {
    field: "roleName",
    headerName: "Role",
    flex: 1,
  },
  {
    field: "statusName",
    headerName: "Status",
    flex: 1,
    renderCell: (param: GridRenderCellParams<GenericRowType<UserDto>>) => (
      <StyledStackChip label={param.row.statusName} color={userStatusHandler[param.row.statusId]} />
    ),
  },
  {
    field: "creationTime",
    headerName: "Joined time",
    flex: 1,
    valueGetter: DateHelper.convertISOStringToDateTimeFormat,
  },
  {
    field: "setting",
    headerName: "",
    sortable: false,
    flex: 1,
    renderCell: (param: GridRenderCellParams<GenericRowType<UserDto>>) => (
      <ManageUsersSettings row={param.row} />
    ),
  },
];
