import i18n from "@i18n/i18nHandler";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import ShareIcon from "@mui/icons-material/Share";
import SourceIcon from "@mui/icons-material/Source";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

type Props = {
  row: FolderDtoSlice;
  emptyContent: string;
};

const FolderTitleCell = ({ row, emptyContent }: Props) => {
  /**
   * The font size of the icons that are display next to the folder title on the left.
   */
  const FONT_SIZE = "large";

  /**
   * Renders the title of the folders.
   *
   * @returns Returns the title name of the folders. If the folder has an "isEditable" property,
   * then we are displaying the name of the owner of the folder.
   */
  const renderTitleTooltipText = () => {
    const titleName = row.title ?? emptyContent;
    const sharedFolderMessage = i18n.t("screens.folders.manageFolders.config.shared-folder", {
      username: row.ownerName,
    });

    return row.isEditable === null ? titleName : `${titleName} (${sharedFolderMessage})`;
  };

  return (
    <Tooltip title={renderTitleTooltipText()}>
      <StyledFolderWrapper>
        {row.folderContentSize > 0 ? (
          <SourceIcon fontSize={FONT_SIZE} />
        ) : (
          <FolderOpenIcon fontSize={FONT_SIZE} />
        )}
        {row.isEditable != null && <ShareIcon fontSize={FONT_SIZE} />}
        <div>{row.title ?? emptyContent}</div>
      </StyledFolderWrapper>
    </Tooltip>
  );
};

export default FolderTitleCell;

const StyledFolderWrapper = styled("div")({
  display: "flex",
  gap: 8,
  alignItems: "center",
});
