// MAIN LIABRARIES
import React, { useEffect, useState } from 'react';
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

// SEMI LIABRARIES
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { colors, } from 'react-native-elements';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings, } from 'react-native-fbsdk-next';
import {
  useDispatch,
  useSelector
} from 'react-redux';

// COMPONENTS
import styles from './styles';
import style from '../../styles';
import { AppInput } from '../../../components';
import {
  appImages,
  appLogos,
  HP,
} from '../../../utilities';
import {
  getCountry,
  _errorMsg,
  signUpAction
} from '../../../redux/actions';

// SOCIAL CONFIGURATION
Settings.setAppID('581248022959738');
GoogleSignin.configure({
  webClientId:
    '167420106748-ick1a9a7i156lsq2p0k61q98vvninntl.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});

const AddPhoneForSocial = ({ navigation, route }) => {
  const [phoneNumber, setphoneNumber] = useState('');
  const [country, setcountry] = useState([]);
  const [countryCode, setcountryCode] = useState('962');
  const [countryId, setcountryId] = useState('2');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { errorMsg } = useSelector(state => state.app);

  // HOOKS
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
  // HOOKS


  const handleLogin = () => {
    const data = {
      mobile: '00' + countryCode + phoneNumber,
      countryId: countryId,
      fullName: route.params.user.name,
      googleSocialId: "",
      facebookSocialId: ""
    };
    if (route.params.socialAuth === 'googleSignIn') {
      data.googleSocialId = route.params.user.id
    }
    else {
      data.facebookSocialId = route.params.user.id
    }

    const cbSuccess = async message => {
      // await AsyncStorage.setItem('Login', 'true');
      setIsLoading(false);
      navigation.navigate('Verification', data.mobile);
    };
    const cbFailure = message => {
      dispatch(_errorMsg({ errorMsg: message, }))
      setTimeout(() => {
        dispatch(_errorMsg({ errorMsg: '', }))
      }, 3000);
      setIsLoading(false);
    };
    dispatch(signUpAction(data, cbSuccess, cbFailure))
  }

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
            <Text style={styles.txtStyle}>Enter Phone Number</Text>
          </View>
          <Animatable.View
            duration={1000}
            easing="linear"
            animation="fadeInUpBig"
            useNativeDriver={true}
            style={styles.outerView}>
            <View style={styles.innerView}>
              <View style={{ height: HP('2') }} />
              <View style={styles.rowContainer}>
                <Text style={styles.loginTxtStyle}>Complete Sign Up</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Login')}>
                </TouchableOpacity>
              </View>
              <View style={{ height: HP('4') }} />

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

              {errorMsg !== '' && <Text style={style.error}>{errorMsg}</Text>}

              <View style={{ height: HP('2') }} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={() => handleLogin()}>
                {isLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.buttonTxtStyle}>CompleteSignup</Text>
                )}
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

export default AddPhoneForSocial;
