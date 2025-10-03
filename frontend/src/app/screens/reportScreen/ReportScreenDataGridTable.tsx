import StyledPaginatedDataGridTable from "@components/StyledPaginatedDataGrid";
import ReportDto from "@model/dto/ReportDto";
import { BackendReportControllerEndpoints, LocalStorageKeys } from "@model/enum";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import PageableResponse from "@model/response/PageableResponse";
import { GenericRowType } from "@model/types/GenericRowType";
import { dataGridUserTableRowHeight } from "@screens/manageUsersScreen/ManageUsersProfilePicture";
import manageReportsDataGridColDef from "./config/ReportScreenDataGridColDef";

/**
 * TODO: Once the 'getDataGridRows' method is moved inside the 'StyledPaginatedDataGridTable' component,
 * than this type is not needed any longer.
 */
type CommonGenericRowType = PageableResponse<ReportDto>;

const ReportScreenDataGridTable = () => {
  // TODO: Maybe this should be moved inside the 'StyledPaginatedDataGridTable' component.
  const getDataGridRows = (
    pageableResponse?: PageableResponse<CommonGenericRowType>,
  ): GenericRowType<CommonGenericRowType>[] =>
    pageableResponse?.content.map((object) => ({
      ...object,
      setting: false,
    })) ?? [];

  return (
    // TODO: Maybe it is not necessary to specify the 'T' type of the component.
    <StyledPaginatedDataGridTable<CommonGenericRowType>
      cacheKey={LocalStorageKeys.ManageReportsDataGrid}
      eventListenerKey={EventListenerIdEnum.PAGINATED_TABLE}
      colDef={manageReportsDataGridColDef}
      rowHeight={dataGridUserTableRowHeight}
      requestEndpoint={BackendReportControllerEndpoints.ListAllReport}
      getDataGridRows={getDataGridRows}
    />
  );
};

export default ReportScreenDataGridTable;
