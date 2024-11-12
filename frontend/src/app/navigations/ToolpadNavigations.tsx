import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { Navigation } from "@toolpad/core/AppProvider";
import FilterListIcon from '@mui/icons-material/FilterList';
import SettingsIcon from '@mui/icons-material/Settings';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export enum NavigationTitles {
  // ===== New Menu options ===== //
  Default = "",
  Images = "Images",
  Filtering = "Filtering",

  Others = "Others",
  Settings = "Settings",
  Manual = "Manual",

  Management = "Management",
  UserManagement = "User Management",
  

  // ===== Old Menu options ===== //
  MainItems = "Main items",
  Dashboard = "Dashboard",
  Orders = "Orders",
  Analytics = "Analytics",
  Reports = "Reports",
  Sales = "Sales",
  Traffic = "Traffic",
  Integrations = "Integrations",
}

export enum ToolpadNavigationKind {
  Header = "header",
  Divider = "divider",
  Page = "page",
}

export const toolpadNavigations: Navigation = [
  // ==================================
  {
    kind: ToolpadNavigationKind.Header,
    title: NavigationTitles.MainItems,
  },
  {
    segment: NavigationTitles.Dashboard,
    title: NavigationTitles.Dashboard,
    icon: <DashboardIcon />,
  },
  {
    segment: NavigationTitles.Management,
    title: NavigationTitles.Management,
    icon: <ShoppingCartIcon />,
    children: [
      {
        segment: NavigationTitles.UserManagement,
        title: NavigationTitles.UserManagement,
        icon: <DescriptionIcon />,
      },
    ]
  },
  {
    kind: ToolpadNavigationKind.Divider,
  },
  // ==================================
  {
    kind: ToolpadNavigationKind.Header,
    title: NavigationTitles.Analytics,
  },
  {
    segment: NavigationTitles.Reports,
    title: NavigationTitles.Reports,
    icon: <BarChartIcon />,
    children: [
      {
        segment: NavigationTitles.Sales,
        title: NavigationTitles.Sales,
        icon: <DescriptionIcon />,
      },
      {
        segment: NavigationTitles.Traffic,
        title: NavigationTitles.Traffic,
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: NavigationTitles.Integrations,
    title: NavigationTitles.Integrations,
    icon: <LayersIcon />,
  },
  // ==================================
  {
    kind: ToolpadNavigationKind.Divider,
  },
  {
    kind: ToolpadNavigationKind.Header,
    title: NavigationTitles.Images,
  },
  {
    segment: NavigationTitles.Filtering,
    title: NavigationTitles.Filtering,
    icon: <FilterListIcon />,
    //children: [],
  },
  // ==================================
  {
    kind: ToolpadNavigationKind.Divider,
  },
  {
    kind: ToolpadNavigationKind.Header,
    title: NavigationTitles.Others,
  },
  {
    segment: NavigationTitles.Manual,
    title: NavigationTitles.Manual,
    icon: <LibraryBooksIcon />,
    //children: [],
  },
  {
    segment: NavigationTitles.Settings,
    title: NavigationTitles.Settings,
    icon: <SettingsIcon />,
  },
];
