import ChipColorType from "@model/types/ChipColorType";
import { styled, Tooltip } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

type Props = {
  label: string;
  color?: ChipColorType;
  tooltip?: {
    title?: string;
  };
};

const StyledStackChip = ({ label, color, tooltip }: Props) => {
  return (
    <Tooltip title={tooltip?.title ?? undefined}>
      <StackWrapper className="flex-align-to-center">
        <Stack direction="row" spacing={1}>
          <StyledChip label={label} color={color ?? "info"} />
        </Stack>
      </StackWrapper>
    </Tooltip>
  );
};

export default StyledStackChip;

const StyledChip = styled(Chip)({
  boxShadow: "1px 2px 4px isDarkMode",
});

const StackWrapper = styled("div")({
  height: "100%",
});
