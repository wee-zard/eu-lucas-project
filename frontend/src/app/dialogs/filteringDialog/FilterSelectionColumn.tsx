import React from "react";
import styled from "@emotion/styled";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import ExploreIcon from '@mui/icons-material/Explore';
import DataObjectIcon from '@mui/icons-material/DataObject';
import PlaceIcon from '@mui/icons-material/Place';

const FilterSelectionColumn = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  type ListItemOption = {
    name: string;
    icon: JSX.Element;
  };

  const listItemOptions: ListItemOption[] = [
    { name: "Év", icon: <AccessTimeIcon /> },
    { name: "Ország", icon: <LanguageIcon /> },
    { name: "Koordináta", icon: <PlaceIcon /> },
    { name: "Készítés iránya", icon: <ExploreIcon /> },
    { name: "Exif adat", icon: <DataObjectIcon /> },
  ];

  return (
    <StyledDialogColumnHolder>
      <StyledTextHolder>
        Filter Opciók
      </StyledTextHolder>
      <StyledList>
        {listItemOptions.map((item, index) => (
          <StyledListItemButton
            sx={{ height: "60px"}}
            selected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name}/>
          </StyledListItemButton>
        ))}
      </StyledList>
    </StyledDialogColumnHolder>
  );
};

export default FilterSelectionColumn;

const StyledListItemButton = styled(ListItemButton)<{}>((props) => ({
  borderRadius: "8px",
}));

const StyledList = styled(List)<{}>((props) => ({
  display: "grid", 
  gap: "8px",
}));

const StyledTextHolder = styled.div<{}>((props) => ({
  fontWeight: "bold", 
  fontSize: "18px",
  display: "flex",
  justifyContent: "center",
  paddingTop: "16px",
}));

const StyledDialogColumnHolder = styled.div<{}>((props) => ({
  width: "50%",
  height: "100%",
  gap: "16px",
  display: "flex",
  flexDirection: "column",
}));
