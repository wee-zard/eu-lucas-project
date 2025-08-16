import FolderCreationDialog from "@dialogs/folderCreationDialog/FolderCreationDialog";
import ManageFoldersActions from "./ManageFoldersActions";
import ManageFoldersDataGridTable from "./ManageFoldersDataGridTable";
import ManageFoldersBackgroundProcess from "./ManageFoldersBackgroundProcess";

const ManageFoldersScreen = () => {
  return (
    <div className="grid-gap">
      <ManageFoldersActions />
      <ManageFoldersDataGridTable />
      <ManageFoldersBackgroundProcess />
      <FolderCreationDialog isEmptyFolderCreated />
    </div>
  );
};

export default ManageFoldersScreen;
