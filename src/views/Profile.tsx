import React from 'react';
import {Button, Card} from '@rneui/base';
import {Text, View} from 'react-native';
import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {handleLogout, user} = useUserContext(); // {mikä funktio haetaan} = Mistä haetaan

  return (
    <>
      <Text>My profile</Text>
      <Card>
        <Card.Title>{user?.username}</Card.Title>
        <Button onPress={handleLogout}>Logout</Button>
      </Card>
    </>
  );
};

export default Profile;
