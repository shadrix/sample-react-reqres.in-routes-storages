import { observer } from 'mobx-react';
import React from 'react'
import { Navbar, Nav, Container, Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

const Header = observer(() => {
  const { t } = useTranslation(['header']);

  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <Image src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-gear-128.png"   width="30" height="30" rounded />
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">{t('home')}</Nav.Link>
              <Nav.Link href="/profile/me">{t('profile')}</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
    </Container>
  )
});

export default Header
