import {StatusBar} from 'expo-status-bar';

import Navigator from './navigators/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  console.log('hello from react native app!');
  return (
    <SafeAreaProvider>
      {/* <Text style={{color: '#fff', fontSize: 30}}>Native React APP </Text> */}
      {/* <Home /> tää vaihetaan navigaattoriin */}
      <Navigator />
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
