import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { launchImageLibrary } from 'react-native-image-picker';
import { Error } from '../../../components/Error'
import { Icon } from 'react-native-elements';
import { getRatingRequest, _errorMsg, updateProfileRequest } from '../../../redux/actions';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';
import {
  appIcons,
  appImages,
  appLogos,
  HP,
  WP,
} from '../../../utilities';
import { AppLoading, } from '../../../components/appLoading';

const PersonalProfile = ({ navigation, route }) => {

  const [isOpenCalendar, setisOpenCalendar] = useState(false);

  const [profile, setprofile] = useState("");

  const [userName, setuserName] = useState('');

  const [dob, setdob] = useState('');

  const [gender, setgender] = useState(1);

  const [email, setemail] = useState('');

  const [post, setpost] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [allReviews, setallReviews] = useState('');

  const [followers, setfollowers] = useState('');

  const [following, setfollowing] = useState('');

  const [rating, setrating] = useState(0);

  const [privacyId, setprivacyId] = useState('');

  const [favorites, setfavorites] = useState('');

  const [noOfReviews, setnoOfReviews] = useState(0);

  const [date, setDate] = useState(new Date(Date.now()));

  const [mode, setMode] = useState('date');

  const [show, setShow] = useState(false);

  const { getProfile } = useSelector(state => state.base);
  const { errorMsg } = useSelector(state => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    socialData()
  }, [])
  const socialData = () => {
    setIsLoading(true)
    if (getProfile.length > 0) {
      let dob = moment(getProfile[0]?.BirthDate && getProfile[0]?.BirthDate).format('ll')
      if (getProfile[0]?.UserProfileImagePath !== null) {
        setprofile(getProfile[0]?.UserProfileImagePath)
      }
      setuserName(getProfile[0]?.FullName)
      if (dob !== "Invalid date") {
        const d = new Date(dob);
        let time = d.getTime();
        setdob(dob)
      }
      setemail(getProfile[0]?.Email)
      setpost(getProfile[0]?.NumberOfPosts)
      setgender(getProfile[0]?.Gender)
      setprivacyId(getProfile[0]?.ProfilePrivacyId)
      setfollowers(getProfile[0]?.NumberOfFollowers)
      setfollowing(getProfile[0]?.NumberOfFollowing)
      setfavorites(getProfile[0]?.NumberOfFavorites)
    }

    const cbSuccess = async message => {
      setnoOfReviews(message.length)
      setallReviews(message)
      setIsLoading(false)
      avgRating(message)
    };
    const cbFailure = message => {
      setIsLoading(false);
      dispatch(_errorMsg({ errorMsg: message }))
      setTimeout(() => {
        dispatch(_errorMsg({ errorMsg: '', }))
      }, 3000);
    };
    dispatch(getRatingRequest(getProfile[0]?.Id, route?.params?.token, cbSuccess, cbFailure,),
    );
  }

  const avgRating = (message) => {
    let rate = 0
    let totalRating = 0
    if (message.length > 0) {

      message.map((value,) => {
        let sumOfrate = rate + value.Rate && value.Rate
        rate = sumOfrate
        totalRating = sumOfrate

      })
      totalRating = totalRating / message.length
      totalRating = totalRating.toFixed(1)
      setrating(totalRating)
    } else {
      setrating(0)

    }

  }
  const takeTo = (screen, data) => navigation.navigate(screen, { data, allReviews });

  const getImg = async () => {
    try {
      let options = {
        title: 'Select Image',
        includeBase64: true,
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option'
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, async (res) => {
        if (res.assets) {
          setprofile(res.assets[0])
        }
      });
    } catch (err) {
      throw err;

    }
  }

  const handleUpdateProfile = (email, userName, gender, dob, profile, privacyId) => {
    setIsLoading(true)
    let data = new FormData();
    if (typeof profile == 'object') {
      data.append('ProfileImage_ImagePath', {
        uri: profile.uri,
        name: 'image.jpg',
        type: profile.type,
      });
    }
    if (email) {
      data.append('Email', email);
    }
    if (userName) {
      data.append('FullName', userName);
    }
    if (gender) {
      data.append('Gender', gender == 'Male' ? "2" : "1");
    }
    if (dob) {
      data.append('BirthDate', dob);
    }
    if (privacyId) {
      data.append('ProfilePrivacyId', privacyId.toString());
    }
    // if (GoogleSocialId) {
    //   data.append('GoogleSocialId ', GoogleSocialId);
    // }
    // if (FacebookSocialId) {
    //   data.append('FacebookSocialId ', FacebookSocialId);
    // }
    const cbSuccess = async data => {
      takeTo('Profile')
    };

    const cbFailure = message => {
      setIsLoading(false);
      dispatch(_errorMsg({ errorMsg: Object.values(message.errors)[0] }))
      setTimeout(() => {
        dispatch(_errorMsg({ errorMsg: '', }))
      }, 3000);
    };
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      dispatch(_errorMsg({ errorMsg: 'Email is Not Correct' }))
      setTimeout(() => {
        dispatch(_errorMsg({ errorMsg: '', }))
      }, 3000);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      dispatch(updateProfileRequest(cbSuccess, cbFailure, data, route?.params?.token))
    }
  }

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setisOpenCalendar(false)
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setdob(convert(currentDate));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.mainContainer} source={appImages.splashBg}>
        {isLoading && <AppLoading />}

        {isOpenCalendar &&
          <DateTimePicker
            value={date}
            mode={mode}
            display='default'
            themeVariant="dark"
            dateFormat="shortdate"
            maximumDate={new Date(Date.now())}
            onChange={onChange}
          />
        }
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.rowDirection}>
              <TouchableOpacity onPress={() => navigation.pop()} activeOpacity={0.8}>
                <Animatable.Image
                  easing="linear"
                  duration={5000}
                  animation="rotate"
                  resizeMode="contain"
                  useNativeDriver={true}
                  iterationCount="infinite"
                  source={appLogos.appLogo}
                  style={styles.imageStyles}
                />
              </TouchableOpacity>
              <View style={[styles.center, { marginLeft: HP('2%') }]}>
                <Text style={[styles.mainHeading, styles.colorWhite]}>
                  {' '}
                  Personal Profile
                </Text>
              </View>
            </View>
            <View style={[styles.rowDirection, styles.center, { marginTop: 15 }]}>
              <View style={{ height: 135, width: 135, borderRadius: 72.5, position: 'absolute', }}>
                {profile ?
                  <Animatable.Image
                    easing="linear"
                    duration={3000}
                    animation="rotate"
                    useNativeDriver={true}
                    iterationCount="infinite"
                    source={appImages.circle}
                    style={{ height: '100%', width: '100%' }}
                    resizeMode="cover"
                  /> : null
                }
              </View>
              <Image
                source={profile ? { uri: profile.uri ? profile.uri : profile + '?random_number=' + new Date().getTime() } : appIcons.profile}
                style={{ height: 120, width: 120, borderRadius: 60 }}
                resizeMode="cover" />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => getImg()}
                style={[styles.positionAbsolute, styles.center, styles.cameraIconProfileScreen]}>
                <Image
                  source={appImages.camera}
                  style={{ height: '60%', width: '60%' }} resizeMode="contain" />
              </TouchableOpacity>
              {/* <View
                style={[
                  styles.positionAbsolute,
                  { bottom: -15, right: WP('24%') },
                ]}>
                <Image source={appImages.badge} />
              </View> */}
            </View>
            <TouchableOpacity
              style={[styles.rowDirection, styles.center,]}
              onPress={() => { takeTo('Ratings', { rating, noOfReviews, userName }) }}>
              <Image source={appIcons.star} resizeMode={'contain'} style={[styles.iconStar]} />
              <Text
                style={[styles.subHeading, styles.colorWhite,]}>
                {'  '}({rating}) {noOfReviews} Reviews
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.textInputProfile}
              value={userName}
              onChangeText={(text) => setuserName(text)}
              placeholder="Name"
              placeholderTextColor={'#fff'}
            />
            <TouchableOpacity
              onPress={() => setisOpenCalendar(true)}
              style={styles.textInputProfile}
            >
              <Text style={{ color: 'white' }}>{dob ? convert(dob) : 'Birth Date'}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.textInputProfile}
              value={email}
              onChangeText={(text) => setemail(text)}
              placeholder="Email"
              placeholderTextColor={'#fff'}
            />
            <View style={[styles.rowDirection, styles.center, { marginTop: 15 }]}>
              <Image
                source={gender == 2 ? appIcons.maleicon : appIcons.gender} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setgender(2)
                }}
                style={[styles.rowDirection, styles.center, { left: 15 }]}>
                <Icon
                  type={'MaterialIcons'}
                  name={gender == 2 ? 'radio-button-checked' : 'radio-button-off'}
                  color={'#fff'}
                  size={HP('2.5')}
                  style={{ marginRight: WP('2') }}
                />
                <Text style={styles.passTxtStyle}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setgender(1)
                }}
                style={[styles.rowDirection, styles.center, { left: 30 }]}>
                <Icon
                  type={'MaterialIcons'}
                  name={gender == 1 ? 'radio-button-checked' : 'radio-button-off'}
                  color={'#fff'}
                  size={HP('2.5')}
                  style={{ marginRight: WP('2') }}
                />
                <Text style={styles.passTxtStyle}>Female</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.rowDirection, styles.center]}>
              <TouchableOpacity
                style={styles.positionRelative}
                onPress={() => handleUpdateProfile(email && email.toLowerCase(), userName, gender == 2 ? 'Male' : 'Female', dob, profile, privacyId)}>
                <Image
                  style={[styles.profileViewBtn, { width: WP('30%') }]}
                  source={appImages.profileBorderBg}
                  resizeMode={'contain'}
                />
                <Text
                  style={[
                    styles.subHeading,
                    styles.colorWhite,
                    styles.profileBtnTxt,
                  ]}>
                  SAVE
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.rowDirection,
                { justifyContent: "space-around" },
                { marginTop: 20 },
              ]}>
              <View style={[styles.verticalBoxes]}>
                <Text style={[styles.subHeading, styles.colorWhite, { left: 10, bottom: 15 }]}>
                  Events
                </Text>
                <Image
                  source={appImages.PlusNeon}
                  style={[styles.positionAbsolute, { top: -20, right: -0 }]}
                />
              </View>
              <View style={[styles.verticalBoxes]}>
                <Text style={[styles.subHeading, styles.colorWhite, { left: 10, bottom: 15 }]}>
                  Lives
                </Text>
                <Image
                  source={appImages.PlusNeon}
                  style={[styles.positionAbsolute, { top: -20, right: -0 }]}
                />
              </View>
            </View>
            <View
              style={[
                styles.rowDirection,
                styles.spaceBetween,
                { marginTop: 15 },
              ]}>
              <Text
                style={[
                  styles.profileInfoText,
                  styles.colorWhite,
                ]}>
                POSTS
              </Text>
              <Text
                style={[
                  styles.profileInfoText,
                  styles.colorWhite,
                ]}>
                FOLLOWERS
              </Text>
              <Text
                style={[
                  styles.profileInfoText,
                  styles.colorWhite,
                ]}>
                FOLLOWING
              </Text>
              <Text
                style={[
                  styles.profileInfoText,
                  styles.colorWhite,
                ]}>
                FAVORITES
              </Text>
            </View>
            <View style={[styles.rowDirection, styles.spaceBetween]}>
              <Text
                style={[
                  styles.subHeading,
                  styles.colorWhite,
                  {
                    width: WP('12%'),
                    textAlign: 'center',
                    borderRightWidth: 0.6,
                    borderColor: '#fff',
                    fontWeight: 'bold',
                  },
                ]}>
                {post}
              </Text>
              <Text
                style={[
                  styles.subHeading,
                  styles.colorWhite,
                  styles.followUpInfoTxt,
                ]}>
                {followers}
              </Text>
              <Text
                style={[
                  styles.subHeading,
                  styles.colorWhite,
                  styles.followUpInfoTxt,
                ]}>
                {following}
              </Text>
              <Text
                style={[
                  styles.subHeading,
                  styles.colorWhite,
                  styles.followUpInfoTxtNoBorder,
                ]}>
                {favorites}
              </Text>
            </View>
          </View>
        </ScrollView>
        {errorMsg !== '' && <Error errorMsg={errorMsg} disableError={() => dispatch(_errorMsg({ errorMsg: '', }))} />}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PersonalProfile;
