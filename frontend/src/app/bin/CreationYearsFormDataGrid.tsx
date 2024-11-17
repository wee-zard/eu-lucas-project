import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { columns, rows } from "../global/globalGridColDefs";
import { StyledTextHolder } from "../dialogs/filteringDialog/selectionColumn/FilterSelectionColumn";

const CreationYearsFormDataGrid = () => {
  // TODO: Implemnet a data grid! https://mui.com/x/react-data-grid/

  return (
    <div>
      <StyledTextHolder>Aktív szűrési évek</StyledTextHolder>

      <Box sx={{ height: 285, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 3,
              },
            },
          }}
          pageSizeOptions={[5]}
          //density={"compact"}
          disableRowSelectionOnClick
          disableAutosize
          disableColumnResize
          disableColumnFilter
          disableColumnMenu
          disableColumnSorting
        />
      </Box>
    </div>
  );
};

export default CreationYearsFormDataGrid;
