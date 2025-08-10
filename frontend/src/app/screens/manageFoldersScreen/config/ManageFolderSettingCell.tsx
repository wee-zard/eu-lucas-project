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
import { setSettingBackdropOpen } from "@redux/actions/settingActions";
import ZipHelper from "@screens/manageFoldersScreen/helper/zipHelper";

type Props = {
  row: FolderDtoSlice;
};

const ManageFolderSettingCell = ({ row }: Props) => {
  const IS_FOLDER_OWNER = row.isEditable === null;
  const IS_FOLDER_NOT_READ_ONLY = row.isEditable !== false;
  const dispatch = useDispatch();

  const menuItemOptions: MenuItemType[] = [
    {
      icon: <OpenInBrowserIcon />,
      menuTitle: "Megnyitása",
      isDisplayed: true,
      onClick: (): void => {
        // TODO: ...
      },
    },
    {
      icon: <EditOutlinedIcon />,
      menuTitle: "Adatok módosítás",
      isDisplayed: IS_FOLDER_OWNER,
      onClick: (): void => {
        // TODO: ...
      },
    },
    {
      icon: <ShareIcon />,
      menuTitle: "Megosztás- és Jogosultságok kezelés",
      isDisplayed: IS_FOLDER_OWNER,
      onClick: (): void => {
        // TODO: ...
      },
    },
    {
      icon: <ImportExportIcon />,
      menuTitle: "Képek importálása",
      isDisplayed: IS_FOLDER_NOT_READ_ONLY,
      onClick: (): void => {
        // TODO: ...
      },
    },
    {
      icon: <FolderCopyIcon />,
      menuTitle: "Másolat létrehozása",
      isDisplayed: IS_FOLDER_NOT_READ_ONLY,
      onClick: (): void => {
        // TODO: ...
      },
    },
    {
      icon: <DownloadIcon />,
      menuTitle: "Mappa letöltése",
      isDisplayed: IS_FOLDER_NOT_READ_ONLY,
      isDisabled: row.folderContentSize === 0,
      onClick: (): void => {
        dispatch(setSettingBackdropOpen(true));
        const zipHelper = new ZipHelper([]); // TODO: Pass the folder's images here.
        zipHelper.downloadZip().finally(() => dispatch(setSettingBackdropOpen(false)));
      },
    },
    {
      icon: <LockIcon />,
      color: "orange",
      menuTitle: "Zárolás",
      isDisplayed: IS_FOLDER_NOT_READ_ONLY,
      onClick: (): void => {
        // TODO: ...
      },
    },
    {
      icon: <ClearIcon />,
      color: "red",
      menuTitle: "Mappa tartalmának kiürítése",
      isDisplayed: IS_FOLDER_OWNER,
      isDisabled: row.folderContentSize === 0,
      onClick: (): void => {
        // TODO: ...
      },
    },
    {
      icon: <DeleteForeverOutlinedIcon />,
      color: "red",
      menuTitle: "Törlése",
      isDisplayed: IS_FOLDER_OWNER,
      onClick: (): void => {
        // TODO: ...
      },
    },
  ];

  return (
    <>
      <StyledMenuComponent options={menuItemOptions} buttonIcon={<MoreVertIcon />} />
    </>
  );
};

export default ManageFolderSettingCell;
