import ImageCanvas from "@cards/imageCanvas/ImageCanvas";
import ImageDto from "@model/dto/ImageDto";
import { selectSelectedImagesModel } from "@redux/selectors/imageSelector";
import { useSelector } from "react-redux";

type Props = {
  imageDto: ImageDto;
};

const StyledImageMediaCard = ({ imageDto }: Props) => {
  const selectedImagesModel = useSelector(selectSelectedImagesModel);

  // TODO: Now the application will fetch the bounding boxes from the host's machine, and not from the server.
  const boundingBoxesOfImage =
    selectedImagesModel.queryImages.find((queryImage) => queryImage.image.id === imageDto.id)
      ?.boundingBoxes ?? [];

  return (
    <ImageCanvas
      imageProperty={{
        image: imageDto,
        boundingBoxes: boundingBoxesOfImage,
      }}
    />
  );
};

export default StyledImageMediaCard;
