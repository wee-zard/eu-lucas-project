import { FilterDialogFilterOptions } from "@model/enum";
import ListItemModel from "@model/ListItemModel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import ExploreIcon from "@mui/icons-material/Explore";
import DataObjectIcon from "@mui/icons-material/DataObject";
import PlaceIcon from "@mui/icons-material/Place";
import GrassIcon from "@mui/icons-material/Grass";
import TerminalIcon from "@mui/icons-material/Terminal";

export const useFilteringListItems = () => {
  const listItemOptions: ListItemModel[] = [
    { name: FilterDialogFilterOptions.Year, icon: <AccessTimeIcon /> },
    { name: FilterDialogFilterOptions.Country, icon: <LanguageIcon /> },
    { name: FilterDialogFilterOptions.XCoordinates, icon: <PlaceIcon /> },
    { name: FilterDialogFilterOptions.YCoordinates, icon: <PlaceIcon /> },
    { name: FilterDialogFilterOptions.Direction, icon: <ExploreIcon /> },
    { name: FilterDialogFilterOptions.ExifData, icon: <DataObjectIcon /> },
    { name: FilterDialogFilterOptions.Plant, icon: <GrassIcon /> },
    { name: FilterDialogFilterOptions.Algorith, icon: <TerminalIcon /> },
  ];

  return listItemOptions;
};
