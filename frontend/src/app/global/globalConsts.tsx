import ListItemModel from "../model/ListItemModel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import ExploreIcon from "@mui/icons-material/Explore";
import DataObjectIcon from "@mui/icons-material/DataObject";
import PlaceIcon from "@mui/icons-material/Place";
import { FilterDialogFilterOptions } from "../model/enum";

export const listItemOptions: ListItemModel[] = [
  { name: FilterDialogFilterOptions.Year, icon: <AccessTimeIcon /> },
  { name: FilterDialogFilterOptions.Country, icon: <LanguageIcon /> },
  { name: FilterDialogFilterOptions.Coordinates, icon: <PlaceIcon /> },
  { name: FilterDialogFilterOptions.Direction, icon: <ExploreIcon /> },
  { name: FilterDialogFilterOptions.ExifData, icon: <DataObjectIcon /> },
];
