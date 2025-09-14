import styled from "@emotion/styled";
import { StyledScrollBarHolder } from "@global/globalStyles";
import { selectSelectedListOfProcedureLogs } from "@redux/selectors/procedureLogSelector";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "@redux/selectors/imageSelector";
import ImageCanvas from "@cards/imageCanvas/ImageCanvas";
import StyledAlert from "@components/StyledAlert";
import i18n from "@i18n/i18nHandler";

type Props = {
  uniqueId: string;
};

export const BoundingBoxDialogImage = ({ uniqueId }: Props) => {
  const selectedProcedureLogs = useSelector(selectSelectedListOfProcedureLogs);
  const selectedImage = useSelector(selectSelectedImage);

  return (
    selectedImage && (
      <StyledBoundingBoxDialogImageHolder>
        <StyledAlertWrapper $hidden={selectedProcedureLogs.length === 0}>
          <StyledAlert
            variant="filled"
            severity="info"
            alertTitle={i18n.t("components.alert.title.info")}
            message={i18n.t("screens.bounding-box.canvasTooltipInfoAlert")}
          />
        </StyledAlertWrapper>
        <ImageCanvas
          imageProperty={{
            image: selectedImage,
            logs: selectedProcedureLogs,
          }}
          randomUniqueId={uniqueId}
        />
      </StyledBoundingBoxDialogImageHolder>
    )
  );
};

const StyledAlertWrapper = styled("div")<{ $hidden: boolean }>((props) => ({
  visibility: props.$hidden ? "hidden" : "inherit",
}));

const StyledBoundingBoxDialogImageHolder = styled(StyledScrollBarHolder)({
  width: "60%",
  height: "100%",
  padding: 8,
  alignContent: "center",
  display: "grid",
  gap: 16,
});
