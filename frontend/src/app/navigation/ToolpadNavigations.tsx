import { Navigation } from "@toolpad/core/AppProvider";
//import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterListIcon from "@mui/icons-material/FilterList";
import SettingsIcon from "@mui/icons-material/Settings";
//import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
//import FunctionsIcon from "@mui/icons-material/Functions";
//import TableRowsIcon from "@mui/icons-material/TableRows";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import PermMedia from "@mui/icons-material/PermMedia";
import TableViewIcon from "@mui/icons-material/TableView";

export enum NavigationSegments {
  UploadProcedureResults = "UploadProcedureResults",
  UploadLogManagement = "UploadLogManagement",
  ReportError = "ReportErrors",
  Settings = "Settings",
  Manual = "Manual",
  Filtering = "Filtering",
  ImageFolders = "ImageFolders",
  Dashboard = "Dashboard",
  UserManagement = "UserManagement",
}

export enum NavigationTitles {
  // ===== New Menu options ===== //
  UserManagement = "Felhasználók kezelése",
  Images = "Képek",
  Filtering = "Képek szűrése",
  ImageFolders = "Lementett képek mappái",

  Procedures = "Eljárások",
  UploadProcedureResults = "Eljárás log feltöltése",
  UploadLogManagement = "Eljárás logok kezelése",

  Others = "Egyéb",
  ReportError = "Hibabejelentés",
  Settings = "Renderbeállítások",
  Manual = "Manual",

  // ===== Old Menu options ===== //
  Dashboard = "Dashboard",
  MainItems = "Fő elemek",
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
  /*
  {
    segment: NavigationSegments.Dashboard,
    title: NavigationTitles.Dashboard,
    icon: <DashboardIcon />,
  },
  */
  {
    segment: NavigationSegments.UserManagement,
    title: NavigationTitles.UserManagement,
    icon: <SwitchAccountIcon />,
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
  {
    segment: NavigationSegments.ImageFolders,
    title: NavigationTitles.ImageFolders,
    icon: <PermMedia />,
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
    segment: NavigationSegments.UploadProcedureResults,
    title: NavigationTitles.UploadProcedureResults,
    icon: <UploadFileIcon />,
  },
  {
    segment: NavigationSegments.UploadLogManagement,
    title: NavigationTitles.UploadLogManagement,
    icon: <TableViewIcon />,
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
    // Page where the users could set important properties of the application.
    segment: NavigationSegments.Settings,
    title: NavigationTitles.Settings,
    icon: <SettingsIcon />,
  },
  /*
  {
    // Page where the users could read articles about how to use the application.
    segment: NavigationSegments.Manual,
    title: NavigationTitles.Manual,
    icon: <LibraryBooksIcon />,
  },
  */
];
