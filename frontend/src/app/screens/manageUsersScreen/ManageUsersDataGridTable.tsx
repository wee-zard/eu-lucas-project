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
import { styled } from "@mui/material";
import ManageUsersStatus from "./ManageUsersStatus";

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
      renderCell: (param) => <ManageUsersStatus row={param.row} />,
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
      renderCell: (param) => <ManageUsersSettings row={param.row} />,
    },
  ];

  const paginationModel = { page: 0, pageSize: 7 };

  const getUserRows = (): ManageUserRowTypes[] => {
    return listOfUsers.map((user) => ({
      ...user,
      profilePicture: FileUtils.base64ToResourceUrl(user.profilePicture),
      setting: false,
    }));
  };

  return (
    <Paper sx={{ height: 640, width: "100%" }}>
      <StyledDataGrid
        rows={getUserRows()}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        rowHeight={dataGridUserTableRowHeight}
        getRowClassName={(params) =>
          `user-status-common user-status-${(params.row as ManageUserRowTypes)?.statusId}`
        }
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

const commonStyle = {
  border: "4px solid",
};

const StyledDataGrid = styled(DataGrid)({
  ".user-status-common": {
    borderRadius: 8,
  },
  ".user-status-1": {
    borderLeft: `${commonStyle.border} orange`,
  },
  ".user-status-2": {
    borderLeft: `${commonStyle.border} black`,
  },
  ".user-status-3": {
    borderLeft: `${commonStyle.border} green`,
  },
  ".user-status-4": {
    borderLeft: `${commonStyle.border} red`,
  },
});
