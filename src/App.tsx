import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const App = () => {
  console.log('hello from react native app!');
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: '#fff', fontSize: 30}}>Native React APP </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#045838',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
