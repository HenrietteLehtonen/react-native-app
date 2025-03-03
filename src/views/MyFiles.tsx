import {FlatList, View} from 'react-native';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useUserContext} from '../hooks/contextHooks';

const MyFiles = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const {user} = useUserContext();
  const {mediaArray} = useMedia();

  return (
    <View>
      <FlatList
        data={mediaArray}
        renderItem={({item}) => (
          <MediaListItem navigation={navigation} item={item} />
        )}
      />
    </View>
  );
};
export default MyFiles;
