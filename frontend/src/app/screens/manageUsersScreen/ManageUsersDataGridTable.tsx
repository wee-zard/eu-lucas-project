import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models";
import DateHelper from "@helper/dateHelper";
import { useEffect, useState } from "react";
import { ManageUserRowTypes } from "@model/types/ManageUserRowType";
import FileUtils from "@helper/fileUtils";
import ManageUsersSettings from "./ManageUsersSettings";
import ManageUsersProfilePicture, { dataGridUserTableRowHeight } from "./ManageUsersProfilePicture";
import { useSelector } from "react-redux";
import { selectListOfUsers } from "@redux/selectors/userSelector";
import { requestListOfUsers } from "@redux/actions/userActions";
import { useDispatch } from "react-redux";

const ManageUsersDataGridTable = () => {
  const [isRequested, setRequested] = useState<boolean>(false);
  const listOfUsers = useSelector(selectListOfUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRequested) {
      return;
    }

    requestListOfUsers(dispatch);
    setRequested(true);
  }, [isRequested]);

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
    <Paper sx={{ height: 615, width: "100%" }}>
      <DataGrid
        rows={getUserRows()}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        rowHeight={dataGridUserTableRowHeight}
        autoPageSize={false}
        disableRowSelectionOnClick
        disableColumnResize
        disableColumnMenu
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default ManageUsersDataGridTable;
