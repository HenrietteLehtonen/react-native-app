import {StatusBar} from 'expo-status-bar';

import Navigator from './navigators/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserProvider} from './contexts/UserContext';
import {UpdateProvider} from './contexts/UpdateContext';

const App = () => {
  console.log('hello from react native app!');
  return (
    <SafeAreaProvider>
      <UpdateProvider>
        <UserProvider>
          <Navigator />
        </UserProvider>
      </UpdateProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: Platform.OS === 'android' ? 30 : 0,
//   },
// });

export default App;
