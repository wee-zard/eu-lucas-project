import styled from "@emotion/styled";
import { StyledScrollBarHolder } from "@global/globalStyles";
import { selectSelectedListOfProcedureLogs } from "@redux/selectors/procedureLogSelector";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "@redux/selectors/imageSelector";
import ImageCanvas from "@cards/imageCanvas/ImageCanvas";
import i18n from "@i18n/i18nHandler";
import StyledIconAndTooltip from "@components/StyledIconAndTooltip";

type Props = {
  uniqueId: string;
};

export const BoundingBoxDialogImage = ({ uniqueId }: Props) => {
  const selectedProcedureLogs = useSelector(selectSelectedListOfProcedureLogs);
  const selectedImage = useSelector(selectSelectedImage);

  return (
    selectedImage && (
      <div>
        <StyledInfoIconWrapper>
          <StyledIconAndTooltip
            tooltip={{
              title: i18n.t("screens.bounding-box.canvasTooltipInfoAlert"),
              placement: "right",
            }}
          />
        </StyledInfoIconWrapper>
        <StyledBoundingBoxDialogImageHolder>
          <ImageCanvas
            imageProperty={{
              image: selectedImage,
              logs: selectedProcedureLogs,
            }}
            randomUniqueId={uniqueId}
          />
        </StyledBoundingBoxDialogImageHolder>
      </div>
    )
  );
};

const StyledInfoIconWrapper = styled("div")({
  display: "flex",
  height: "fit-content",
});

const StyledBoundingBoxDialogImageHolder = styled(StyledScrollBarHolder)({
  width: "100%",
  height: "100%",
  padding: 8,
  alignContent: "center",
});
