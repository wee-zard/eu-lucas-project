import React from "react";
import { Router } from "@toolpad/core/AppProvider";

export const useToolpadRouterHook = (initialPath: string): Router => {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
};
