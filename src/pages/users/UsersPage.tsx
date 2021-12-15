import { observer } from 'mobx-react'
import React from 'react'
import { useInjection } from '../../ioc/ioc.react'
import ownTypes from '../../ioc/ownTypes'
import UsersPageStore  from '../../stores/pages/UsersPageStore'


const UsersPage = observer(() => {
  const store = useInjection<UsersPageStore>(ownTypes.usersPageStore);
  
  return (
    <>{store}</>
  )
});

export default UsersPage;
