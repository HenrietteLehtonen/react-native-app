import React from 'react';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Image, Text, View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Video} from 'expo-av';
import {Button, Card, Icon, ListItem} from '@rneui/base';
import Comments from '../components/Comments';
import {useMedia} from '../hooks/apiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUpdateContext, useUserContext} from '../hooks/contextHooks';
import {useNavigation} from '@react-navigation/native';

const Single = ({route}: any) => {
  const item: MediaItemWithOwner = route.params.item;
  const {deleteMedia} = useMedia();
  const {user} = useUserContext();
  const {triggerUpdate} = useUpdateContext();
  const navigation = useNavigation();

  // median poisto
  const handleDelete = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      if (!token) {
        return;
      }
      await deleteMedia(item.media_id, token);
      triggerUpdate();
      Alert.alert('Succes', 'Media deleted');
      navigation.goBack();
    } catch {}
  };
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
        </ListItem>
        <ListItem>
          <Text>Media id: {item.media_id}</Text>
        </ListItem>
        <Comments item={item} />
        <ListItem>
          {/* jos user ja user id = item user_id delete nappi näkyy */}
          {user && user.user_id === item.user_id && (
            <Button
              title="Delete"
              color="warning"
              onPress={handleDelete}
            ></Button>
          )}
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
