import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import Home from './views/Home';

const App = () => {
  console.log('hello from react native app!');
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{color: '#fff', fontSize: 30}}>Native React APP </Text> */}
      <Home />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default App;
