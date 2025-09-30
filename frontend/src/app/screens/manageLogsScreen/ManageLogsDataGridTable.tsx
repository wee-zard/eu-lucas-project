import { dataGridUserTableRowHeight } from "@screens/manageUsersScreen/ManageUsersProfilePicture";
import { BackendProcedureLogControllerEndpoints, LocalStorageKeys } from "@model/enum";
import StyledPaginatedDataGridTable from "@components/StyledPaginatedDataGrid";
import PageableResponse from "@model/response/PageableResponse";
import { GenericRowType } from "@model/types/GenericRowType";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import manageLogsDataGridColDef from "./config/ManageLogsDataGridColDef";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";

type CommonGenericRowType = ProcedureLogDto;

const ManageLogsDataGridTable = () => {
  const getDataGridRows = (
    pageableResponse?: PageableResponse<CommonGenericRowType>,
  ): GenericRowType<CommonGenericRowType>[] =>
    pageableResponse?.content.map((object) => ({
      ...object,
      setting: false,
    })) ?? [];

  return (
    <StyledPaginatedDataGridTable<CommonGenericRowType>
      cacheKey={LocalStorageKeys.ManageLogsDataGrid}
      eventListenerKey={EventListenerIdEnum.PAGINATED_TABLE}
      colDef={manageLogsDataGridColDef}
      rowHeight={dataGridUserTableRowHeight}
      requestEndpoint={BackendProcedureLogControllerEndpoints.GetProcedureLogs}
      getDataGridRows={getDataGridRows}
    />
  );
};

export default ManageLogsDataGridTable;
