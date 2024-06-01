import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import {Modalize} from 'react-native-modalize';
import Geolocation from 'react-native-geolocation-service';
import {launchImageLibrary} from 'react-native-image-picker';
import {NotesInput, UserCard} from '..';
import {appIcons, appImages} from '../../assets';
import {Loading} from '../../components/Loading';
import {WP, colors, HP, family, size} from '../../utilities';

// redux stuff
import {useSelector, useDispatch} from 'react-redux';
import {getExpRequest, addExpRequest} from '../../redux/actions';

const {height, width} = Dimensions.get('window');
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

export const WhoWereHere = ({modalizeRef, modalData}) => {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [img1Params, setImg1Params] = useState(null);
  const [img2Params, setImg2Params] = useState(null);
  const [img3Params, setImg3Params] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.login);

  useEffect(() => {
    checkPermissions();
    if (modalData?.CompanyId) {
      getExpData();
    }
  }, [modalData]);

  const checkPermissions = async () => {
    if (Platform.OS === 'ios') {
      const isPermitted = await Geolocation.requestAuthorization('whenInUse');
      if (isPermitted) {
        getCurrentLocation();
      }
    } else {
      const isPermitted = hasLocationPermission();
      if (isPermitted) {
        getCurrentLocation();
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setLat(region?.latitude);
        setLng(region?.longitude);
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        // maximumAge: 1000,
      },
    );
  };

  const hasLocationPermission = async () => {
    const hasPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('CHECK LOCATION STATUS:');
      return true;
    }
    const status = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status) {
      console.log('PERMISSION GIVEN:-');
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      console.log('LOCATION PERMISSION DENIED BY THE USER');
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log('LOCATION PERMISSION REVOKED BY THE USER');
    }
    return false;
  };

  const handleGallery = imgCount => {
    setTimeout(() => {
      let options = {
        mediaType: 'photo',
        maxWidth: 400,
        maxHeight: 500,
        quality: 1,
      };
      try {
        launchImageLibrary(options, response => {
          console.log('value of response gallery is  ', response);
          if (response.didCancel) {
            console.log('Cancel ', response.didCancel);
          } else if (response.error) {
            console.log('Error ', response?.error);
          } else if (response.customButton) {
            console.log('value of response in custom button is  ', response);
          } else {
            const params = {
              uri: response.assets[0].uri,
              type: response.assets[0].type,
              name: response.assets[0].fileName,
              size: response.assets[0].fileSize,
            };
            switch (imgCount) {
              case 1:
                setImage1(response.assets[0].uri);
                setImg1Params(params);
                break;
              case 2:
                setImage2(response.assets[0].uri);
                setImg2Params(params);
                break;
              case 3:
                setImage3(response.assets[0].uri);
                setImg3Params(params);
                break;
              default:
                return;
            }
          }
        });
      } catch (e) {
        console.log('value of error in catch ', e);
      }
    }, 300);
  };

  const getExpData = () => {
    // setIsLoading(true);
    //When api is successfull
    const cbSuccess = async message => {
      setData(message?.Response);
      setIsLoading(false);
    };
    //When api is not successfull
    const cbFailure = message => {
      console.log('Msgs are ==> ', message);
      setIsLoading(false);
    };
    dispatch(
      getExpRequest(modalData.CompanyId, userData.Token, cbSuccess, cbFailure),
    );
  };

  const submitExperience = () => {
    if (
      comment === '' ||
      image1 === null ||
      image2 === null ||
      image3 === null
    ) {
      alert('Kindly add comment and related images.');
    } else {
      setIsLoading(true);
      const formData = new FormData();

      formData.append('CompanyId', modalData?.CompanyId);
      formData.append('Experiance', comment);
      formData.append('Longitude', lng);
      formData.append('Latitude', lat);
      formData.append('Image1', img1Params);
      formData.append('Image2', img2Params);
      formData.append('Image3', img3Params);

      //When api is successfull
      const cbSuccess = async message => {
        getExpData();
        setComment('');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        modalizeRef.current?.close();
        setIsLoading(false);
        alert('Your experience is submitted.');
      };
      //When api is not successfull
      const cbFailure = message => {
        console.log('Error msg ==> ', message);
        setIsLoading(false);
      };
      dispatch(addExpRequest(formData, userData?.Token, cbSuccess, cbFailure));
    }
  };

  return (
    <Modalize
      useNativeDriver
      ref={modalizeRef}
      withHandle={false}
      modalStyle={styles.sheetContainer}
      overlayStyle={{backgroundColor: colors.bg14}}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
      }}
      avoidKeyboardLikeIOS={Platform.select({ios: true, android: false})}>
      <ImageBackground source={appImages.splashBg} style={styles.mainContainer}>
        <Loading visible={isLoading} />
        <ScrollView
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          style={{marginBottom: Platform.OS === 'ios' ? 10 : 0}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.heading}>{modalData?.CompanyName}</Text>
            <ImageBackground
              style={styles.circleImgStyle}
              source={appImages.circle}>
              <Image
                source={{uri: modalData?.CompanyIcon}}
                style={styles.userImgStyle}
              />
            </ImageBackground>
            <Text style={styles.subHeading}>Add your Experience</Text>
            <NotesInput
              isHeight
              value={comment}
              placeholder={'Add Your Experience '}
              onChangeText={txt => setComment(txt)}
            />

            <View style={styles.cameraView}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleGallery(1)}
                style={styles.cameraButton}>
                <ImageBackground
                  source={image1 === null ? appIcons.camera1 : {uri: image1}}
                  style={
                    image1 === null ? styles.cameraIcon : styles.cameraIcon1
                  }
                  imageStyle={{borderRadius: image1 === null ? 0 : 18}}>
                  {image1 ? (
                    <Icon
                      type={'MaterialIcons'}
                      name={'delete'}
                      color={'red'}
                      size={HP('3')}
                      onPress={() => {
                        setImage1(null);
                        setImg1Params(null);
                      }}
                    />
                  ) : null}
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleGallery(2)}
                style={styles.cameraButton}>
                <ImageBackground
                  source={image2 === null ? appIcons.camera1 : {uri: image2}}
                  style={
                    image2 === null ? styles.cameraIcon : styles.cameraIcon1
                  }
                  imageStyle={{borderRadius: image2 === null ? 0 : 18}}>
                  {image2 ? (
                    <Icon
                      type={'MaterialIcons'}
                      name={'delete'}
                      color={'red'}
                      size={HP('3')}
                      onPress={() => {
                        setImage2(null);
                        setImg2Params(null);
                      }}
                    />
                  ) : null}
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleGallery(3)}
                style={styles.cameraButton}>
                <ImageBackground
                  source={image3 === null ? appIcons.camera1 : {uri: image3}}
                  style={
                    image3 === null ? styles.cameraIcon : styles.cameraIcon1
                  }
                  imageStyle={{borderRadius: image3 === null ? 0 : 18}}>
                  {image3 ? (
                    <Icon
                      type={'MaterialIcons'}
                      name={'delete'}
                      color={'red'}
                      size={HP('3')}
                      onPress={() => {
                        setImage3(null);
                        setImg3Params(null);
                      }}
                    />
                  ) : null}
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => submitExperience()}
              style={{marginVertical: HP('3')}}>
              <ImageBackground
                source={appImages.btnBg}
                style={styles.sendButtonStyle}>
                <Text style={styles.sendBtnTxt}>Send</Text>
              </ImageBackground>
            </TouchableOpacity>

            <View style={styles.dividerView}>
              <Divider style={styles.dividerStyle} orientation="vertical" />
            </View>

            <Text style={styles.subHeading}>Previous Experiences</Text>
            {data.map(item => {
              return <UserCard item={item} />;
            })}
            {/* <FlatList
              data={[1, 2, 3]}
              renderItem={() => {
                return (
                  <UserCard
                    date={'Date'}
                    name={'Bandar'}
                    subtitle={'Text Here'}
                    imgs={true}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{width: width / 1.1}}
              keyExtractor={(item, index) => (item + index).toString()}
            /> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    height: height,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    width: width,
    minHeight: height,
    marginTop: HP('8'),
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.bg14,
  },
  circleImgStyle: {
    width: WP('33'),
    height: WP('33'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'android' ? WP('19') : WP('20'),
    height: Platform.OS === 'android' ? WP('12') : WP('11'),
  },
  userImgStyle: {
    width: WP('25'),
    height: WP('25'),
    borderRadius: WP('25'),
  },
  cameraButton: {
    borderWidth: 2,
    borderRadius: 20,
    margin: HP('0.2'),
    borderColor: colors.p1,
    backgroundColor: colors.b1,
  },
  cameraView: {
    flexDirection: 'row',
    marginTop: HP('0.75'),
  },
  cameraIcon: {
    width: WP('15'),
    height: WP('15'),
    marginVertical: HP('2.5'),
    marginHorizontal: HP('2.7'),
  },

  cameraIcon1: {
    width: WP('26'),
    height: WP('26'),
    borderRadius: 18,
    paddingTop: 3,
    paddingRight: 3,
    alignItems: 'flex-end',
  },
  dividerStyle: {
    borderWidth: 2,
    alignSelf: 'center',
    width: width / 1.03,
    borderColor: colors.p1,
  },
  searchView: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  searchBtn: {
    borderWidth: 2,
    width: WP('20'),
    height: WP('20'),
    borderRadius: 10,
    margin: HP('0.5'),
    padding: HP('1.5'),
    alignItems: 'center',
    borderColor: colors.p1,
    justifyContent: 'center',
  },
  seacrhIconStyle: {
    width: 30,
    height: 30,
  },
  heading: {
    marginTop: 5,
    color: colors.white,
    fontSize: size.large,
    paddingVertical: HP('0.5'),
    fontFamily: family.Poppins_Regular,
  },
  subHeading: {
    marginTop: 5,
    marginBottom: 10,
    color: colors.white,
    fontSize: size.small,
    paddingVertical: HP('0.5'),
    fontFamily: family.Poppins_Medium,
  },
  sendBtnTxt: {
    color: colors.white,
    textAlign: 'center',
    fontSize: size.small,
    paddingVertical: HP('0.5'),
    fontFamily: family.Poppins_Medium,
  },
});
