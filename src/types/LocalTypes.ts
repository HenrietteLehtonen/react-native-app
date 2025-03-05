import {
  MediaItemWithOwner,
  User,
  UserWithNoPassword,
} from 'hybrid-types/DBTypes';

type Credentials = Pick<User, 'username' | 'password'>;
type RegisterCredentials = Pick<User, 'username' | 'password' | 'email'>;

type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};

export type NavigatorType = {
  // tab screen tyypit - pitää täsmätä navigaattorin kanssa!
  Home: undefined;
  Profile: undefined;
  Upload: undefined;

  // stack navi
  Tabs: undefined;
  Single: {item: MediaItemWithOwner}; // route param
  'My Files': undefined;
  Login: undefined;
};

export type {Credentials, RegisterCredentials, AuthContextType};
