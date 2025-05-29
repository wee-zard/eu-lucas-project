import Typography from "@mui/material/Typography/Typography";

// TODO: Not called
const LucasSidebarFooter = () => {
  const applicationVersion = process.env.REACT_APP_USE_APPLICATION_VERSION ?? "";

  return (
    <Typography variant="caption" sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}>
      {applicationVersion}
    </Typography>
  );
};

export default LucasSidebarFooter;
