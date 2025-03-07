import {Controller, useForm} from 'react-hook-form';
import {useUserContext} from '../hooks/contextHooks';
import {Credentials} from '../types/LocalTypes';
import {Button, Card, Input} from '@rneui/base';

const LoginForm = () => {
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {username: '', password: ''};
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  const doLogin = async (inputs: Credentials) => {
    handleLogin(inputs);
  };

  return (
    <Card>
      <Card.Title>Login</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
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
      <Button
        title="Login"
        onPress={handleSubmit(doLogin)}
        buttonStyle={{backgroundColor: '#49a078'}}
      />
    </Card>
  );
};
export default LoginForm;
