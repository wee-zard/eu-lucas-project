import ImageDto from "@model/dto/ImageDto";
import { StyledCardTemplate } from "@screens/filteringScreen/FilteringCommonStyledComponents";
import SelectedImagesModel from "@model/SelectedImagesModel";
import StyledImageMediaCard from "@cards/imageCard/StyledImageMediaCard";
import ImageCardContent from "./ImageCardContent";
import i18n from "@i18n/i18nHandler";

type Props = {
  imageDto: ImageDto;
  imageModel: SelectedImagesModel;
};

/**
 * TODO: Maybe this React Component should be memorized.
 * If new image card is selected, then the previous cards should not be loaded.
 * (for example, if we have 20 image cards, and we add a new one to them, then
 * 21 images will be downloaded from the gisco server, that is unnecessary.)
 */
const ImageCardRoot = ({ imageDto, imageModel }: Props) => {
  return (
    <StyledCardTemplate>
      <StyledImageMediaCard
        imageDto={imageDto}
        alt={i18n.t("cards.image-card.alt.image-media", { id: imageDto.id })}
      />
      <ImageCardContent imageDto={imageDto} imageModel={imageModel} />
    </StyledCardTemplate>
  );
};

export default ImageCardRoot;
