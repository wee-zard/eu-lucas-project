import ImageDto from "@model/dto/ImageDto";
import { SelectedImageActionTooltipTitles } from "@model/enum";

export type SelectedImageAction = {
  icon: any;
  tooltipTitle: SelectedImageActionTooltipTitles;
  onClick: (imageDto: ImageDto) => void;
};
