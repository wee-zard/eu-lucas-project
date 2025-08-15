import ImageUtils from "@helper/imageUtils";
import ImageDto from "@model/dto/ImageDto";
import CardMedia from "@mui/material/CardMedia";

type Props = {
  imageDto: ImageDto;
  alt: string;
};

// TODO: This component could be a react memo component
const StyledImageMediaCard = ({ imageDto, alt }: Props) => {
  return (
    <CardMedia
      component="img"
      image={ImageUtils.initRemoteImageUrlPath(imageDto)}
      alt={`${alt}${imageDto.id}`}
      sx={{ borderRadius: "8px" }}
    />
  );
};

export default StyledImageMediaCard;
