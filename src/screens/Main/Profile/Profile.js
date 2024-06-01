// MAIN LIABRARIES
import React, {
  useEffect,
  useState
} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';

// SEMI LIABRARIES
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import Rate, { AndroidMarket } from 'react-native-rate'

// COMPONENTS
import { AppLoading, } from '../../../components/appLoading';
import { getProfileRequest, getSettingsRequest } from '../../../redux/actions';
import { appImages, appIcons, appLogos } from '../../../utilities';
import styles from './styles';


let token;

const Profile = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setprofile] = useState('');
  const [privacyPolicy, setprivacyPolicy] = useState('');
  const [termsAndConditions, setTermsAndConditions] = useState('');
  const [userName, setuserName] = useState('');

  // HOOKS
  const dispatch = useDispatch();

  const { userData } = useSelector(state => state.login);
  const { getProfile } = useSelector(state => state.base);

  useEffect(() => {
    getprofileData()
    getSettings()
  }, [])
  useEffect(() => {
    if (getProfile.length > 0) {
      if (getProfile[0].UserProfileImagePath !== null) {
        setprofile(getProfile[0].UserProfileImagePath)
      }
      setuserName(getProfile[0].FullName)
    }
  }, [getProfile])
  // HOOKS

  // FUNCTIONS
  const handleLogout = async () => {
    await AsyncStorage.setItem('Login', 'false');
    navigation.navigate('Auth');
  };

  const takeTo = (screen_name, token) => {
    navigation.navigate(screen_name, { token: token && token });
  };

  const getSettings = () => {
    setIsLoading(true);
    const cbSuccess = async data => {
      const privacyData = data.filter(data => data.Key == 'PrivacyPolicy');
      const TermsAndConditionsData = data.filter(data => data.Key == 'Terms&Conditions');
      // console.log(result, 'resultresultresultresultresultresultresultresultresultresultresultresult', TermsAndConditionsData)
      setprivacyPolicy(privacyData)
      setTermsAndConditions(TermsAndConditionsData)
      setIsLoading(false);
    };
    const cbFailure = message => {
      console.log(message, 'fail')
      setIsLoading(false);
    };
    dispatch(getSettingsRequest(cbSuccess, cbFailure,))
  }
  const getprofileData = () => {
    token = userData && userData.Token
    setIsLoading(true);
    const cbSuccess = async data => {
      if (data.length > 0) {
        if (data[0].UserProfileImagePath !== null) {
          setprofile(data[0].UserProfileImagePath)
        }
        setuserName(data[0].FullName)
      }
      setIsLoading(false);
    };
    const cbFailure = message => {
      // alert(message + '++++');
      setIsLoading(false);
    };
    dispatch(getProfileRequest(cbSuccess, cbFailure, token))
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.mainContainer} source={appImages.splashBg}>
        {isLoading && <AppLoading />}
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.rowDirection}>
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
              <View style={[styles.w_45, styles.center]}>
                <Text style={[styles.mainHeading, styles.colorWhite]}>
                  My Account
                </Text>
              </View>
            </View>
            <View
              style={{
                ...styles.rowDirection,
                marginVertical: 15,
              }}>
              {profile !== '' &&
                <View style={{
                  width: 110,
                  height: 110,
                  left: -5,
                  top: -5,
                  borderRadius: 55, position: "absolute",
                }}  >
                  <Animatable.Image
                    easing="linear"
                    duration={3000}
                    animation="rotate"
                    useNativeDriver={true}
                    iterationCount="infinite"
                    source={appImages.circle}
                    style={{ height: '100%', width: '100%' }}
                    resizeMode="cover"
                  />
                </View>
              }
              <Image
                source={profile !== "" ? { uri: profile + '?random_number=' + new Date().getTime() } : appIcons.profile}
                style={[profile !== '' ? styles.profileImage : styles.defaultuserIcon]} />
              <View
                style={{
                  ...styles.columnDirection,
                  marginTop: 15,
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={[
                    styles.subHeading,
                    styles.colorWhite,
                    { paddingLeft: 8 },
                  ]}>
                  {userName}
                </Text>
                <TouchableOpacity
                  style={styles.positionRelative}
                  onPress={() => {
                    takeTo('PersonalProfile', token);
                  }}>
                  <Image
                    style={styles.profileViewBtn}
                    source={appImages.profileBorderBg}
                    resizeMode={'contain'}
                  />
                  <Text
                    style={[
                      styles.subHeading,
                      styles.colorWhite,
                      styles.profileBtnTxt,
                    ]}>
                    Personal Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.profileLinks}
              onPress={() => {
                takeTo('RegisterCompany', userData&&userData.IsCompany ? 'My Company' : "Register My Company");
              }}>
              <Image
                source={appImages.registerMyCompany}
                style={styles.icon}
              />
              <Text style={[styles.colorWhite, styles.linkFont]}>
                {'  '}
                {userData&&userData.IsCompany ? 'My Company' : "Register My Company"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                takeTo('IWasHere');
              }}
              style={styles.profileLinks}>
              <Image
                source={appImages.wasHere}
                style={styles.icon}
              />
              <Text style={[styles.colorWhite, styles.linkFont]}>
                {'  '}I Was Here
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileLinks}>
              <Image
                source={appImages.myTickets}
                style={styles.icon}
              />
              <Text style={[styles.colorWhite, styles.linkFont]}>
                {'  '}
                My Tickets
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileLinks}
              onPress={() => {
                takeTo('ContactUs');
              }}>
              <Image
                source={appImages.contactUs}
                style={styles.icon}
              />
              <Text style={[styles.colorWhite, styles.linkFont]}>
                {'  '}
                Contact Us
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileLinks}
              onPress={() => {
                takeTo('PrivacyPolicy', privacyPolicy[0]);
              }}>
              <Image
                source={appImages.privacyPolicy}
                style={styles.icon}
              />
              <Text style={[styles.colorWhite, styles.linkFont]}>
                {'  '}
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileLinks}
              onPress={() => {
                takeTo('TermsAndConditions', termsAndConditions[0]);
              }}>
              <Image
                source={appImages.Terms}
                style={styles.icon}
              />
              <Text style={[styles.colorWhite, styles.linkFont]}>
                {'  '}
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileLinks}
              onPress={() => {
                const options = {
                  // AppleAppID: "2193813192",
                  GooglePackageName: "com.abc.wehere",
                  // AmazonPackageName: "com.mywebsite.myapp",
                  OtherAndroidURL: "https://play.google.com/store/apps/details?id=com.abc.wehere",
                  preferredAndroidMarket: AndroidMarket.Google,
                  preferInApp: false,
                  openAppStoreIfInAppFails: true,
                  fallbackPlatformURL: "https://play.google.com/store/apps/details?id=com.abc.wehere",
                }
                Rate.rate(options, (success, errorMessage) => {
                  if (success) {
                    console.error(`this: ${success}`)
                  }
                  if (errorMessage) {
                    console.error(`Example page Rate.rate() error: ${errorMessage}`)
                  }
                })
              }
              } >
              <Image
                source={appImages.Rate}
                style={styles.icon}
              />
              <Text style={[styles.colorWhite, styles.linkFont]}>
                {'  '}
                Rate The App
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileLinks}>
              <Image
                source={appImages.ChangeLang}
                style={styles.icon}
              />
              <Text style={[styles.colorWhite, styles.linkFont]}>
                {'  '}
                Change Language
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileLinks}
              onPress={handleLogout}>
              <Image
                source={appImages.Logout}
                style={styles.icon}
              />
              <Text style={[styles.colorWhite, styles.linkFont]}>
                {'  '}
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView >
  );
};
export default Profile;
