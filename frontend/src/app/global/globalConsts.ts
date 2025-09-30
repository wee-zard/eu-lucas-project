import PageableProperties from "@model/PageableProperties";
import PageableResponse from "@model/response/PageableResponse";
import { ColorPairType } from "@model/types/ColorPairType";

export const emptyPlaceholder = "-";

export const getEmptyPageableResponse = (pageable: PageableProperties) => {
  return new PageableResponse([], 0, 0, pageable.pageSize, pageable.pageNo, true);
};

export const distinctColors: ColorPairType[] = [
  {
    name: "maroon",
    value: "#800000",
  },
  {
    name: "red",
    value: "#e6194B",
  },
  {
    name: "pink",
    value: "#fabed4",
  },
  {
    name: "brown",
    value: "#9A6324",
  },
  {
    name: "orange",
    value: "#f58231",
  },
  {
    name: "yellow",
    value: "#ffe119",
  },
  {
    name: "beige",
    value: "#fffac8",
  },
  {
    name: "green",
    value: "#3cb44b",
  },
  {
    name: "mint",
    value: "#aaffc3",
  },
  {
    name: "teal",
    value: "#469990",
  },
  {
    name: "cyan",
    value: "#42d4f4",
  },
  {
    name: "navy",
    value: "#000075",
  },
  {
    name: "blue",
    value: "#4363d8",
  },
  {
    name: "lavender",
    value: "#dcbeff",
  },
  {
    name: "magenta",
    value: "#f032e6",
  },
  {
    name: "blue",
    value: "#4363d8",
  },
];
