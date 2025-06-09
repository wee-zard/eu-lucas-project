import { Navigation } from "@toolpad/core/AppProvider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterListIcon from "@mui/icons-material/FilterList";
import SettingsIcon from "@mui/icons-material/Settings";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FunctionsIcon from "@mui/icons-material/Functions";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export enum NavigationSegments {
  ManageProcedures = "ManageProcedures",
  UploadProcedureResults = "UploadProcedureResults",
  ReportError = "ReportErrors",
  Settings = "Settings",
  Manual = "Manual",
  Filtering = "Filtering",
  Dashboard = "Dashboard",
  UserManagement = "UserManagement",
}

export enum NavigationTitles {
  // ===== New Menu options ===== //
  UserManagement = "Manage Users",
  Images = "Images",
  Filtering = "Filtering",

  Procedures = "Procedures",
  ManageProcedures = "Manage Procedures",
  UploadProcedureResults = "Upload Procedure Results",

  Others = "Others",
  ReportError = "Report Errors",
  Settings = "Settings",
  Manual = "Manual",

  // ===== Old Menu options ===== //
  Dashboard = "Dashboard",
  MainItems = "Main items",
}

export enum NavigationKind {
  Header = "header",
  Divider = "divider",
  Page = "page",
}

export const navigation: Navigation = [
  // ==================================
  {
    kind: NavigationKind.Header,
    title: NavigationTitles.MainItems,
  },
  {
    segment: NavigationSegments.Dashboard,
    title: NavigationTitles.Dashboard,
    icon: <DashboardIcon />,
  },
  {
    segment: NavigationSegments.UserManagement,
    title: NavigationTitles.UserManagement,
    icon: <AccountBoxIcon />,
  },
  // ==================================
  {
    kind: NavigationKind.Divider,
  },
  {
    kind: NavigationKind.Header,
    title: NavigationTitles.Images,
  },
  {
    segment: NavigationSegments.Filtering,
    title: NavigationTitles.Filtering,
    icon: <FilterListIcon />,
  },
  // ==================================
  {
    kind: NavigationKind.Divider,
  },
  {
    kind: NavigationKind.Header,
    title: NavigationTitles.Procedures,
  },
  {
    segment: NavigationTitles.Procedures,
    title: NavigationTitles.Procedures,
    icon: <TableRowsIcon />,
    children: [
      {
        // Page where the users could manage the procedures such as adding, modifying, and removing them.
        segment: NavigationSegments.ManageProcedures,
        title: NavigationTitles.ManageProcedures,
        icon: <FunctionsIcon />,
      },
      {
        // Page where the users could upload past procedure results to the server.
        segment: NavigationSegments.UploadProcedureResults,
        title: NavigationTitles.UploadProcedureResults,
        icon: <UploadFileIcon />,
      },
    ],
  },
  // ==================================
  {
    kind: NavigationKind.Divider,
  },
  {
    kind: NavigationKind.Header,
    title: NavigationTitles.Others,
  },
  {
    // Page where the users report issues and bugs found in the application.
    segment: NavigationSegments.ReportError,
    title: NavigationTitles.ReportError,
    icon: <ReportProblemIcon />,
  },
  {
    // Page where the users could read articles about how to use the application.
    segment: NavigationSegments.Manual,
    title: NavigationTitles.Manual,
    icon: <LibraryBooksIcon />,
  },
  {
    // Page where the users could set important properties of the application.
    segment: NavigationSegments.Settings,
    title: NavigationTitles.Settings,
    icon: <SettingsIcon />,
  },
];
