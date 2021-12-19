import { observer } from 'mobx-react';
import React from 'react'
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import AuthStore from '../../stores/AuthStore';
import { useNavigate } from "react-router-dom";

const Header = observer(() => {
  const { t } = useTranslation(['header']);
  const store = useInjection<AuthStore>(ownTypes.authStore);
  const navigate = useNavigate();

  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand onClick={() => navigate('/')}>
              <Image src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-gear-128.png"   width="30" height="30" rounded />
            </Navbar.Brand>
            <Nav className="me-auto">
              <Button variant="dark" className='mx-2' onClick={() => navigate('/')}>{t('home')}</Button>
              {store.isAuthorized && <Button variant="dark" className='mx-2'  onClick={() => navigate('/profile/me')}>{t('profile')}</Button> }
              <Button variant="dark" className='mx-2'  onClick={() => navigate('/users?page=1')}>{t('users')}</Button>
            </Nav>
            <Nav>
               {store.isAuthorized && <Button onClick={()=> {
                  store.logout();
                  navigate('/', { replace: true});
                }}  >{t('logout')}</Button> }
            </Nav>
          </Container>
        </Navbar>
    </Container>
  )
});

export default Header
