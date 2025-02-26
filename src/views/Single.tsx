import React from 'react';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Image, Text, View, StyleSheet, ScrollView} from 'react-native';
import {Video} from 'expo-av';
import {Card, Icon, ListItem} from '@rneui/base';

const Single = ({route}: any) => {
  const item: MediaItemWithOwner = route.params.item;
  return (
    <ScrollView>
      <Card>
        {item.media_type.includes('image') ? (
          <Image style={styles.image} src={item.filename} />
        ) : (
          <Video
            style={styles.image}
            source={{uri: item.filename}}
            useNativeControls
          />
        )}
        <Card.Title>{item.title}</Card.Title>
        <ListItem>
          <Icon name="heart" type="font-awesome" color={'#49a078'}></Icon>
          <Text style={styles.text}>10</Text>
          <Icon name="star" type="font-awesome" color={'#49a078'}></Icon>
          <Text>5</Text>
          <Icon name="comment" color={'#49a078'}></Icon>
          <Text>3</Text>
          {/* <Likes item={item} />
        <Ratings item={item} />
        <CommentCount item={item} /> */}
          <Icon name="user-circle" type="font-awesome-5" color={'#49a078'} />
          <Text>{item.username}</Text>
        </ListItem>
        <ListItem>
          <Text>{item.description}</Text>
          {/* <Comments item={item} /> */}
        </ListItem>
        <ListItem>
          <Text>Media id: {item.media_id}</Text>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {height: 300, marginBottom: 20},
  text: {color: '#987654'},
});

export default Single;
