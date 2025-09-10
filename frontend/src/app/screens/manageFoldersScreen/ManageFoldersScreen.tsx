import FolderCreationDialog from "@screens/manageFoldersScreen/dialog/folderCreation/FolderCreationDialog";
import ManageFoldersActions from "./ManageFoldersActions";
import ManageFoldersDataGridTable from "./ManageFoldersDataGridTable";
import ManageFoldersBackgroundProcess from "./ManageFoldersBackgroundProcess";

const ManageFoldersScreen = () => {
  return (
    <div className="grid-gap">
      <ManageFoldersActions />
      <ManageFoldersDataGridTable />
      <ManageFoldersBackgroundProcess />
      <FolderCreationDialog />
    </div>
  );
};

export default ManageFoldersScreen;
