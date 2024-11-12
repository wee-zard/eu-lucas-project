import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationProvider from './NavigationProvider';
import { urlNavigations } from '../navigations/UrlNavigations';

const AppRouterProvider = () => {

  return (
    <BrowserRouter>
      <Routes>
        { urlNavigations.map((routerModel, index) => (
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
