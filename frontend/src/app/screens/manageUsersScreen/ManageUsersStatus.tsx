import { UserStatusEnum } from "@model/enum/UserStatusEnum";
import { GenericHandlerType } from "@model/types/GenericHandlerType";
import { ManageUserRowTypes } from "@model/types/ManageUserRowType";
import { styled } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

type Props = {
  row: ManageUserRowTypes;
};

const ManageUsersStatus = ({ row }: Props) => {
  const handler: GenericHandlerType<UserStatusEnum, string> = {
    [UserStatusEnum.PENDING]: "warning",
    [UserStatusEnum.BLOCKED]: "error",
    [UserStatusEnum.ACTIVATED]: "success",
    [UserStatusEnum.DELETED]: "error",
  };

  return (
    <div className="flex-align-to-center" style={{ height: "100%" }}>
      <Stack direction="row" spacing={1}>
        <StyledChip label={row.statusName} color={(handler[row.statusId] as any) ?? "info"} />
      </Stack>
    </div>
  );
};

export default ManageUsersStatus;

const StyledChip = styled(Chip)({
  boxShadow: "1px 2px 4px isDarkMode",
});
