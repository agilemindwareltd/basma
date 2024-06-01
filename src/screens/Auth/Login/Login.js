import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import { Error } from '../../../components/Error'
import { colors, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { AppInput } from '../../../components';
import {
  appIcons,
  appImages,
  appLogos,
  HP,
  WP,
  loginValidation,
} from '../../../utilities';
import styles from './styles';
import style from '../../styles';

// social auth
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings, LoginManager, Profile } from 'react-native-fbsdk-next';

// redux stuff
import { useDispatch } from 'react-redux';
import { loginRequest, getCountry, socialLogin } from '../../../redux/actions';

Settings.setAppID('581248022959738');

GoogleSignin.configure({
  webClientId:
    '167420106748-ick1a9a7i156lsq2p0k61q98vvninntl.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [country, setcountry] = useState([]);
  const [errorMessage, seterrorMessage] = useState('');
  const [countryCode, setcountryCode] = useState('962');
  const [countryId, setcountryId] = useState('2');

  // redux stuff
  const dispatch = useDispatch();


  useEffect(() => {
    const cbSuccess = async (response, message) => {
      setcountry(response.Response)
    };
    const cbFailure = message => {
      seterrorMessage(message)
    };
    dispatch(getCountry({}, cbSuccess, cbFailure))
  }, [])

  const googleSignIn = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();



      //When api is successfull
      const cbSuccess = async message => {
        await AsyncStorage.setItem('Login', 'true');
        setIsLoading(false);
        navigation.replace('App');
      };
      //When api is not successfull
      const cbFailure = message => {
        seterrorMessage(message)

        setIsLoading(false);
      };
      dispatch(socialLogin({ socialId: userInfo.user.id }, cbSuccess, cbFailure))
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
              const cbSuccess = async message => {
                await AsyncStorage.setItem('Login', 'true');
                setIsLoading(false);
                navigation.replace('App');
              };
              //When api is not successfull
              const cbFailure = message => {
                seterrorMessage(message)
                setIsLoading(false);
              };
              dispatch(socialLogin({ socialId: currentProfile.userID }, cbSuccess, cbFailure))
            }
          });
        }
      },
      function (error) {
      },
    );
  };

  const handleLogin = () => {
    // const token = DeviceInfo.getDeviceToken();
    const isValid = loginValidation(email, pass);
    if (isValid.success) {
      setIsLoading(true);
      const data = {
        emailOrPhone: '00' + countryCode + email,
        // emailOrPhone: email,
        password: pass,
      };

      //When api is successfull
      const cbSuccess = async message => {
        await AsyncStorage.setItem('Login', 'true');
        setIsLoading(false);
        navigation.replace('App');
      };
      //When api is not successfull
      const cbFailure = message => {
        seterrorMessage(message)

        setIsLoading(false);
      };
      dispatch(loginRequest(data, cbSuccess, cbFailure))
    } else {
      seterrorMessage(isValid.message)
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
          <View style={{ flex: 1 }}>
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
          </View>
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
          <Animatable.View
            duration={700}
            easing="linear"
            animation="fadeInUpBig"
            useNativeDriver={true}
            style={styles.outerView}>
            <View style={styles.innerView}>
              <View style={{ height: HP('2') }} />
              <View style={styles.rowContainer}>
                <Text style={styles.loginTxtStyle}>Login</Text>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  activeOpacity={0.7}
                  onPress={() => navigation.replace('SignUp')}>
                  <Text style={styles.signupTxtStyle}>New User ?  </Text>
                  <Text style={[styles.signupTxtStyle, { textDecorationLine: "underline", fontWeight: 'bold', color: "#CE157F" }]}>Signup</Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: HP('4') }} />
              <AppInput
                value={email}
                placeholder={'Phone Number'}
                keyboardType={'number-pad'}
                onChangeText={txt => setEmail(txt)}
                _func={() => setModalVisible(!modalVisible)}
                countCode={true}
                countCodeValue={countryCode}
                isIcon={true}
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
              <View style={{ height: HP('2') }} />
              <View style={styles.rowContainer}>
                <View style={styles.passRowContainer}>
                  <Icon
                    type={'MaterialIcons'}
                    name={
                      selected ? 'radio-button-checked' : 'radio-button-off'
                    }
                    color={'#fff'}
                    size={HP('2.5')}
                    style={{ marginRight: WP('2') }}
                    onPress={() => {
                      setSelected(!selected);
                    }}
                  />
                  <Text style={styles.passTxtStyle}>Save Password</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.push('ForgetPassword')}>
                  <Text style={styles.forgotTxtStyle}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: HP('2') }} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={() => handleLogin()}>
                {isLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.buttonTxtStyle}>Login Now</Text>
                )}
              </TouchableOpacity>
            </View>
          </Animatable.View>
          {errorMessage !== '' &&
            <Error errorMsg={errorMessage} disableError={() => seterrorMessage('')} />
          }
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

export default Login;
