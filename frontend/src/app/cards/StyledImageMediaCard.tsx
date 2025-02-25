import ImageDto from "@model/dto/ImageDto";
import CardMedia from "@mui/material/CardMedia";
import { useEffect } from "react";

type Props = {
  imageDto: ImageDto;
  alt: string;
};

export type ImageProperties = {
  width: number;
  height: number;
  src: string;
};

const StyledImageMediaCard = ({ imageDto, alt }: Props) => {
  const componentClassName = `image-media-card-${imageDto.id}`;

  useEffect(() => {
    const img = document.getElementById(componentClassName);

    if (!img) {
      return;
    }

    img.onload = function () {
      // TODO: Here, fetch the actual height and width of the image

      // The original width and height of the image
      console.log("Intrinsic Width:", (img as any).naturalWidth);
      console.log("Intrinsic Height:", (img as any).naturalHeight);
      console.log("height, width:", img.clientWidth, img.clientHeight);

      // TODO: Here get the ratio of the actual width / original width, and actual height / original height.
      // Use these information on the Points.
    };
  }, [componentClassName]);

  return (
    <CardMedia
      id={componentClassName}
      component="img"
      image={getImageFromRemoteServer(imageDto)}
      alt={`${alt}${imageDto.id}`}
      sx={{ borderRadius: "8px" }}
    />
  );
};

export default StyledImageMediaCard;

export const getImageFromRemoteServer = (obj: ImageDto) => {
  const remoteUrl = "https://gisco-services.ec.europa.eu/lucas/photos";
  const x =
    obj.coordinateX < 10
      ? `00${obj.coordinateX}`
      : obj.coordinateX < 100
        ? `0${obj.coordinateX}`
        : obj.coordinateX;

  const y =
    obj.coordinateY < 10
      ? `00${obj.coordinateY}`
      : obj.coordinateY < 100
        ? `0${obj.coordinateY}`
        : obj.coordinateY;

  return `${remoteUrl}/${obj.year}/${obj.country}/${x}/${y}/${obj.imageName}`;
};
