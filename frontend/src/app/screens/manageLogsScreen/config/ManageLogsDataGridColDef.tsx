import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params";
import DateHelper from "@helper/dateHelper";
import { GenericRowType } from "@model/types/GenericRowType";
import i18n from "@i18n/i18nHandler";
import { emptyPlaceholder } from "@global/globalConsts";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import BoundingBoxDialogLogDetails from "@dialogs/boundBoxDialog/timeline/BoundingBoxDialogLogDetails";
import ManageLogsSettingCell from "./ManageLogsSettingCell";
import StyledIconAndTooltip from "@components/StyledIconAndTooltip";

type RenderCellParamType = GridRenderCellParams<GenericRowType<ProcedureLogDto>>;

const manageLogsDataGridColDef: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    flex: 1,
  },
  {
    field: "filename",
    headerName: i18n.t("screens.manageLogs.tableHeader.logTitle"),
    sortable: true,
    flex: 1.5,
  },
  {
    field: "imageName",
    headerName: i18n.t("screens.manageLogs.tableHeader.imageName"),
    sortable: false,
    flex: 1,
    renderCell: (param: RenderCellParamType) => <>{param.row.image.imageName}</>,
  },
  {
    field: "logDetails",
    headerName: i18n.t("screens.manageLogs.tableHeader.logDetails"),
    sortable: false,
    flex: 0.6,
    renderCell: (param: RenderCellParamType) => (
      <div className="flex-container">
        <StyledIconAndTooltip
          tooltip={{
            title: <BoundingBoxDialogLogDetails log={param.row} isEverythingDisplayed />,
            placement: "left",
          }}
        />
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: i18n.t("screens.manageLogs.tableHeader.createdAt"),
    sortable: true,
    flex: 0.85,
    renderCell: (param: RenderCellParamType) => (
      <>{DateHelper.convertISOStringToDateTimeFormat(param.row.createdAt) ?? emptyPlaceholder}</>
    ),
  },
  {
    field: "setting",
    headerName: "",
    sortable: false,
    flex: 0.3,
    renderCell: (param: RenderCellParamType) => <ManageLogsSettingCell row={param.row} />,
  },
];

export default manageLogsDataGridColDef;
