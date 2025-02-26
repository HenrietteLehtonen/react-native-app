import {useState} from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import {Button} from '@rneui/base';
import React from 'react'; // Add this line

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState<boolean>(false);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <>
      {displayRegister ? <RegisterForm /> : <LoginForm />}
      <Button onPress={toggleRegister}>
        {displayRegister ? 'Login' : 'New User? Register'}
      </Button>
    </>
  );
};

export default Login;
