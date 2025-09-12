import FolderCreationDialog from "@screens/manageFoldersScreen/dialog/folderCreation/FolderCreationDialog";
import ManageFoldersActions from "./ManageFoldersActions";
import ManageFoldersDataGridTable from "./ManageFoldersDataGridTable";
import ManageFoldersBackgroundProcess from "./ManageFoldersBackgroundProcess";
import FolderSelectionDialog from "./dialog/selectedFolder/FolderSelectionDialog";
import BoundingBoxDialog from "@dialogs/boundBoxDialog/BoundingBoxDialog";

const ManageFoldersScreen = () => {
  return (
    <div className="grid-gap">
      <ManageFoldersActions />
      <ManageFoldersDataGridTable />
      <ManageFoldersBackgroundProcess />
      <FolderCreationDialog />
      <FolderSelectionDialog />
      <BoundingBoxDialog />
    </div>
  );
};

export default ManageFoldersScreen;
