import React from "react";
import { Router } from "@toolpad/core/AppProvider";
import { NavigationSegments } from "@navigation/ToolpadNavigations";

export const useToolpadRouterHook = (initialPath: NavigationSegments): Router => {
  const [pathname, setPathname] = React.useState(`/${initialPath}`);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
};
