import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params";
import ShareIcon from "@mui/icons-material/Share";
import SourceIcon from "@mui/icons-material/Source";
import DateHelper from "@helper/dateHelper";
import { styled, Tooltip } from "@mui/material";
import { GenericRowType } from "@model/types/GenericRowType";
import StyledIconButton from "@components/StyledIconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import i18n from "@i18n/i18nHandler";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";

const EMPTY_CONTENT = "-";
const FONT_SIZE = "large";

type RenderCellParamType = GridRenderCellParams<GenericRowType<FolderDtoSlice>>;

const renderTitleTooltipText = (param: RenderCellParamType) => {
  const titleName = param.row.title ?? EMPTY_CONTENT;
  const sharedFolderMessage = i18n.t("screens.folders.manage-folders.config.shared-folder", {
    username: param.row.ownerName,
  });

  return param.row.isEditable === null ? titleName : `${titleName} (${sharedFolderMessage})`;
};

const manageFoldersDataGridColDef: GridColDef[] = [
  {
    field: "title",
    headerName: i18n.t("screens.folders.manage-folders.config.name"),
    sortable: true,
    flex: 1.2,
    renderCell: (param: RenderCellParamType) => (
      <Tooltip title={renderTitleTooltipText(param)}>
        <StyledFolderWrapper>
          {param.row.folderContentSize > 0 ? (
            <SourceIcon fontSize={FONT_SIZE} />
          ) : (
            <FolderOpenIcon fontSize={FONT_SIZE} />
          )}
          {param.row.isEditable != null && <ShareIcon fontSize={FONT_SIZE} />}
          <div>{param.row.title ?? EMPTY_CONTENT}</div>
        </StyledFolderWrapper>
      </Tooltip>
    ),
  },
  {
    field: "description",
    headerName: i18n.t("screens.folders.manage-folders.config.description"),
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
    headerName: i18n.t("screens.folders.manage-folders.config.folder-size"),
    flex: 0.7,
    renderCell: (param: RenderCellParamType) => <>{param.row.folderContentSize ?? EMPTY_CONTENT}</>,
  },
  {
    field: "createdAt",
    headerName: i18n.t("screens.folders.manage-folders.config.created-at"),
    flex: 0.7,
    sortable: true,
    renderCell: (param: RenderCellParamType) => (
      <>{DateHelper.convertISOStringToDateTimeFormat(param.row.createdAt) ?? EMPTY_CONTENT}</>
    ),
  },
  {
    field: "updatedAt",
    headerName: i18n.t("screens.folders.manage-folders.config.last-updated-at"),
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
    renderCell: (_: RenderCellParamType) => (
      <StyledIconButton buttonIcon={<MoreVertIcon />} onClick={() => null} />
    ),
  },
];

const StyledFolderWrapper = styled("div")({
  display: "flex",
  gap: 8,
  alignItems: "center",
});

export default manageFoldersDataGridColDef;
