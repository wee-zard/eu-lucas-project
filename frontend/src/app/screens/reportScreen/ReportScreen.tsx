import ReportScreenDataGridTable from "./ReportScreenDataGridTable";
import ReportScreenForm from "./ReportScreenForm";

const ReportScreen = () => {
  return (
    <div className="grid-gap24">
      <ReportScreenForm />
      <ReportScreenDataGridTable />
    </div>
  );
};

export default ReportScreen;
