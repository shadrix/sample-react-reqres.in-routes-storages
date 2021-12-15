import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Container, Col, Image, Row } from 'react-bootstrap'
import { useInjection } from '../../ioc/ioc.react'
import ownTypes from '../../ioc/ownTypes'
import UserPageStore  from '../../stores/pages/UserPageStore'


const UserPage = observer(() => {
  const store = useInjection<UserPageStore>(ownTypes.userPageStore);
  
  useEffect(() => {
    const getUser = async () => {
      await store.init();
    }
    getUser()
  }, [store])
  
  return (
    <Container className="pt-4 pb-4">
        <h1 className='mb-4' >User info</h1>
        <Row>
          <Col sm='auto'>
            <Image src={store.user?.avatar} rounded />
          </Col>
         <Col sm={4}>
            <Row sm={4}>
              <Col>
                 <span style={{ fontWeight: 'bold' }}>email:</span> 
              </Col>
              <Col className="ml-2">
                  {store.user?.email}
              </Col>
            </Row>
            <Row sm={4}>
              <Col>
                 <span style={{ fontWeight: 'bold'}}>first name:</span> 
              </Col>
              <Col className="ml-2">
                 {store.user?.first_name}
              </Col>
            </Row>
            <Row sm={4}>
              <Col>
                 <span style={{ fontWeight: 'bold'}}>last name:</span> 
              </Col>
              <Col className="ml-2">
                {store.user?.last_name}
              </Col>
            </Row>
        </Col>
        </Row>
    </Container>
  )
});

export default UserPage;
