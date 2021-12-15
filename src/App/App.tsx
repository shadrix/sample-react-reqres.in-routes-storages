import React from 'react'
import { IoCProvider } from '../ioc/ioc.react'
import { container } from '../ioc/ioc';
import UsersPage from '../pages/users';
import UserPage from '../pages/user';
import HomePage from '../pages/home';
import '../locales/config';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <React.StrictMode>
      <IoCProvider container={container}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="users/*" element={<UsersPage />} />
              <Route path="user/*" element={<UserPage />} />
            </Routes>
           </BrowserRouter>
      </IoCProvider>
    </React.StrictMode>
  )
}

export default App
