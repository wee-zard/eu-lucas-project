import StyledIconButton from "@components/StyledIconButton";
import { ManageUserRowTypes } from "@model/types/ManageUserRowType";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Props = {
  row: ManageUserRowTypes;
};

const ManageUsersSettings = ({ row }: Props) => {
  return (
    <div id={`vertical-settings-${row.id}`} className="flex-container">
      <StyledIconButton buttonIcon={<MoreVertIcon />} onClick={() => null} />
    </div>
  );
};

export default ManageUsersSettings;
