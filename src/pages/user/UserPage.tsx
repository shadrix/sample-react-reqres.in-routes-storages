import { observer } from 'mobx-react'
import React from 'react'
import { useInjection } from '../../ioc/ioc.react'
import ownTypes from '../../ioc/ownTypes'
import UserPageStore  from '../../stores/pages/UserPageStore'


const UserPage = observer(() => {
  const store = useInjection<UserPageStore>(ownTypes.userPageStore);
  
  return (
   <>{store}</>
  )
});

export default UserPage;
