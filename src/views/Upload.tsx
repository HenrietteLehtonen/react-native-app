import {Controller, useForm} from 'react-hook-form'; // lomake
import {Button, Card, Image, Input} from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import {useEffect, useState} from 'react';
import VideoPlayer from '../components/VideoPlayer';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFile, useMedia} from '../hooks/apiHooks';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigatorType} from '../types/LocalTypes';
import {useUpdateContext} from '../hooks/contextHooks';

type uploadInputs = {
  title: string;
  description: string;
};

const Upload = () => {
  // state for storing the image chosen with ImagePicker
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );

  const initValues = {title: '', description: ''};
  const {
    control,
    handleSubmit, // lähetys
    formState: {errors, isValid},
    reset, // formin resetointi
  } = useForm({
    defaultValues: initValues,
  });

  const [loading, setLoading] = useState(false);
  const {postExpoFile} = useFile();
  const {postMedia} = useMedia();
  const navigation = useNavigation<NativeStackNavigationProp<NavigatorType>>();
  const {triggerUpdate} = useUpdateContext();

  // formin resetointi
  const resetForm = () => {
    setImage(null);
    reset(initValues);
    setLoading(false); // ei tässä
  };

  const doUpload = async (inputs: uploadInputs) => {
    console.log(inputs);
    // if image is not selected, Alert error message and stop running this function
    if (!image || !image.assets) {
      Alert.alert('Error', 'Media not selected!');
      return;
    }
    // read token
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Error', 'Token not found');
      return;
    }
    // call postExpoFile() with image uri and token
    const fileResponse = await postExpoFile(image.assets[0].uri, token);
    // TODO: get response and call postMedia() with the response data included
    const mediaResponse = await postMedia(fileResponse, inputs, token);
    // TODO: run context update (covered later)

    Alert.alert('Success', mediaResponse.message);
    // reset the form and navigate to Home tab

    navigation.navigate('Home');
    triggerUpdate();
    resetForm();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 0.4,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      resetForm();
    });
    return unsubscribe;
  }, []);

  return (
    <Card>
      <Card.Title>Upload</Card.Title>
      {/* Otsikko controller */}
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'min 3 char'}, // tsekkaa et täsmää apin kaa
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.title?.message}
          />
        )}
        name="title"
      />

      {/* Description controller */}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: {value: true, message: 'is required'},
          minLength: {value: 5, message: 'min 5 char'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.description?.message}
          />
        )}
        name="description"
      />
      {/* filun valitseminen tässä */}
      {image?.assets && image.assets[0].type === 'video' ? (
        <VideoPlayer
          videoFile={image.assets[0].uri}
          style={{height: 150, width: 150}}
        />
      ) : (
        <Image
          source={{
            uri:
              image?.assets![0].uri ||
              'https://placehold.co/200x200@2x/grey/white/png?text=Choose+File',
          }}
          style={{height: 150, width: 150}}
          onPress={pickImage}
        />
      )}
      <Button
        loading={loading}
        title="Add media"
        onPress={handleSubmit(doUpload)}
        buttonStyle={{backgroundColor: '#49a078', marginVertical: 5}}
      />
      <Button
        title="Reset media"
        onPress={resetForm}
        buttonStyle={{backgroundColor: 'red', marginVertical: 5}}
      />
    </Card>
  );
};
export default Upload;
