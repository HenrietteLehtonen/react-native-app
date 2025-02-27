import React, {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {AuthContextType, Credentials} from '../types/LocalTypes';
import {UserWithNoPassword} from 'hybrid-types/DBTypes';
import {UserResponse} from 'hybrid-types/MessageTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials: Credentials) => {
    try {
      // post login credentials to API
      const loginResult = await postLogin(credentials);
      console.log('doLogin result', loginResult);
      // set token to async storage
      if (loginResult) {
        await AsyncStorage.setItem('token', loginResult.token);
      }
      //set user to state
      setUser(loginResult.user);
      // TODO: navigate to home
    } catch (e) {
      console.log((e as Error).message);
      Alert.alert('Login failed!', (e as Error).message);
    }
  };

  const handleLogout = async () => {
    try {
      // Tremove token from local storage
      // setItem
      await AsyncStorage.removeItem('token');
      // set user to null
      setUser(null);
      // TODO: navigate to home
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      // get token from local storage
      const token = await AsyncStorage.getItem('token');
      // if token exists, get user data from API
      if (!token) {
        return;
      }
      const userResponse: UserResponse = await getUserByToken(token);
      // set user to state
      setUser(userResponse.user);
    } catch (e) {
      // alert('Token not valid');
      console.log((e as Error).message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
