import commandHandler from "@api/handler/requestHandler";
import { DataGridHelper } from "@helper/DataGridHelper";
import { useEventListenerFetcher } from "@hooks/useEventListenerRender";
import {
  LocalStorageKeys,
  RequestCommandTypes,
  RootEndpoints,
  ServersToConnectTo,
} from "@model/enum";
import { EventListenerIdEnum } from "@model/enum/EventListenerIdEnum";
import PageableResponse from "@model/response/PageableResponse";
import { GenericRowType } from "@model/types/GenericRowType";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Props<T> = {
  cacheKey: LocalStorageKeys;
  eventListenerKey: EventListenerIdEnum;
  colDef: GridColDef[];
  rowHeight: number;
  requestEndpoint: RootEndpoints;
  getDataGridRows: (packableResponse?: PageableResponse<T>) => GenericRowType<T>[];
};

function StyledPaginatedDataGridTable<T>({
  cacheKey,
  eventListenerKey,
  colDef,
  rowHeight,
  requestEndpoint,
  getDataGridRows,
}: Props<T>) {
  const paginationModel = { page: 0, pageSize: 5 };
  const paginationOptions: number[] = [5, 10, 25, 50, 100];
  const [pageable, setPageable] = useState<PageableResponse<T>>();
  const dispatch = useDispatch();

  /**
   * Fetch the rows for the data grid table.
   */
  const fetchRows = () => {
    dispatch(setSettingBackdropOpen(true));
    commandHandler<PageableResponse<T>>({
      type: RequestCommandTypes.GET,
      server: ServersToConnectTo.Backend,
      endpoint: requestEndpoint,
      obj: {},
      header: {
        isAuthTokenMandatory: true,
        pageableProperties: helper.getPageableFromLocalStorage(),
      },
    })
      .then((res) => setPageable(res))
      .finally(() => dispatch(setSettingBackdropOpen(false)));
  };

  /**
   * A helper object for managing the data grid table.
   */
  const helper = new DataGridHelper(
    cacheKey,
    { pageNo: paginationModel.page, pageSize: paginationModel.pageSize },
    fetchRows,
  );

  useEventListenerFetcher(eventListenerKey, fetchRows);

  return (
    <Paper sx={{ height: helper.getDataGridTableHeight(rowHeight), width: "100%" }}>
      <StyledDataGrid
        rows={getDataGridRows(pageable)}
        columns={colDef}
        initialState={{ pagination: { paginationModel } }}
        rowHeight={rowHeight}
        autoPageSize={false}
        pageSizeOptions={paginationOptions}
        disableRowSelectionOnClick
        disableColumnResize
        disableColumnMenu
        onPaginationModelChange={helper.handleGridPaginationModelChange}
        onSortModelChange={helper.handleSortModelChange}
        paginationMode="server"
        sortingMode="server"
        paginationModel={{
          page: pageable?.page ?? paginationModel.page,
          pageSize: pageable?.size ?? paginationModel.pageSize,
        }}
        paginationMeta={{ hasNextPage: pageable && pageable.page < pageable.totalPages - 1 }}
        rowCount={(pageable && pageable.totalElements) ?? 0}
      />
    </Paper>
  );
}

export default StyledPaginatedDataGridTable;

const StyledDataGrid = styled(DataGrid)({
  borderRadius: 8,
  border: 0,
});
