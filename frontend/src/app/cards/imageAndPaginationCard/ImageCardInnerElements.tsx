import StyledImageMediaCard from "./StyledImageMediaCard";
import ImageAndPaginationCardContent from "./ImageAndPaginationCardContent";
import { SelectedImageAction } from "@model/types/SelectedImageActionType";
import ImageDto from "@model/dto/ImageDto";

type Props = {
  imageDto: ImageDto;
  imageActions: SelectedImageAction[];
  isMenuDisabled?: boolean;
};

const ImageCardInnerElements = ({ imageDto, imageActions, isMenuDisabled }: Props) => {
  return (
    <>
      <StyledImageMediaCard imageDto={imageDto} />
      <ImageAndPaginationCardContent
        imageDto={imageDto}
        imageActions={imageActions}
        isMenuDisabled={isMenuDisabled}
      />
    </>
  );
};

export default ImageCardInnerElements;
