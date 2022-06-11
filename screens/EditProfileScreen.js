import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import Button from '../components/FormButton';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import LoadingOverlay from '../components/LoadingOverlay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import storage from '@react-native-firebase/storage';
import {editUser} from '../store/actions/usersActions';
import {ActivityIndicator} from 'react-native-paper';
import {Snackbar} from 'react-native-paper';

const EditProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user.user);
  const userDataLoading = useSelector(store => store.users.loading);

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [img, setImg] = useState(null);
  const [updatingData, setUpdatingData] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const onDismissSnackBar = () => {
    setVisible(false);
  };
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderContent = () => (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhoto}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={takePhoto}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          sheetRef.current.snapTo(1);
          setImg(null);
        }}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);

  const submitHandler = async () => {
    setUpdatingData(true);
    const userObj = {
      ...formData,
    };

    if (img) {
      const url = await uploadeImg();
      userObj['userImg'] = url;
    }

    console.log('userObj', userObj);
    dispatch(editUser(user.uid, userObj));
    setUpdatingData(false);
    setVisible(true);
  };
  const getUser = async () => {
    try {
      const currentUser = await firestore()
        .collection('Users')
        .doc(user.uid)
        .get();
      setUserData(currentUser.data());
      setFormData(currentUser.data());
    } catch (e) {
      console.log(e);
    }
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
  const updateFormInput = (input, value) => {
    setFormData({...formData, [input]: value});
  };
  const uploadeImg = async () => {
    let filename = img.substring(img.lastIndexOf('/') + 1);

    const [name, ext] = filename.split('.');

    const uploadName = user.uid + '.' + ext;
    console.log('uploadName', uploadName);
    const reference = storage().ref(`/photos/${uploadName}`);
    const task = reference.putFile(img);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });
    await task;

    console.log('Image uploaded to the bucket!');
    const url = await reference.getDownloadURL();
    return url;
  };
  useEffect(() => {
    console.log('userDataLoading', userDataLoading);
    getUser();
  }, [navigation, userDataLoading]);
  if (userData == null) {
    return <LoadingOverlay />;
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        sheetRef.current.snapTo(1);
      }}>
      <View style={{flex: 1}}>
        <Snackbar
          wrapperStyle={{top: 0, zIndex: 1000}}
          style={{backgroundColor: '#65c7af'}}
          visible={visible}
          duration={1000}
          onDismiss={onDismissSnackBar}>
          Profile was updated successfuly
        </Snackbar>
        <BottomSheet
          ref={sheetRef}
          snapPoints={[330, 0]}
          borderRadius={10}
          renderContent={renderContent}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <Animated.ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 10,
            paddingHorizontal: 20,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}>
          <View style={{alignItems: 'center', marginTop: 50}}>
            <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
              <Image
                source={{uri: img || userData.userImg}}
                style={{width: 80, height: 80, borderRadius: 20}}
              />
            </TouchableOpacity>
            <View style={{marginTop: 8}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '700',
                  fontSize: 18,
                }}>{`${userData.fname} ${userData.lname}`}</Text>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <View style={styles.inputContainer}>
              <View
                style={{
                  marginRight: 5,
                }}>
                <FontAwesome name="user-o" size={22} />
              </View>
              <View style={{flex: 1}}>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  value={formData.fname}
                  placeholder="First Name"
                  onChangeText={text => {
                    updateFormInput('fname', text);
                  }}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View
                style={{
                  marginRight: 5,
                }}>
                <FontAwesome name="user-o" size={22} />
              </View>
              <View style={{flex: 1}}>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  value={formData.lname}
                  placeholder="Last Name"
                  onChangeText={text => {
                    updateFormInput('lname', text);
                  }}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View
                style={{
                  marginRight: 5,
                }}>
                <Ionicons name="ios-clipboard-outline" size={22} />
              </View>
              <View style={{flex: 1}}>
                <TextInput
                  multiline
                  style={styles.input}
                  autoCapitalize="none"
                  value={formData.about}
                  placeholder="Bio"
                  onChangeText={text => {
                    updateFormInput('about', text);
                  }}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View
                style={{
                  marginRight: 5,
                }}>
                <Feather name="phone" size={22} />
              </View>
              <View style={{flex: 1}}>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  value={formData.phone}
                  placeholder="+966 00000000"
                  onChangeText={text => {
                    updateFormInput('phone', text);
                  }}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View
                style={{
                  marginRight: 5,
                }}>
                <FontAwesome name="globe" size={22} />
              </View>
              <View style={{flex: 1}}>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  value={formData.contury}
                  placeholder="Contury"
                  onChangeText={text => {
                    updateFormInput('Contury', text);
                  }}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View
                style={{
                  marginRight: 5,
                }}>
                <Ionicons name="location-outline" size={22} />
              </View>
              <View style={{flex: 1}}>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  value={formData.location}
                  placeholder="location"
                  onChangeText={text => {
                    updateFormInput('location', text);
                  }}
                />
              </View>
            </View>
            <View style={{marginTop: 15}}>
              <Button disabled={updatingData} onPress={submitHandler}>
                Update
                {updatingData && (
                  <ActivityIndicator size="small" color="#2a59e0" />
                )}
              </Button>
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    paddingVertical: 0,

    borderBottomWidth: 1,

    borderBottomColor: '#E5E5E5',

    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    paddingVertical: 2,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2a59e0',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
});
