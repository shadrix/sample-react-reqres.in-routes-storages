import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import Pagination from '../../components/Pagination'
import UserCard from '../../components/UserCard'
import { useInjection } from '../../ioc/ioc.react'
import ownTypes from '../../ioc/ownTypes'
import UsersPageStore  from '../../stores/pages/UsersPageStore'
import { useNavigate } from "react-router-dom";


const UsersPage = observer(() => {
  const store = useInjection<UsersPageStore>(ownTypes.usersPageStore);
  const { t } = useTranslation(['usersPage']);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getUser = async () => {
      await store.init();
    }
    getUser()
  }, [store, store.currentPage])

  return (
    <Container>
      <Row className="justify-content-center">
        {store.isLoading ? (
          <Spinner animation="border" />
        ) : (
          <>
            <h1 className='mb-4' >{t('title')}</h1>
            {store.users?.map((user, key) => (
              <Col key={key} sm={6} md={4} lg={3} xl={2} className="mb-2 mt-2">
                <UserCard user={user} />
              </Col>
            ))}
          </>
        )}

      </Row>
      <Pagination total={store.totalPages} active={store.currentPage} onChange={(val) => { 
          store.changePage(val);
          navigate(`/users?page=${val}`, {replace: true}); 
        }}/>
    </Container>
  )
});

export default UsersPage;
