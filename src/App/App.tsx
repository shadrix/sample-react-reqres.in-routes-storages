import React from 'react'
import { IoCProvider } from '../ioc/ioc.react'
import { container } from '../ioc/ioc';
import { ProfilePage, UserProfilePage, OwnUserProfilePage } from '../pages/profile';
import '../locales/config';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/home';
import UsersPage from '../pages/users';
import BrowserRouter  from '../utils/router/BrowserRouter';
import Header from '../components/Header';

const App = () => {
  return (
    <React.StrictMode>
      <IoCProvider container={container}>
          <Header/>
          <BrowserRouter BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate replace to="/" />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="profile" element={<ProfilePage />}>
                  <Route path="me" element={<OwnUserProfilePage />} />
                  <Route path=":id" element={<UserProfilePage />} />
                </Route>
              </Routes>
            </BrowserRouter>
      </IoCProvider>
    </React.StrictMode>
  )
}

export default App
