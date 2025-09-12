import ImageAndPaginationCardContent from "./ImageAndPaginationCardContent";
import { SelectedImageAction } from "@model/types/SelectedImageActionType";
import ImageCanvas from "@cards/imageCanvas/ImageCanvas";
import { QueriedImagePropertyType } from "@model/SelectedImagesModel";

type Props = {
  imageProperties: QueriedImagePropertyType;
  imageActions: SelectedImageAction[];
  isMenuDisabled?: boolean;
};

const ImageCardInnerElements = ({ imageProperties, imageActions, isMenuDisabled }: Props) => {
  return (
    <>
      <ImageCanvas imageProperty={imageProperties} />
      <ImageAndPaginationCardContent
        imageDto={imageProperties.image}
        imageActions={imageActions}
        isMenuDisabled={isMenuDisabled}
      />
    </>
  );
};

export default ImageCardInnerElements;
