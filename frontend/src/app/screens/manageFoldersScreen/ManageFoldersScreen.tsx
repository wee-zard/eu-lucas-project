import FolderCreationDialog from "@dialogs/folderCreationDialog/FolderCreationDialog";
import ManageFoldersActions from "./ManageFoldersActions";
import ManageFoldersDataGridTable from "./ManageFoldersDataGridTable";

const ManageFoldersScreen = () => {
  return (
    <div className="grid-gap">
      <ManageFoldersActions />
      <ManageFoldersDataGridTable />
      <FolderCreationDialog isEmptyFolderCreated />
    </div>
  );
};

export default ManageFoldersScreen;
