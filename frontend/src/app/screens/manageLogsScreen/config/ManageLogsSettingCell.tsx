import StyledMenuComponent from "@components/StyledMenuComponent";
import { MenuItemType } from "@model/types/MenuItemType";
import { useDispatch } from "react-redux";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProcedureLogDto from "@model/dto/ProcedureLogDto";
import { LogSettingCellEnum } from "@model/enum/LogSettingCellEnum";
import { setProcedureLogSettingCell } from "@redux/actions/procedureLogActions";

type Props = {
  row: ProcedureLogDto;
};

const ManageLogsSettingCell = ({ row }: Props) => {
  const dispatch = useDispatch();

  const menuItemOptions: MenuItemType[] = [
    {
      icon: <DeleteForeverOutlinedIcon />,
      color: "red",
      menuTitle: LogSettingCellEnum.DELETE,
      isDisplayed: true,
      onClick: (): void => {
        dispatch(setProcedureLogSettingCell({ option: LogSettingCellEnum.DELETE, data: row }));
      },
    },
  ];

  return <StyledMenuComponent options={menuItemOptions} buttonIcon={<MoreVertIcon />} />;
};

export default ManageLogsSettingCell;
