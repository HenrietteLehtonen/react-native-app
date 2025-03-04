import {Button, Card, Input} from '@rneui/base';
import {Controller, useForm} from 'react-hook-form';
import {Alert, Text} from 'react-native';
import {useUser} from '../hooks/apiHooks';
import {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = ({
  setDisplayRegister,
}: {
  setDisplayRegister: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {postRegister, getUsernameAvailable, getEmailAvailable} = useUser(); // {mitä kutsutaan useUser Hookista}

  const initValues: {
    username: string;
    password: string;
    confirmPassword?: string;
    email: string;
  } = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  const doRegister = async (inputs: {
    username: string;
    password: string;
    confirmPassword?: string;
    email: string;
  }) => {
    try {
      delete inputs.confirmPassword;
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('doRegister result', registerResult);
      Alert.alert('User created');
      // vaihetaan näkymä loginniin
      setDisplayRegister(false);
    } catch (error) {
      console.error((error as Error).message);
      Alert.alert('Registeration failed!');
    }
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  return (
    <Card>
      <Card.Title>Register</Card.Title>
      <Controller
        control={control}
        rules={{
          minLength: {value: 5, message: 'min 5 characters'},
          maxLength: 100,
          required: {value: true, message: 'is required'},
          validate: async (value) => {
            try {
              const {available} = await getUsernameAvailable(value);
              console.log('available?', available);
              return available ? true : 'Username not available';
            } catch (e) {
              console.error((e as Error).message);
              return true;
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          minLength: {value: 5, message: 'min 5 characters'},
          maxLength: 100,
          required: {value: true, message: 'is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          validate: (value) => {
            return value === getValues().password
              ? true
              : 'password must match';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.confirmPassword?.message}
          />
        )}
        name="confirmPassword"
      />
      <Controller
        control={control}
        rules={{
          pattern: {
            // simple email regex pattern, do better?
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'not a valid email',
          },
          maxLength: 100,
          required: {value: true, message: 'is required'},
          validate: async (value) => {
            try {
              const {available} = await getEmailAvailable(value);
              console.log('email available?', available);
              return available ? true : 'Email not available';
            } catch (e) {
              console.error((e as Error).message);
              return true;
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
        name="email"
      />
      <Button title="Register" onPress={handleSubmit(doRegister)} />
    </Card>
  );
};

export default RegisterForm;
