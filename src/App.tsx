import {StatusBar} from 'expo-status-bar';

import Navigator from './navigators/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserProvider} from './contexts/UserContext';

const App = () => {
  console.log('hello from react native app!');
  return (
    <SafeAreaProvider>
      <UserProvider>
        <Navigator />
      </UserProvider>
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
