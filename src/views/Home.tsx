import {FlatList, View} from 'react-native';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useUpdateContext} from '../hooks/contextHooks';

const Home = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {mediaArray, loading} = useMedia();
  const {setUpdate} = useUpdateContext();

  console.log(mediaArray);

  // rullan käyttö
  const onRefresh = () => {
    setUpdate((update) => !update);
  };

  return (
    <View>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => (
          <MediaListItem navigation={navigation} item={item} />
        )}
        onRefresh={onRefresh}
        refreshing={loading}
      />
    </View>
  );
};

export default Home;
