import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { AccountPreview, AccountPreviewProps } from "@toolpad/core";

const LucasSidebarAccountPreview = (props: AccountPreviewProps & { mini: boolean }) => {
  const { handleClick, open, mini } = props;

  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
};

export default LucasSidebarAccountPreview;
