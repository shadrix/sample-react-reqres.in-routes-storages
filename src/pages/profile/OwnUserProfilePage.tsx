import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Container, Col, Image, Row, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useInjection } from '../../ioc/ioc.react'
import ownTypes from '../../ioc/ownTypes'
import { OwnUserProfilePageStore } from '../../stores/pages/profile'


const OwnUserProfilePage = observer(() => {
  const store = useInjection<OwnUserProfilePageStore>(ownTypes.ownUserProfilePageStore);
  const { t } = useTranslation(['profilePage']);
  
  useEffect(() => {
    const getUser = async () => {
      await store.init();
    }
    getUser()
  }, [store])
  
  return (
    <Container className="pt-4 pb-4">
      {store.isLoading ? (
          <Spinner animation="border" />
        ) : (
          <>
           <h1 className='mb-4' >{t('own_user')}</h1>
            <Row>
              <Col sm='auto'>
                <Image src={store.user?.avatar} width={128} height={128} />
              </Col>
            <Col sm={4}>
                <Row sm={4}>
                  <Col>
                    <span style={{ fontWeight: 'bold' }}>{t('user_info.email')}:</span> 
                  </Col>
                  <Col className="ml-2">
                      {store.user?.email}
                  </Col>
                </Row>
                <Row sm={4}>
                  <Col>
                    <span style={{ fontWeight: 'bold'}}>{t('user_info.first_name')}:</span> 
                  </Col>
                  <Col className="ml-2">
                    {store.user?.first_name}
                  </Col>
                </Row>
                <Row sm={4}>
                  <Col>
                    <span style={{ fontWeight: 'bold'}}>{t('user_info.last_name')}:</span> 
                  </Col>
                  <Col className="ml-2">
                    {store.user?.last_name}
                  </Col>
                </Row>
            </Col>
            </Row>
          </>
        )}
    </Container>
  )
});

export default OwnUserProfilePage;
