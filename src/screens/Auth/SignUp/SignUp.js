import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import AntDesign from "react-native-vector-icons/AntDesign"
import { useDispatch, } from 'react-redux';
import { Error } from '../../../components/Error'
import { colors, } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  Settings,
  LoginManager,
  Profile
} from 'react-native-fbsdk-next';

import {
  appIcons,
  appImages,
  appLogos,
  HP,
  WP,
  signUpValdation,
} from '../../../utilities';
import styles from './styles';
import { AppInput } from '../../../components';
import {
  getCountry,
  _errorMsg,
  signUpAction
} from '../../../redux/actions';

Settings.setAppID('581248022959738');
GoogleSignin.configure({
  webClientId:
    '167420106748-ick1a9a7i156lsq2p0k61q98vvninntl.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});
// redux stuff

const SignUp = ({ navigation }) => {
  const [fullName, setfullName] = useState('');

  const [phoneNumber, setphoneNumber] = useState('');

  const [pass, setPass] = useState('');

  const [country, setcountry] = useState([]);

  const [countryCode, setcountryCode] = useState('962');

  const [errorMessage, seterrorMessage] = useState('');

  const [countryId, setcountryId] = useState('2');

  const [modalVisible, setModalVisible] = useState(false);

  const [confirmPass, setconfirmPass] = useState('');

  const [check, setcheck] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch();

  useEffect(() => {
    const cbSuccess = async (response, message) => {
      setcountry(response.Response)
    };
    const cbFailure = message => {
      alert(message);
    };
    dispatch(getCountry({}, cbSuccess, cbFailure))
  }, [])


  const googleSignIn = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      let userInfo = await GoogleSignin.signIn();
      userInfo.socialAuth = 'googleSignIn'
      navigation.navigate('AddPhoneForSocial', userInfo);

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  const facebookLogin = () => {

    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
        } else {
          const currentProfile = Profile.getCurrentProfile().then(function (
            currentProfile,
          ) {
            if (currentProfile) {
        console.log(currentProfile,'currentProfilecurrentProfile')

              let userInfo = {
                user: {
                  id: currentProfile.userID,
                  name: currentProfile.name,
                }
              };
              userInfo.socialAuth = 'facebookLogin'
              navigation.navigate('AddPhoneForSocial', userInfo);
            }
          });
        }
      },
      function (error) {
        console.log(error,'errorerrorerror')
      },
    );
  };


  const handleLogin = () => {
    const isValid = signUpValdation(fullName, phoneNumber, pass, confirmPass);

    if (check) {
      if (isValid.success) {
        setIsLoading(true);
        const data = {
          // email: "",
          fullName: fullName,
          mobile: '00' + countryCode + phoneNumber,
          password: pass,
          confirmedPassword: confirmPass,
          countryId: countryId,
          googleSocialId: '',
          facebookSocialId: '',
        };
        //When api is successfull
        const cbSuccess = async message => {
          setIsLoading(false);
          navigation.navigate('Verification', { emailOrPhone: data.mobile });
        };
        //When api is not successfull
        const cbFailure = message => {
          seterrorMessage(message)
          setTimeout(() => {
            seterrorMessage('')
          }, 3000);

          setIsLoading(false);
        };
        dispatch(signUpAction(data, cbSuccess, cbFailure))
      } else {
        seterrorMessage(isValid.message)
        setTimeout(() => {
          seterrorMessage('')
        }, 3000);
      }
    } else {
      seterrorMessage("You must agree to the terms and conditions to use the application")
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.mainContainer} source={appImages.splashBg}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
              style={styles.centeredView}>
              <View style={styles.modalView}>
                <FlatList
                  data={country}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(false)
                          setcountryCode(item.CountryPhoneCode)
                          setcountryId(item.Id)
                        }}
                        style={styles.modalItem}>
                        <Text style={styles.modalText}>
                          {item.Name}
                        </Text>
                        <Text style={[styles.modalText, { color: '#1D7191' }]}>
                          {item.CountryPhoneCode}
                        </Text>
                      </TouchableOpacity>
                    )
                  }}
                  keyExtractor={item => item.id}
                />
              </View>
            </TouchableOpacity>
          </Modal>
          <View style={{ flex: 1, }}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.pop()}>
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
          </View>

          <Animatable.View
            duration={1200}
            animation="fadeInUpBig"
            useNativeDriver={true}
            style={{
              flex: Platform.OS === 'android' ? 0.8 : 0.1,
            }}
          >
            <View style={styles.iconsContainer}>
              <Text style={styles.txtStyle}>You can Login with</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{
                  width: WP('13'),
                  height: WP('13'),
                  marginRight: 5,
                  borderRadius: WP('8')
                }}>
                  <Image style={{ height: "100%", width: "100%", position: "absolute", zIndex: 0 }} source={appIcons.google}></Image>
                  <TouchableOpacity onPress={facebookLogin}>
                    <Animatable.Image
                      easing="linear"
                      duration={3000}
                      animation="rotate"
                      resizeMode="contain"
                      useNativeDriver={true}
                      iterationCount="infinite"
                      source={appIcons.fbBoder}
                      style={styles.iconStyle}
                    >
                    </Animatable.Image>
                  </TouchableOpacity>
                </View>
                <View style={{
                  width: WP('13'),
                  height: WP('13'),
                  marginLeft: 5,
                  borderRadius: WP('8')
                }}>
                  <Image style={{ height: "100%", width: "100%", position: "absolute", zIndex: 0 }} source={appIcons.fb}></Image>
                  <TouchableOpacity onPress={googleSignIn}>
                    <Animatable.Image
                      easing="linear"
                      duration={3000}
                      animation="rotate"
                      resizeMode="contain"
                      useNativeDriver={true}
                      iterationCount="infinite"
                      source={appIcons.fbBoder}
                      style={styles.iconStyle}
                    >
                    </Animatable.Image>
                  </TouchableOpacity >
                </View>
              </View>
            </View>
            < View
              style={[styles.outerView,]}>
              <View style={styles.innerView}>
                <View style={{ height: HP('2') }} />
                <View style={styles.rowContainer}>
                  <Text style={styles.loginTxtStyle}>Sign Up</Text>
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    activeOpacity={0.7}
                    onPress={() => navigation.replace('Login')}>
                    <Text style={styles.signupTxtStyle}>Has Account ? </Text>
                    <Text style={[styles.signupTxtStyle, { textDecorationLine: "underline", fontWeight: 'bold', color: "#CE157F" }]}>Login</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ height: HP('4') }} />
                <AppInput
                  value={fullName}
                  placeholder={'Full Name'}
                  onChangeText={txt => setfullName(txt)}
                  isIcon={true}
                  secureTextEntry={false}
                />
                <View style={{ height: HP('3') }} />
                <AppInput
                  value={phoneNumber}
                  placeholder={'Phone Number'}
                  keyboardType={'default'}
                  onChangeText={txt => setphoneNumber(txt)}
                  keyboardType={'number-pad'}
                  _func={() => setModalVisible(!modalVisible)}
                  countCode={true}
                  countCodeValue={countryCode}
                  isIcon={true}
                // isIcon1={true}
                />
                <View style={{ height: HP('3') }} />
                <AppInput
                  value={pass}
                  placeholder={'Password'}
                  keyboardType={'default'}
                  onChangeText={txt => setPass(txt)}
                  secureTextEntry
                  isIcon={true}
                  isIcon1={true}
                />
                <View style={{ height: HP('3') }} />
                <AppInput
                  value={confirmPass}
                  placeholder={'Confirm confirmPass'}
                  keyboardType={'default'}
                  onChangeText={txt => setconfirmPass(txt)}
                  secureTextEntry
                  isIcon={true}
                  isIcon1={true}
                />
                <View style={{ height: HP('2') }} />
                <View style={styles.rowContainer}>
                  <TouchableOpacity
                    onPress={() => setcheck(!check)}
                    style={styles.passRowContainer}>
                    <View style={styles.checkBox}>
                      {check &&
                        <AntDesign name='check' size={15} color={'black'} />
                      }
                    </View>
                    <Text style={styles.passTxtStyle}>I Agree on Terms & Conditions</Text>
                  </TouchableOpacity>
                </View>
                {/* for error showing */}
                <View style={{ height: HP('2') }} />
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.buttonStyle}
                  onPress={() => handleLogin()}>
                  {isLoading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Text style={styles.buttonTxtStyle}>Sign Up Now</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ View>
          </Animatable.View>
          {errorMessage !== '' &&
            <Error errorMsg={errorMessage} disableError={() => seterrorMessage('')} />
          }
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View >
  );
};

export default SignUp;
