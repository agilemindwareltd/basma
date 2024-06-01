
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { colors } from "../../../utilities"
import { Error } from '../../../components/Error'
import { useDispatch, useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import {
  appImages,
  appLogos,
  size,
  family,
  HP,
} from '../../../utilities';
import styles from './styles';
import { AppInput } from '../../../components';
import { getCountry, resetRequest } from '../../../redux/actions';

const ForgetPassword = ({ navigation, route }) => {

  const [countryCode, setcountryCode] = useState('962');
  const [phoneNumber, setphoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [countryId, setcountryId] = useState('2');
  const [country, setcountry] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');

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


  const handleResetPassword = () => {
    setIsLoading(true);
    const data = {
      emailOrPhone: '00' + countryCode + phoneNumber,
    }
    const cbSuccess = async (response, message) => {
      navigation.navigate('Verification', { emailOrPhone: data.emailOrPhone, comeFrom: 'ForgetPassword', });
      setIsLoading(false);
    };

    //When api is not successfull
    const cbFailure = message => {
      setIsLoading(false);
      seterrorMessage(message)
      setTimeout(() => {
        seterrorMessage('')
      }, 3000);
    };
    dispatch(resetRequest(data, cbSuccess, cbFailure))
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
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
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
              <View style={{ height: HP('4') }} />
              <View style={{ width: "100%", paddingHorizontal: "10%", justifyContent: "center" }}>
                <Text style={{ color: colors.g9, fontSize: size.h6, left: 20, fontFamily: family.Poppins_Regular, }}>Forgot password ? </Text>
              </View>
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
              />
              <View style={{ height: HP('4') }} />
              <View
                onPress={() => handleResetPassword()}
                style={{ alignItems: 'center' }}
              >
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.replace('Login')}>
                  <Text style={styles.passTxtStyle}>Has Account ? </Text>
                  <Text style={[styles.passTxtStyle, { color: colors.p1, textDecorationLine: "underline" }]}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.passTxtStyle}>or</Text>
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.replace('SignUp')}>
                  <Text style={styles.passTxtStyle}>New User ? </Text>
                  <Text style={[styles.passTxtStyle, { color: colors.p1, textDecorationLine: "underline" }]}>Singup</Text>
                </TouchableOpacity>
              </View>

              <View style={{ height: HP('2') }} />
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.buttonStyle}
                  onPress={() => handleResetPassword()}>
                  <Text style={styles.buttonTxtStyle}>Reset Request</Text>
                </TouchableOpacity>
              )}
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

export default ForgetPassword;
