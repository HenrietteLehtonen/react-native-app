import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

type MediaItemProps = {
  item: MediaItemWithOwner;
  navigation: NavigationProp<ParamListBase>;
};

const MediaListItem = ({item, navigation}: MediaItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadowProp]}
      onPress={() => {
        console.log(item.title + ' clicked');
        navigation.navigate('Single', {item});
      }}
    >
      <Image
        style={{
          height: 200,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
        source={{
          uri:
            item.thumbnail ||
            (item.screenshots && item.screenshots[1]) ||
            undefined,
        }}
      ></Image>
      <Text style={{fontWeight: 900, padding: 8}}>{item.title}</Text>
      <Text style={styles.card_text}>{item.description}</Text>
      <Text style={styles.card_text}>Media owner: {item.username}</Text>
      <Text style={styles.card_text}>Media id: {item.media_id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: 250,
    height: 500,
    margin: 20,
    borderRadius: 10,
    boxShadow: '#444',
  },
  card_text: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default MediaListItem;
