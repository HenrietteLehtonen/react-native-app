import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import Navigator from './navigators/Navigator';

const App = () => {
  console.log('hello from react native app!');
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{color: '#fff', fontSize: 30}}>Native React APP </Text> */}
      {/* <Home /> tää vaihetaan navigaattoriin */}
      <Navigator />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default App;
