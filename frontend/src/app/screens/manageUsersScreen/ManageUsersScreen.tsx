import ManageUsersActions from "./ManageUsersActions";
import ManageUsersDataGridTable from "./ManageUsersDataGridTable";

const ManageUsersScreen = () => {
  return (
    <div className="grid-gap">
      <ManageUsersActions />
      <ManageUsersDataGridTable />
    </div>
  );
};

export default ManageUsersScreen;
