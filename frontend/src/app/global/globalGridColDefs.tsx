import { GridColDef } from "@mui/x-data-grid/models/colDef";

export type GridColumnRowDef = {
  id: string,
  key: string,
  operator: string,
  value: string,
};

export const columns: GridColDef<(GridColumnRowDef)>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    flex: 1
  },
  {
    field: "key",
    headerName: "Kulcs",
    width: 150,
    editable: false,
  },
  {
    field: "operator",
    headerName: "Operáció",
    width: 150,
    editable: false,
  },
  {
    field: "value",
    headerName: "Érték",
    //type: "number",
    width: 110,
    editable: false,
  },
  /*
  {
    field: "fullName",
    headerName: "Full name",
    //description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  */
];
