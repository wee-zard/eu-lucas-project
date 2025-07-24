import FolderDto from "@model/dto/FolderDto";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params";
import SourceIcon from "@mui/icons-material/Source";
import DateHelper from "@helper/dateHelper";
import { styled, Tooltip } from "@mui/material";
import { GenericRowType } from "@model/types/GenericRowType";
import StyledIconButton from "@components/StyledIconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

const defaultContent = "-";

export const manageFoldersDataGridColDef: GridColDef[] = [
  {
    field: "title",
    headerName: "Név",
    sortable: true,
    flex: 1.2,
    renderCell: (param: GridRenderCellParams<GenericRowType<FolderDto>>) => (
      <Tooltip title={param.row.title ?? defaultContent}>
        <StyledFolderWrapper>
          {param.row.folderContentSize > 0 ? (
            <SourceIcon fontSize="large" />
          ) : (
            <FolderOpenIcon fontSize="large" />
          )}
          <div>{param.row.title ?? defaultContent}</div>
        </StyledFolderWrapper>
      </Tooltip>
    ),
  },
  {
    field: "description",
    headerName: "Leírása",
    sortable: true,
    flex: 1.2,
    renderCell: (param: GridRenderCellParams<GenericRowType<FolderDto>>) => (
      <Tooltip title={param.row.description ?? defaultContent}>
        <div>{param.row.description ?? defaultContent}</div>
      </Tooltip>
    ),
  },
  {
    field: "folderContentSize",
    headerName: "Képek száma",
    flex: 0.7,
    sortable: false, // TODO: Later, I want to sort the records by this column as well.
    renderCell: (param: GridRenderCellParams<GenericRowType<FolderDto>>) => (
      <>{param.row.folderContentSize ?? defaultContent}</>
    ),
  },
  {
    field: "createdAt",
    headerName: "Létrehozás ideje",
    flex: 0.7,
    sortable: true,
    renderCell: (param: GridRenderCellParams<GenericRowType<FolderDto>>) => (
      <>{DateHelper.convertISOStringToDateTimeFormat(param.row.createdAt) ?? defaultContent}</>
    ),
  },
  {
    field: "updatedAt",
    headerName: "Utolsó módosítás ideje",
    flex: 0.85,
    sortable: true,
    renderCell: (param: GridRenderCellParams<GenericRowType<FolderDto>>) => (
      <>{DateHelper.convertISOStringToDateTimeFormat(param.row.updatedAt) ?? defaultContent}</>
    ),
  },
  {
    field: "setting",
    headerName: "",
    sortable: false,
    flex: 0.3,
    renderCell: (_: GridRenderCellParams<GenericRowType<FolderDto>>) => (
      <StyledIconButton buttonIcon={<MoreVertIcon />} onClick={() => null} />
    ),
  },
];

const StyledFolderWrapper = styled("div")({
  display: "flex",
  gap: 8,
  alignItems: "center",
});
