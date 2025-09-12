import StyledMenuComponent from "@components/StyledMenuComponent";
import FolderDtoSlice from "@model/dto/FolderDtoSlice";
import { MenuItemType } from "@model/types/MenuItemType";
import { useDispatch } from "react-redux";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import LockIcon from "@mui/icons-material/Lock";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import i18n from "@i18n/i18nHandler";
import { FolderSettingCellEnum } from "@model/enum/FolderSettingCellEnum";
import { setFolderSettingCellOption } from "@redux/actions/folderActions";

type Props = {
  row: FolderDtoSlice;
};

const ManageFolderSettingCell = ({ row }: Props) => {
  const IS_FOLDER_OWNER = row.isEditable === null;
  const IS_FOLDER_NOT_READ_ONLY = row.isEditable !== false;
  const IS_NOT_EMPTY_FOLDER = row.folderContentSize === 0;
  const dispatch = useDispatch();

  const menuItemOptions: MenuItemType[] = [
    {
      icon: <OpenInBrowserIcon />,
      menuTitle: i18n.t(FolderSettingCellEnum.OPEN),
      isDisplayed: true,
      isDisabled: IS_NOT_EMPTY_FOLDER,
      onClick: (): void => {
        dispatch(setFolderSettingCellOption({ option: FolderSettingCellEnum.OPEN, folder: row }));
      },
    },
    {
      icon: <EditOutlinedIcon />,
      menuTitle: i18n.t(FolderSettingCellEnum.UPDATE),
      isDisplayed: IS_FOLDER_OWNER,
      onClick: (): void => {
        dispatch(setFolderSettingCellOption({ option: FolderSettingCellEnum.UPDATE, folder: row }));
      },
    },
    {
      icon: <ShareIcon />,
      menuTitle: i18n.t(FolderSettingCellEnum.SHARE),
      isDisplayed: IS_FOLDER_OWNER,
      onClick: (): void => {
        dispatch(setFolderSettingCellOption({ option: FolderSettingCellEnum.SHARE, folder: row }));
      },
    },
    {
      icon: <ImportExportIcon />,
      menuTitle: i18n.t(FolderSettingCellEnum.IMPORT),
      isDisplayed: IS_FOLDER_NOT_READ_ONLY,
      onClick: (): void => {
        dispatch(setFolderSettingCellOption({ option: FolderSettingCellEnum.IMPORT, folder: row }));
      },
    },
    {
      icon: <FolderCopyIcon />,
      menuTitle: i18n.t(FolderSettingCellEnum.COPY),
      isDisplayed: IS_FOLDER_NOT_READ_ONLY,
      onClick: (): void => {
        dispatch(setFolderSettingCellOption({ option: FolderSettingCellEnum.COPY, folder: row }));
      },
    },
    {
      icon: <DownloadIcon />,
      menuTitle: i18n.t(FolderSettingCellEnum.DOWNLOAD),
      isDisplayed: IS_FOLDER_NOT_READ_ONLY,
      isDisabled: IS_NOT_EMPTY_FOLDER,
      onClick: (): void => {
        dispatch(
          setFolderSettingCellOption({ option: FolderSettingCellEnum.DOWNLOAD, folder: row }),
        );
      },
    },
    {
      icon: <LockIcon />,
      color: "orange",
      menuTitle: i18n.t(FolderSettingCellEnum.LOCK),
      isDisplayed: IS_FOLDER_OWNER,
      isDisabled: IS_NOT_EMPTY_FOLDER,
      onClick: (): void => {
        dispatch(setFolderSettingCellOption({ option: FolderSettingCellEnum.LOCK, folder: row }));
      },
    },
    {
      icon: <ClearIcon />,
      color: "red",
      menuTitle: i18n.t(FolderSettingCellEnum.CLEAR),
      isDisplayed: IS_FOLDER_OWNER,
      isDisabled: IS_NOT_EMPTY_FOLDER,
      onClick: (): void => {
        dispatch(setFolderSettingCellOption({ option: FolderSettingCellEnum.CLEAR, folder: row }));
      },
    },
    {
      icon: <DeleteForeverOutlinedIcon />,
      color: "red",
      menuTitle: i18n.t(FolderSettingCellEnum.DELETE),
      isDisplayed: IS_FOLDER_OWNER,
      onClick: (): void => {
        dispatch(setFolderSettingCellOption({ option: FolderSettingCellEnum.DELETE, folder: row }));
      },
    },
  ];

  return <StyledMenuComponent options={menuItemOptions} buttonIcon={<MoreVertIcon />} />;
};

export default ManageFolderSettingCell;
