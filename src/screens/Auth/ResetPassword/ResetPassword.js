



import React, { useState, } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity, AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import { colors, } from 'react-native-elements';
import { useDispatch, } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Error } from '../../../components/Error'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { AppInput } from '../../../components';
import { newPassword, loginRequest } from '../../../redux/actions';
import {
  appImages,
  appLogos,
  size,
  family,
  HP,
} from '../../../utilities';
import styles from './styles';

const ResetPassword = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = () => {
    setIsLoading(true);
    const data = {
      emailOrPhone: route.params.emailOrPhone && route.params.emailOrPhone,
      "password": password.toString(),
      "confirmedPassword": confirmPassword.toString(),
      "resetPasswordId": route && route.params && route.params.resetPasswordId
    }
    const cbSuccess2 = async (response, message) => {
       await AsyncStorage.setItem('Login', 'true');
        setIsLoading(false);
        navigation.replace('App');
    };
    const cbSuccess = async (response, message) => {
      // await AsyncStorage.setItem('Login', 'true');
      // navigation.replace('App');
      dispatch(loginRequest({
        emailOrPhone: route.params.emailOrPhone,
        password: password.toString(),
      }, cbSuccess2, cbFailure))

      setIsLoading(false);
    };
    //When api is not successfull
    const cbFailure = message => {
      seterrorMessage(message[0])
      setTimeout(() => {
        seterrorMessage('')
      }, 3000);
      setIsLoading(false);
    };

    dispatch(newPassword(data, cbSuccess, cbFailure))

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
              <View style={{ height: HP('3') }} />
              <View style={{ width: "100%", paddingHorizontal: "10%", justifyContent: "center" }}>
                <Text style={{ color: colors.g9, fontSize: size.h6, left: 20, fontFamily: family.Poppins_Regular, }}>Reset Password ? </Text>
              </View>
              <View style={{ height: HP('3') }} />
              <AppInput
                placeholder={'Password'}
                keyboardType={'default'}
                value={password}
                onChangeText={(text) => setpassword(text)}
                secureTextEntry
                isIcon={true}
                isIcon1={true}
              />
              <View style={{ height: HP('2') }} />
              <AppInput
                placeholder={'Confirm Password'}
                value={confirmPassword}
                onChangeText={(text) => setconfirmPassword(text)}
                keyboardType={'default'}
                secureTextEntry
                isIcon={true}
                isIcon1={true}
              />

              <View style={{ height: HP('2') }} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={() => handleLogin()}>
                {isLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.buttonTxtStyle}>Reset Password </Text>
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

export default ResetPassword;
