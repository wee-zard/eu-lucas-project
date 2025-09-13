import { Box, LinearProgress, styled } from "@mui/material";

const StyledLinearProgress = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <StyledLinearProgressComponent variant="indeterminate" />
    </Box>
  );
};

export default StyledLinearProgress;

const StyledLinearProgressComponent = styled(LinearProgress)({
  borderRadius: 12,
});
