import React from "react";
import CreationYearsFormHeader from "./CreationYearsFormHeader";
import CreationYearsFormDataGrid from "./CreationYearsFormDataGrid";
import Divider from "@mui/material/Divider";

const FilteringCreationYearsForm = () => {

  return (
    <div>
      <CreationYearsFormHeader />
      <Divider />
      <CreationYearsFormDataGrid />
    </div>
  );
};

export default FilteringCreationYearsForm;
