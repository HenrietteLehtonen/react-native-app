import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type MediaItemProps = {
  item: MediaItemWithOwner;
};

const MediaListItem = ({item}: MediaItemProps) => {
  return (
    <TouchableOpacity style={styles.container}>
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
  },
  card_text: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

export default MediaListItem;
