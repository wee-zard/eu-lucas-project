import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { BoundingBoxDialogTimeline } from "./timeline/BoundingBoxDialogTimeline";
import styled from "@emotion/styled";
import i18n from "@i18n/i18nHandler";
import { StyledScrollBarHolder } from "@global/globalStyles";

const BoundingBoxDialogTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderTabPanel = () => {
    switch (value) {
      case 0:
        return <BoundingBoxDialogTimeline />;
      case 1:
        return <>TODO</>;
      case 2:
        return <>TODO</>;
      default:
        return <>TODO</>;
    }
  };

  return (
    <StyledComponentWidth>
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label={i18n.t(`screens.bounding-box.tabs.tab-1`)} />
          <Tab label={i18n.t(`screens.bounding-box.tabs.tab-2`)} />
          <Tab label={i18n.t(`screens.bounding-box.tabs.tab-3`)} />
        </Tabs>
      </div>
      <StyledTabPanelHolder>{renderTabPanel()}</StyledTabPanelHolder>
    </StyledComponentWidth>
  );
};

export default BoundingBoxDialogTabs;

const StyledComponentWidth = styled.div({
  width: "40%",
});

const StyledTabPanelHolder = styled(StyledScrollBarHolder)({
  height: "90%",
  marginRight: 4,
});
