import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params";
import { GenericRowType } from "@model/types/GenericRowType";
import i18n from "@i18n/i18nHandler";
import ReportDto from "@model/dto/ReportDto";
import { renderDateTimeCell, renderTooltipTextCell } from "@helper/dataGridColDefUtil";

type RenderCellParamType = GridRenderCellParams<GenericRowType<ReportDto>>;

const manageReportsDataGridColDef: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    flex: 1,
  },
  {
    field: "title",
    headerName: i18n.t("screens.reporting.tableHeader.title"),
    sortable: true,
    flex: 1.5,
    renderCell: (param: RenderCellParamType) => renderTooltipTextCell(param, "title"),
  },
  {
    field: "description",
    headerName: i18n.t("screens.reporting.tableHeader.description"),
    sortable: true,
    flex: 1.5,
    renderCell: (param: RenderCellParamType) => renderTooltipTextCell(param, "description"),
  },
  {
    field: "type",
    headerName: i18n.t("screens.reporting.tableHeader.type"),
    sortable: true,
    flex: 1,
  },
  {
    field: "status",
    headerName: i18n.t("screens.reporting.tableHeader.status"),
    sortable: true,
    flex: 1,
  },
  {
    field: "reporter",
    headerName: i18n.t("screens.reporting.tableHeader.reporter"),
    sortable: true,
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: i18n.t("screens.reporting.tableHeader.createdAt"),
    sortable: true,
    flex: 0.85,
    renderCell: (param: RenderCellParamType) => renderDateTimeCell(param, "createdAt"),
  },
];

export default manageReportsDataGridColDef;
