import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params";
import DateHelper from "@helper/dateHelper";
import { Tooltip } from "@mui/material";
import { GenericRowType } from "@model/types/GenericRowType";
import i18n from "@i18n/i18nHandler";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import FolderPermissionCell from "./FolderPermissionCell";
import FolderTitleCell from "./FolderTitleCell";
import ManageFolderSettingCell from "./ManageFolderSettingCell";

const EMPTY_CONTENT = "-";

type RenderCellParamType = GridRenderCellParams<GenericRowType<FolderDtoSlice>>;

const manageFoldersDataGridColDef: GridColDef[] = [
  {
    field: "title",
    headerName: i18n.t("screens.folders.manageFolders.config.name"),
    sortable: true,
    flex: 1.2,
    renderCell: (param: RenderCellParamType) => (
      <FolderTitleCell row={param.row} emptyContent={EMPTY_CONTENT} />
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
    renderCell: (param: RenderCellParamType) => (
      <Tooltip title={param.row.description ?? EMPTY_CONTENT}>
        <div>{param.row.description ?? EMPTY_CONTENT}</div>
      </Tooltip>
    ),
  },
  {
    field: "folderContentSize",
    headerName: i18n.t("screens.folders.manageFolders.config.folder-size"),
    flex: 0.6,
    renderCell: (param: RenderCellParamType) => <>{param.row.folderContentSize ?? EMPTY_CONTENT}</>,
  },
  {
    field: "createdAt",
    headerName: i18n.t("screens.folders.manageFolders.config.created-at"),
    flex: 0.85,
    sortable: true,
    renderCell: (param: RenderCellParamType) => (
      <>{DateHelper.convertISOStringToDateTimeFormat(param.row.createdAt) ?? EMPTY_CONTENT}</>
    ),
  },
  {
    field: "updatedAt",
    headerName: i18n.t("screens.folders.manageFolders.config.last-updated-at"),
    flex: 0.85,
    sortable: true,
    renderCell: (param: RenderCellParamType) => (
      <>{DateHelper.convertISOStringToDateTimeFormat(param.row.updatedAt) ?? EMPTY_CONTENT}</>
    ),
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
