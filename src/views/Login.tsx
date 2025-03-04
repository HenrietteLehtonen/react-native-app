import {useEffect, useState} from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {Button, Icon} from '@rneui/base';
import React from 'react';
import {ScrollView} from 'react-native';
import {useUserContext} from '../hooks/contextHooks';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState<boolean>(false);
  const {handleAutoLogin} = useUserContext();

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  // kirjaudu automaagisesti
  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <>
      <ScrollView>
        <Icon
          name="login"
          type="ant-design"
          color={'#49a078'}
          style={{margin: 20}}
        ></Icon>

        {displayRegister ? (
          <RegisterForm setDisplayRegister={setDisplayRegister} />
        ) : (
          <LoginForm />
        )}
        <Button
          onPress={toggleRegister}
          style={{margin: 15}}
          buttonStyle={{backgroundColor: '#49a078'}}
        >
          {displayRegister ? 'Already registered? Login' : 'New User? Register'}
        </Button>
      </ScrollView>
    </>
  );
};

export default Login;
