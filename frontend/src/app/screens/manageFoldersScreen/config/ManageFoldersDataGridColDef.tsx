import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params";
import { GenericRowType } from "@model/types/GenericRowType";
import i18n from "@i18n/i18nHandler";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import FolderPermissionCell from "./FolderPermissionCell";
import FolderTitleCell from "./FolderTitleCell";
import ManageFolderSettingCell from "./ManageFolderSettingCell";
import { emptyPlaceholder } from "@global/globalConsts";
import {
  renderDateTimeCell,
  renderTextCell,
  renderTooltipTextCell,
} from "@helper/dataGridColDefUtil";

type RenderCellParamType = GridRenderCellParams<GenericRowType<FolderDtoSlice>>;

const manageFoldersDataGridColDef: GridColDef[] = [
  {
    field: "title",
    headerName: i18n.t("screens.folders.manageFolders.config.name"),
    sortable: true,
    flex: 1.2,
    renderCell: (param: RenderCellParamType) => (
      <FolderTitleCell row={param.row} emptyContent={emptyPlaceholder} />
    ),
  },
  {
    field: "isEditable",
    headerName: i18n.t("screens.folders.manageFolders.config.permission"),
    flex: 0.6,
    sortable: false,
    renderCell: (param: RenderCellParamType) => <FolderPermissionCell row={param.row} />,
  },
  {
    field: "description",
    headerName: i18n.t("screens.folders.manageFolders.config.description"),
    sortable: true,
    flex: 1.2,
    renderCell: (param: RenderCellParamType) => renderTooltipTextCell(param, "description"),
  },
  {
    field: "folderContentSize",
    headerName: i18n.t("screens.folders.manageFolders.config.folder-size"),
    flex: 0.6,
    renderCell: (param: RenderCellParamType) => renderTextCell(param, "folderContentSize"),
  },
  {
    field: "createdAt",
    headerName: i18n.t("screens.folders.manageFolders.config.created-at"),
    flex: 0.85,
    sortable: true,
    renderCell: (param: RenderCellParamType) => renderDateTimeCell(param, "createdAt"),
  },
  {
    field: "updatedAt",
    headerName: i18n.t("screens.folders.manageFolders.config.last-updated-at"),
    flex: 0.85,
    sortable: true,
    renderCell: (param: RenderCellParamType) => renderDateTimeCell(param, "updatedAt"),
  },
  {
    field: "setting",
    headerName: "",
    sortable: false,
    flex: 0.3,
    renderCell: (param: RenderCellParamType) => <ManageFolderSettingCell row={param.row} />,
  },
];

export default manageFoldersDataGridColDef;
