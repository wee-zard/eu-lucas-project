import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TmpScreen from '../screens/TmpScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import LoginScreen from '../screens/LoginScreen';
import FilterScreen from '../screens/FilterScreen';
import { ScreenUrls } from '../model/enum';
import DefaultScreen from '../screens/DefaultScreen';
import NavigationProvider from './NavigationProvider';
import useGoogleAccountGuard from '../guards/useGoogleAccountGuard';
import RouterModel from '../model/RouterModel';

const AppRouterProvider = () => {

  /**
   * INFO: Further information about how to use the React Routes:
   * https://reactrouter.com/en/main/start/overview 
   * https://www.w3schools.com/react/react_router.asp 
   */

  const routers: RouterModel[] = [
    { path: ScreenUrls.DefaultScreenPath, guards: [], component: <DefaultScreen /> },
    { path: ScreenUrls.LoginScreenPath, guards: [], component: <LoginScreen /> },
    { path: ScreenUrls.LucasScreenPath, guards: [useGoogleAccountGuard], component: <TmpScreen /> },
    { path: ScreenUrls.FilterScreenPath, guards: [useGoogleAccountGuard], component: <FilterScreen />},
    { path: ScreenUrls.NotFoundScreenPath, guards: [], component: <NotFoundScreen /> },
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
              />
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouterProvider;
