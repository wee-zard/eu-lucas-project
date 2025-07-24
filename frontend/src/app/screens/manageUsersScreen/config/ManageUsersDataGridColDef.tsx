import UserDto from "@model/dto/UserDto";
import { GenericRowType } from "@model/types/GenericRowType";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params/gridCellParams";
import ManageUsersProfilePicture from "../ManageUsersProfilePicture";
import ManageUsersStatus from "../ManageUsersStatus";
import DateHelper from "@helper/dateHelper";
import ManageUsersSettings from "../ManageUsersSettings";

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
      <ManageUsersStatus row={param.row} />
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
