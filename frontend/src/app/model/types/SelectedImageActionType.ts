import ImageDto from "@model/dto/ImageDto";

export type SelectedImageAction = {
  icon: any;
  tooltipTitle: string;
  onClick: (imageDto: ImageDto) => void;
};
