import React from 'react'
import { useInjection } from '../ioc/ioc.react'
import { ProfilePage, UserProfilePage, OwnUserProfilePage } from '../pages/profile';
import '../locales/config';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/home';
import UsersPage from '../pages/users';
import BrowserRouter  from '../utils/router/BrowserRouter';
import Header from '../components/Header';
import ownTypes from '../ioc/ownTypes';
import AuthStore from '../stores/AuthStore';
import { observer } from 'mobx-react';

const App = observer(() => {
  const store = useInjection<AuthStore>(ownTypes.authStore);

  return (
          <BrowserRouter>
            <Header/>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="*" element={<Navigate replace to="/" />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="profile" element={<ProfilePage />}>
                    <Route path="me" element={store.isAuthorized ? <OwnUserProfilePage /> : <Navigate replace to="/" />} />
                    <Route path=":id" element={<UserProfilePage />} />
                  </Route>
                </Routes>
            </BrowserRouter>
  )
});

export default App
