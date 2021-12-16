import { observer } from 'mobx-react';
import React from 'react'
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useInjection } from '../../ioc/ioc.react';
import ownTypes from '../../ioc/ownTypes';
import AuthStore from '../../stores/AuthStore';

const Header = observer(() => {
  const { t } = useTranslation(['header']);
  const store = useInjection<AuthStore>(ownTypes.authStore);

  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <Image src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-gear-128.png"   width="30" height="30" rounded />
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">{t('home')}</Nav.Link>
              {store.isAuthorized && <Nav.Link href="/profile/me">{t('profile')}</Nav.Link> }
              <Nav.Link href="/users?page=1">{t('users')}</Nav.Link>
            </Nav>
            <Nav>
               {store.isAuthorized && <Button onClick={()=> store.logout()}  >{t('logout')}</Button> }
            </Nav>
          </Container>
        </Navbar>
    </Container>
  )
});

export default Header
