import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector, useDispatch} from 'react-redux';
import {addPost} from '../store/actions/postsActions';
import {Snackbar} from 'react-native-paper';
import {Dimensions} from 'react-native';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
const AddPostScreen = ({navigation}) => {
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();

  const [post, setPost] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [transferd, setTransferd] = React.useState(0);
  const onToggleSnackBar = () => {
    setVisible(!visible);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
    navigation.navigate('HomeScreen');
  };
  const [img, setImg] = useState(null);
  const submitHandler = async () => {
    setSubmiting(true);

    const postObj = {
      userId: user.uid,
      post: post,

      postTime: firestore.Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
      likedBy: [],
    };
    if (img) {
      const url = await uploadeImg();
      console.log(url);
      postObj['postImg'] = url;
    }
    console.log(postObj);
    dispatch(addPost(postObj));
    setSubmiting(false);
    setVisible(true);
  };
  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImg(image.path);
    });
  };
  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImg(image.path);
    });
  };

  const uploadeImg = async () => {
    setUploading(true);
    setTransferd(0);
    let filename = img.substring(img.lastIndexOf('/') + 1);
    const [name, ext] = filename.split('.');
    const uploadName = name + Date.now() + '.' + ext;
    const reference = storage().ref(`/photos/${uploadName}`);
    const task = reference.putFile(img);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferd(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });
    await task;

    console.log('Image uploaded to the bucket!');
    const url = await reference.getDownloadURL();
    setUploading(false);
    return url;
  };
  return (
    <View style={styles.container}>
      <Snackbar
        wrapperStyle={{top: 0, zIndex: 1000}}
        style={{backgroundColor: '#65c7af'}}
        visible={visible}
        duration={1000}
        onDismiss={onDismissSnackBar}>
        Post was added successfuly
      </Snackbar>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 15,
          width: '100%',
        }}>
        <MaterialIcons
          name="arrow-back"
          color="#265ae1"
          size={22}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          disabled={submiting}
          onPress={submitHandler}>
          {submiting ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text style={{color: '#265ae1', fontWeight: 'bold'}}>Post</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View>
          {img && (
            <Image style={{width: '100%', height: 250}} source={{uri: img}} />
          )}
        </View>
        <View style={{justifyContent: 'center'}}>
          <TextInput
            value={post}
            onChangeText={setPost}
            placeholder="What is in your mind?"
            multiline
            style={{color: 'black', fontSize: 20, textAlign: 'center'}}
          />
        </View>
        {uploading && (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>{transferd} % Completed</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>

      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Choose Photo"
          onPress={choosePhoto}>
          <MaterialIcons name="photo-library" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Take Photo"
          onPress={takePhoto}>
          <MaterialIcons name="add-a-photo" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default AddPostScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e5f2',
  },
  title: {
    fontSize: 30,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#172a65',
  },
  link: {
    color: '#2e64e5',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
