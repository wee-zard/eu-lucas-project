import ChipColorType from "@model/types/ChipColorType";
import { styled } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

type Props = {
  label: string;
  color?: ChipColorType;
};

const StyledStackChip = ({ label, color }: Props) => {
  return (
    <StackWrapper className="flex-align-to-center">
      <Stack direction="row" spacing={1}>
        <StyledChip label={label} color={color ?? "info"} />
      </Stack>
    </StackWrapper>
  );
};

export default StyledStackChip;

const StyledChip = styled(Chip)({
  boxShadow: "1px 2px 4px isDarkMode",
});

const StackWrapper = styled("div")({
  height: "100%",
});
