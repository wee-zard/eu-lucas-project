import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params";
import { GenericRowType } from "@model/types/GenericRowType";
import i18n from "@i18n/i18nHandler";
import ReportDto from "@model/dto/ReportDto";
import { renderNormalTooltipTextCell, renderTooltipTextCell } from "@helper/dataGridColDefUtil";
import StyledStackChip from "@components/StyledStackChip";
import { ConversionUtils } from "@helper/conversionUtils";
import { ReportTypes } from "@model/enum";

type RenderCellParamType = GridRenderCellParams<GenericRowType<ReportDto>>;

const manageReportsDataGridColDef: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    flex: 0.85,
    renderCell: (param: RenderCellParamType) => renderTooltipTextCell(param, "id"),
  },
  {
    field: "title",
    headerName: i18n.t("screens.reporting.tableHeader.title"),
    sortable: true,
    flex: 1,
    renderCell: (param: RenderCellParamType) => renderTooltipTextCell(param, "title"),
  },
  {
    field: "description",
    headerName: i18n.t("screens.reporting.tableHeader.description"),
    sortable: true,
    flex: 1,
    renderCell: (param: RenderCellParamType) => renderTooltipTextCell(param, "description"),
  },
  {
    field: "type",
    headerName: i18n.t("screens.reporting.tableHeader.type"),
    sortable: true,
    flex: 1,
    renderCell: (param: RenderCellParamType) =>
      renderNormalTooltipTextCell(
        i18n.t(ConversionUtils.ReportTypesToReportTypeNames(param.row.type as ReportTypes) ?? ""),
      ),
  },
  {
    field: "status",
    headerName: i18n.t("screens.reporting.tableHeader.status"),
    sortable: true,
    flex: 0.85,
    renderCell: (param: RenderCellParamType) => {
      const prefix = "translations.reportStatuses";
      return (
        <StyledStackChip
          label={i18n.t(`${prefix}.${param.row.status}.name`)}
          tooltip={{ title: i18n.t(`${prefix}.${param.row.status}.description`) }}
        />
      );
    },
  },
  {
    field: "reporter",
    headerName: i18n.t("screens.reporting.tableHeader.reporter"),
    sortable: true,
    flex: 1,
    renderCell: (param: RenderCellParamType) => renderTooltipTextCell(param, "reporter"),
  },
];

export default manageReportsDataGridColDef;
