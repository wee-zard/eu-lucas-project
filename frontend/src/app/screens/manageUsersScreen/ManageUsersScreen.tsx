import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models";
import DateHelper from "@helper/dateHelper";
import { useEffect, useState } from "react";
import UserDto from "@model/dto/UserDto";
import { getUsersCommand } from "@api/command/userCommands";
import { ManageUserRowTypes } from "@model/types/ManageUserRowType";
import FileUtils from "@helper/fileUtils";
import ManageUsersSettings from "./ManageUsersSettings";
import ManageUsersProfilePicture, { dataGridUserTableRowHeight } from "./ManageUsersProfilePicture";

const ManageUsersScreen = () => {
  const [listOfUsers, setListOfUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    if (listOfUsers.length !== 0) {
      return;
    }

    getUsersCommand().then(setListOfUsers);
  }, [listOfUsers]);

  const columns: GridColDef[] = [
    {
      field: "profilePicture",
      headerName: "Account",
      sortable: false,
      flex: 2,
      renderCell: (param) => <ManageUsersProfilePicture row={param.row} />,
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
    },
    {
      field: "creationTime",
      headerName: "Joined time",
      flex: 1,
      valueGetter: (value: string) => DateHelper.convertISOStringToDateTimeFormat(value),
    },
    {
      field: "setting",
      headerName: "",
      flex: 1,
      renderCell: (param) => <ManageUsersSettings row={param.row} />,
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const getUserRows = (): ManageUserRowTypes[] => {
    return listOfUsers.map((user) => ({
      ...user,
      profilePicture: FileUtils.base64ToResourceUrl(user.profilePicture),
      setting: false,
    }));
  };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={getUserRows()}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        rowHeight={dataGridUserTableRowHeight}
        autoPageSize
        disableRowSelectionOnClick
        disableColumnResize
        disableColumnMenu
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default ManageUsersScreen;
