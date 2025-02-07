import { styled } from "@mui/material/styles";
import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from "@mui/material";

type Props = {
  file: File;
};

const UploadFileCard = ({ file }: Props) => {
  const fileProgress = 50;

  return (
    <StyledRightFileHolder>
      <div>{file.name}</div>
      <div>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <BorderLinearProgress variant="determinate" value={fileProgress} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            >{`${Math.round(fileProgress)}%`}</Typography>
          </Box>
        </Box>
      </div>
    </StyledRightFileHolder>
  );
};

export default UploadFileCard;

const StyledRightFileHolder = styled("div")<{}>((_) => ({
  display: "grid",
  alignItems: "center",
  width: "100%",
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: "100%",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));
