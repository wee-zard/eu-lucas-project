import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TmpScreen from '../screens/TmpScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import LoginScreen from '../screens/LoginScreen';

const AppRouterProvider = () => {

  /**
   * INFO: Further information about how to use the React Routes:
   * https://reactrouter.com/en/main/start/overview 
   * https://www.w3schools.com/react/react_router.asp 
   */

  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" index element={<LoginScreen/>} />
        <Route path="lucas" element={<TmpScreen/>} />
        <Route path="lucas/filter" element={<div>Filtering page</div>} />
        <Route path="*" element={<NotFoundScreen/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouterProvider;
