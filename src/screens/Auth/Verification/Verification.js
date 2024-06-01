import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Error } from '../../../components/Error'
import { useDispatch, } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  VerifyUser,
  ResendOtp,
  ConfirmResetPassOtp,
  _errorMsg,
} from '../../../redux/actions';

import {
  appImages,
  appLogos,
  size,
  family,
  colors,
  HP,
} from '../../../utilities';
import styles from './styles';

const Verification = ({ route, navigation }) => {

  const [otpCode, setotpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');

  const dispatch = useDispatch();

  const handleLogin = () => {
    setIsLoading(true);

    const data = {
      emailOrPhone: route && route.params && route.params.emailOrPhone && route.params.emailOrPhone.toString(),
      otp: otpCode
    };
    const cbSuccess = async (response, message) => {
      if (route.params && route.params.comeFrom && route.params.comeFrom == "ForgetPassword") {
        navigation.replace('ResetPassword', { resetPasswordId: response.Response, emailOrPhone: route.params.emailOrPhone });
      } else {
        await AsyncStorage.setItem('Login', 'true');
        navigation.replace('App');

      }
      setIsLoading(false);
    };
    //When api is not successfull
    const cbFailure = message => {
      seterrorMessage(message)

      setTimeout(() => {
        seterrorMessage('')
      }, 3000);
      setIsLoading(false);
    };
    if (otpCode == '') {
      setIsLoading(false);
      seterrorMessage('Please Fill OTP First')
    } else {
      if (route.params && route.params.comeFrom && route.params.comeFrom == "ForgetPassword") {
        dispatch(ConfirmResetPassOtp(data, cbSuccess, cbFailure))
      } else {
        dispatch(VerifyUser(data, cbSuccess, cbFailure))
      }
    }

  };
  const handleResendCode = () => {
    setIsLoading(true);
    const data = {
      "mobile": route.params && route.params.emailOrPhone && route.params.emailOrPhone.toString(),
      "resetPassword": true
    }
    const cbSuccess = async (response, message) => {
      setIsLoading(false);
    };

    //When api is not successfull
    const cbFailure = message => {
      alert(message);
      // setIsLoading(false);
      setIsLoading(false);
    };
    dispatch(ResendOtp(data, cbSuccess, cbFailure))

  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.mainContainer} source={appImages.splashBg}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
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
            duration={700}
            easing="linear"
            animation="fadeInUpBig"
            useNativeDriver={true}
            style={styles.outerView}>
            <View style={styles.innerView}>
              <View style={{ height: HP('2') }} />
              <View style={styles.rowContainer}>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ width: "100%", alignItems: "flex-end" }}
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signupTxtStyle}>Verify OTP</Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: HP('4') }} />
              <View style={{ width: "100%", paddingHorizontal: "15%", justifyContent: "center" }}>
                <Text style={{ color: colors.g9, fontSize: size.normal, fontFamily: family.Poppins_Regular, }}>a  4 Digit OTP sent to your mobile</Text>
                <View style={{ flexDirection: "row", }}>
                  <Text style={{ color: colors.g9, fontSize: size.normal, fontFamily: family.Poppins_Regular, }}>Mobile Number ? </Text>
                  <TouchableOpacity onPress={() => navigation.replace('ForgetPassword')}>
                    <Text style={{ color: colors.p1, fontSize: size.normal, fontFamily: family.Poppins_Regular, }}>(Change)</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <OTPInputView
                style={{ width: '60%', marginHorizontal: '20%', height: 100, color: "black" }}
                pinCount={4}
                code={otpCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={code => { setotpCode(code) }}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code => {
                })}
              />
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  onPress={() => handleResendCode()}
                  style={styles.passRowContainer}>

                  <Text style={styles.passTxtStyle}>Didn't Recieve the code ? Resend</Text>
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
                  <Text style={styles.buttonTxtStyle}>Verify OTP</Text>
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

export default Verification;
