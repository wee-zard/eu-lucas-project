import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useEffect, useState } from "react";
import FileUtils from "@helper/fileUtils";
import { dataGridUserTableRowHeight } from "./ManageUsersProfilePicture";
import { useSelector } from "react-redux";
import { selectListOfUsers } from "@redux/selectors/userSelector";
import { requestListOfUsers } from "@redux/actions/userActions";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material";
import { GenericRowType } from "@model/types/GenericRowType";
import UserDto from "@model/dto/UserDto";
import { manageUsersDataGridColDef } from "./config/ManageUsersDataGridColDef";

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
  }, [isRequested, dispatch]);

  const paginationModel = { page: 0, pageSize: 7 };

  const getDataGridRows = (): GenericRowType<UserDto>[] => {
    return listOfUsers.map((user) => ({
      ...user,
      profilePicture: FileUtils.base64ToResourceUrl(user.profilePicture),
      setting: false,
    }));
  };

  return (
    <Paper sx={{ height: 640, width: "100%" }}>
      <StyledDataGrid
        rows={getDataGridRows()}
        columns={manageUsersDataGridColDef}
        initialState={{ pagination: { paginationModel } }}
        rowHeight={dataGridUserTableRowHeight}
        getRowClassName={(params) =>
          `user-status-common user-status-${(params.row as GenericRowType<UserDto>)?.statusId}`
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
