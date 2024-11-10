import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TmpScreen from '../screens/TmpScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import LoginScreen from '../screens/LoginScreen';
import FilterScreen from '../screens/FilterScreen';
import { ScreenUrls } from '../model/enum';
import DefaultScreen from '../screens/DefaultScreen';
import NavigationProvider from './NavigationProvider';
import RouterModel from '../model/RouterModel';
import { guardGoogleAccount } from '../guards/useGoogleAccountGuard';

const AppRouterProvider = () => {

  /**
   * INFO: Further information about how to use the React Routes:
   * https://reactrouter.com/en/main/start/overview 
   * https://www.w3schools.com/react/react_router.asp 
   */

  const routers: RouterModel[] = [
    { 
      path: ScreenUrls.DefaultScreenPath, 
      guards: [!guardGoogleAccount()], 
      component: <DefaultScreen />,
      redirectionUrl: ScreenUrls.LucasScreenPath,
    },
    { 
      path: ScreenUrls.LoginScreenPath, 
      guards: [!guardGoogleAccount()], 
      component: <LoginScreen />,
      redirectionUrl: ScreenUrls.LucasScreenPath,
    },
    { 
      path: ScreenUrls.LucasScreenPath,
      guards: [guardGoogleAccount()],
      component: <TmpScreen />,
      redirectionUrl: ScreenUrls.LoginScreenPath
    },
    { 
      path: ScreenUrls.FilterScreenPath,
      guards: [guardGoogleAccount()],
      component: <FilterScreen />,
      redirectionUrl: ScreenUrls.LoginScreenPath
    },
    { 
      path: ScreenUrls.NotFoundScreenPath,
      guards: [],
      component: <NotFoundScreen />,
    },
  ];
  
  return (
    <BrowserRouter>
      <Routes>
        { routers.map((routerModel, index) => (
          <Route 
            key={index}
            index={index === 0}
            path={routerModel.path}
            element={
              <NavigationProvider 
                guards={routerModel.guards} 
                component={routerModel.component}
                redirectionUrl={routerModel.redirectionUrl}
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouterProvider;
