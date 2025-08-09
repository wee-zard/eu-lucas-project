import { dataGridUserTableRowHeight } from "@screens/manageUsersScreen/ManageUsersProfilePicture";
import manageFoldersDataGridColDef from "./config/ManageFoldersDataGridColDef";
import { BackendFolderControllerEndpoints, LocalStorageKeys } from "@model/enum";
import StyledPaginatedDataGridTable from "@components/StyledPaginatedDataGrid";
import PageableResponse from "@model/response/PageableResponse";
import { GenericRowType } from "@model/types/GenericRowType";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";

const ManageFoldersDataGridTable = () => {
  const getDataGridRows = (
    pageableResponse?: PageableResponse<FolderDtoSlice>,
  ): GenericRowType<FolderDtoSlice>[] =>
    pageableResponse?.content.map((object) => ({
      ...object,
      setting: false,
    })) ?? [];

  return (
    <StyledPaginatedDataGridTable<FolderDtoSlice>
      cacheKey={LocalStorageKeys.FolderListDataGrid}
      eventListenerKey={EventListenerIdEnum.PAGINATED_TABLE}
      colDef={manageFoldersDataGridColDef}
      rowHeight={dataGridUserTableRowHeight}
      requestEndpoint={BackendFolderControllerEndpoints.GetFolders}
      getDataGridRows={getDataGridRows}
    />
  );
};

export default ManageFoldersDataGridTable;
