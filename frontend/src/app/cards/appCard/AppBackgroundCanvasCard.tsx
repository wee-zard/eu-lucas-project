import { UNIQUE_ID_OF_BACKGROUND_CANVAS_CARD } from "@cards/imageCanvas/helper/imageCanvasHelper";
import ImageCanvas from "@cards/imageCanvas/ImageCanvas";
import { selectBackgroundCanvasImageProperties } from "@redux/selectors/backgroundSelector";
import { useSelector } from "react-redux";

const AppBackgroundCanvasCard = () => {
  const imageProperty = useSelector(selectBackgroundCanvasImageProperties);

  return (
    imageProperty && (
      <ImageCanvas
        imageProperty={imageProperty}
        randomUniqueId={UNIQUE_ID_OF_BACKGROUND_CANVAS_CARD}
        isHidden
        isSrcBase64Only
      />
    )
  );
};

export default AppBackgroundCanvasCard;
