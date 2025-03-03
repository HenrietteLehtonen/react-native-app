import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Single from '../views/Single';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useUserContext} from '../hooks/contextHooks';
import Login from '../views/Login';
import MyFiles from '../views/MyFiles';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home tabs ("alareunassa")
const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home-outline' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-outline' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#49a078',
        tabBarInactiveTintColor: 'grey',
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        // options={{header: () => <Text>HI</Text>}}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// STACK NAV
const StackScreen = () => {
  // tallennetaan käyttäjän tiedot
  const {user} = useUserContext();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Single"
            component={Single}
            options={{headerTintColor: '#49a078'}}
          />
          <Stack.Screen
            name="My Files"
            component={MyFiles}
            options={{headerTintColor: '#49a078'}}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
