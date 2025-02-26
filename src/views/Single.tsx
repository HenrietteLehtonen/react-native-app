import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {Video} from 'expo-av';

const Single = ({route}: any) => {
  const {item} = route.params;
  return (
    <View>
      {item.media_type.includes('image') ? (
        <Image src={item.filename} style={styles.img} />
      ) : (
        <Video
          source={{uri: item.filename}}
          useNativeControls
          style={styles.img}
        />
      )}
      <Text>{item.title}</Text>
      {/* <Likes item={item} />
        <Ratings item={item} />
        <CommentCount item={item} /> */}
      <Text>Media owner:{item.username}</Text>
      <Text>{item.description}</Text>
      {/* <Comments item={item} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    maxHeight: 120,
  },
});

export default Single;
