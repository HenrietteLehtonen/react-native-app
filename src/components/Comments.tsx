// näytetään kommentit jos on kirjautunut
import React from 'react';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/contextHooks';
import {Controller, useForm} from 'react-hook-form'; // lomake
import {useCommentStore} from '../store';
import {useEffect} from 'react';
import {useComment} from '../hooks/apiHooks';
import {View} from 'react-native';
import {Text, Input, ListItem} from '@rneui/base';

type commentInputs = {
  comment_text: string;
};

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  // haetaan kirjautumistieto usercontekstista
  const user = useUserContext();
  // kommentit zustand storesta
  const {comments, setComments} = useCommentStore();
  // kommentit bäkkäristä
  const {postComment, getCommentsByMediaId} = useComment();
  // const [commentCount, setCommentCount] = useState(0);

  // kommentin lähettäminen
  // alkuarvo formille
  const initValues = {comment_text: ''};
  const {
    control,
    handleSubmit, // lähetys
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  // const doComment = async (inputs: commentInputs) => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     return;
  //   }
  //   // postatataan kommentti
  //   await postComment(inputs.comment_text, item.media_id, token);
  //   getComments();
  //   // tyhjennä form
  //   if (inputRef.current) {
  //     inputRef.current.value = '';
  //   }
  //   setInputs(initValues);
  // };

  // haetaan kommentit
  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      setComments(comments);
    } catch (error) {
      setComments([]);
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getComments();
  }, [item]); // aina kun item vaihtuu ajetaan getComments uusiks

  return (
    <>
      {/* Jos kirjautunut sisään voi kommentoida */}
      {user && (
        <View>
          <Text>Kommentit</Text>
          {/* Kommenttien controlleri */}
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
                errorMessage={errors.comment_text?.message}
              />
            )}
            name="comment_text"
          />
        </View>
      )}
      <View>
        <Text>Kommentit</Text>
      </View>
      {comments.length > 0 && (
        <ListItem>
          <ListItem.Content>
            {comments.map((comment) => (
              <li key={comment.comment_id}>
                <strong>{comment.username} </strong>
                <span className="text-stone-500">
                  ({new Date(comment.created_at || '').toLocaleString('fi-FI')})
                </span>
                <br></br>
                {comment.comment_text}
              </li>
            ))}
          </ListItem.Content>
        </ListItem>
      )}
    </>
  );
};

export default Comments;
