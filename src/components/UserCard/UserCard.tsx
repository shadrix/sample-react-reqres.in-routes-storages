import { observer } from 'mobx-react';
import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

interface Props {
  user: {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
  } | null
}

const UserCard = observer((props: Props) => {
  const navigate = useNavigate();
  
  if (!props.user) {
    return null
  }
  const { id, email, first_name, last_name, avatar } = props.user

  return (
    <Card>
      <Card.Img variant="top" src={avatar} onClick={() => navigate(`/profile/${id}`)} />
      <Card.Body>
        <Card.Title>{email}</Card.Title>
        <Card.Text>
          {first_name} {last_name}
        </Card.Text>
      </Card.Body>
    </Card>
  )
});

export default UserCard
