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
import { useState } from "react";
import StyledCircularProgressOverlay from "./progressbar/StyledCircularProgressOverlay";
import i18n from "@i18n/i18nHandler";
import { getEmptyPageableResponse } from "@global/globalConsts";

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
  const [response, setResponse] = useState<PageableResponse<T>>();

  /**
   * Fetch the rows for the data grid table.
   */
  const fetchRows = () => {
    setResponse(undefined);
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
      .then(setResponse)
      .catch(() =>
        setResponse(
          getEmptyPageableResponse({
            pageNo: paginationModel.page,
            pageSize: paginationModel.pageSize,
          }),
        ),
      );
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
        rows={getDataGridRows(response)}
        columns={colDef}
        loading={!response}
        slots={{
          loadingOverlay: () => (
            <StyledCircularProgressOverlay
              loadingText={i18n.t("components.dataGridTable.loadingText")}
            />
          ),
        }}
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
          page: response?.page ?? paginationModel.page,
          pageSize: response?.size ?? paginationModel.pageSize,
        }}
        paginationMeta={{ hasNextPage: response && response.page < response.totalPages - 1 }}
        rowCount={(response && response.totalElements) ?? 0}
      />
    </Paper>
  );
}

export default StyledPaginatedDataGridTable;

const StyledDataGrid = styled(DataGrid)({
  borderRadius: 8,
  border: 0,

  "&.MuiDataGrid-root": {
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none !important",
    },

    "& .MuiDataGrid-columnHeader:focus-within": {
      outline: "none !important",
    },
  },
});
