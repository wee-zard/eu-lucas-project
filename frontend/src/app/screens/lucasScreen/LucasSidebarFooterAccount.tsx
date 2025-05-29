import { useMemo } from "react";
import LucasCreatePreviewComponent from "./LucasCreatePreviewComponent";
import { SidebarFooterProps } from "@toolpad/core/DashboardLayout";
import { Account } from "@toolpad/core/Account";
import LucasSidebarFooterAccountPopover from "./LucasSidebarFooterAccountPopover";

const LucasSidebarFooterAccount = ({ mini }: SidebarFooterProps) => {
  const PreviewComponent = useMemo(() => LucasCreatePreviewComponent(mini), [mini]);

  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: LucasSidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: "left", vertical: "bottom" },
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.32)"})`,
                mt: 1,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default LucasSidebarFooterAccount;
