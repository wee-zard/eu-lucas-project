import FolderDto from "@model/dto/FolderDto";
import { dataGridUserTableRowHeight } from "@screens/manageUsersScreen/ManageUsersProfilePicture";
import { manageFoldersDataGridColDef } from "./config/ManageFoldersDataGridColDef";
import { BackendFolderControllerEndpoints, LocalStorageKeys } from "@model/enum";
import StyledPaginatedDataGridTable from "@components/StyledPaginatedDataGrid";
import PageableResponse from "@model/response/PageableResponse";
import { GenericRowType } from "@model/types/GenericRowType";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";

const ManageFoldersDataGridTable = () => {
  const getDataGridRows = (
    pageableResponse?: PageableResponse<FolderDto>,
  ): GenericRowType<FolderDto>[] =>
    pageableResponse?.content.map((object) => ({
      ...object,
      setting: false,
    })) ?? [];

  return (
    <StyledPaginatedDataGridTable<FolderDto>
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
