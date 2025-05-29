import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AccountPopoverFooter, SignOutButton } from "@toolpad/core/Account";

const LucasSidebarFooterAccountPopover = () => {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Account
      </Typography>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
};

export default LucasSidebarFooterAccountPopover;
