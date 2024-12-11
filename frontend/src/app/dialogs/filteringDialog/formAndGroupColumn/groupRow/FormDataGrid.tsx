import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { columns, GridColumnRowDef } from "../../../../global/globalGridColDefs";
import { StyledTextHolder } from "../../selectionColumn/FilterSelectionColumn";
import { useSelector } from "react-redux";
import { selectFilterFormDataGrid } from "../../../../redux/selectors/imageSelector";

const FormDataGrid = () => {
  // TODO: Implemnet a data grid! https://mui.com/x/react-data-grid/

  const filterFormDataGrid = useSelector(selectFilterFormDataGrid);
  const dataGridRows: GridColumnRowDef[] = filterFormDataGrid.filterComponents.map((form) => ({
    id: form.inputFormId?.toString() ?? "",
    key: form.selectInput ?? "",
    operator: form.operatorInput ?? "",
    value: form.textFieldInput ?? ""
  }))


  return (
    <div>
      <StyledTextHolder>Aktív szűrési évek</StyledTextHolder>

      <Box sx={{ height: 285, width: "100%" }}>
        <DataGrid
          rows={dataGridRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 3,
              },
            },
          }}
          //pageSizeOptions={[5]}
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

export default FormDataGrid;
