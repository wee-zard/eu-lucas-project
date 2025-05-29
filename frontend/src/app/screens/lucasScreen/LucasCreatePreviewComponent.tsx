import { AccountPreviewProps } from "@toolpad/core/Account";
import LucasSidebarAccountPreview from "./LucasSidebarAccountPreview";

const LucasCreatePreviewComponent = (mini: boolean) => {
  const PreviewComponent = (props: AccountPreviewProps) => {
    return <LucasSidebarAccountPreview {...props} mini={mini} />;
  };
  return PreviewComponent;
};

export default LucasCreatePreviewComponent;
