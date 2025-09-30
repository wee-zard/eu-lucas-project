import ManageLogsBackgroundProcess from "./ManageLogsBackgroundProcess";
import ManageLogsDataGridTable from "./ManageLogsDataGridTable";

const ManageLogsScreen = () => {
  return (
    <div className="grid-gap">
      <ManageLogsDataGridTable />
      <ManageLogsBackgroundProcess />
    </div>
  );
};

export default ManageLogsScreen;
