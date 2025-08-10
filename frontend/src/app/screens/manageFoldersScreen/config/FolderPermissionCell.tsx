import StyledStackChip from "@components/StyledStackChip";
import i18n from "@i18n/i18nHandler";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import ChipColorType from "@model/types/ChipColorType";
import Tooltip from "@mui/material/Tooltip";
import { TranslateOptions } from "i18n-js";

type Props = {
  row: FolderDtoSlice;
};

type PermissionObjType = {
  color: ChipColorType;
  label: string;
  tooltip: string;
};

const FolderPermissionCell = ({ row }: Props) => {
  const options: TranslateOptions = {
    username: row.ownerName,
  };

  const getColorTitleAndTooltipByPermission: PermissionObjType =
    row.isEditable === null
      ? {
          color: "success",
          label: i18n.t("screens.folders.image-to-folder-addition-dialog.permissions.owner"),
          tooltip: i18n.t(
            "screens.folders.manage-folders.config.owner-permission-tooltip",
            options,
          ),
        }
      : row.isEditable
        ? {
            color: "warning",
            label: i18n.t("screens.folders.image-to-folder-addition-dialog.permissions.read-write"),
            tooltip: i18n.t(
              "screens.folders.manage-folders.config.read-write-permission-tooltip",
              options,
            ),
          }
        : {
            color: "error",
            label: i18n.t("screens.folders.image-to-folder-addition-dialog.permissions.read-only"),
            tooltip: i18n.t(
              "screens.folders.manage-folders.config.read-only-permission-tooltip",
              options,
            ),
          };

  return (
    <Tooltip title={getColorTitleAndTooltipByPermission.tooltip}>
      <div style={{ height: "100%" }}>
        <StyledStackChip
          label={getColorTitleAndTooltipByPermission.label}
          color={getColorTitleAndTooltipByPermission.color}
        />
      </div>
    </Tooltip>
  );
};

export default FolderPermissionCell;
