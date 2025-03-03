import React from 'react';
import {Button, Card, Icon, ListItem} from '@rneui/base';
import {Text, View} from 'react-native';
import {useUserContext} from '../hooks/contextHooks';
import MyFiles from './MyFiles';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

const Profile = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {handleLogout, user} = useUserContext(); // {mikä funktio haetaan} = Mistä haetaan

  return (
    <>
      <Card>
        <Card.Title>{user?.username}</Card.Title>
        <ListItem>
          <Icon name="user-circle" type="font-awesome-5" color={'#49a078'} />
          <Text>{user?.username}</Text>
        </ListItem>
        <ListItem>
          <Icon name="email" type="fontisto" color={'#49a078'} />
          <Text>{user?.email}</Text>
        </ListItem>
        <ListItem>
          <Icon name="calendar-check" type="font-awesome-5" color={'#49a078'} />
          <Text>
            Member since:{' '}
            {user && new Date(user.created_at).toLocaleDateString('fi-FI')}
          </Text>
        </ListItem>
        <Button
          onPress={() => {
            navigation.navigate('My Files');
          }}
          buttonStyle={{backgroundColor: '#49a078', margin: 5}}
        >
          Show my files
        </Button>
        <Button
          onPress={handleLogout}
          buttonStyle={{backgroundColor: '#49a078', margin: 5}}
        >
          Logout
        </Button>
      </Card>
    </>
  );
};

export default Profile;
