import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export const StyledCardTemplate = styled(Card)<{}>((_) => ({
  "&.MuiPaper-root": {
    padding: "8px",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(73, 174, 181, 0.27)",
    background: "#00000020",
    ":hover": {
      outline: "8px solid black",
    },

    // Media query
    height: "auto",
    width: "31%",
    "@media (max-width: 1300px)": {
      width: "48%",
    },
    "@media (max-width: 780px)": {
      width: "100%",
    },
  },
}));

export const StyledTypography = styled(Typography)<{}>((_) => ({
  textShadow: "1px 1px 1px black",
}));
