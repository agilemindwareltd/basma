import React, { useEffect } from 'react';
import { TouchableOpacity, Image, StatusBar, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { appImages, appLogos } from '../../utilities';

const Splash = ({ navigation }) => {
  useEffect(() => {
    handleNavigation();
  }, []);

  const handleNavigation = async () => {
    setTimeout(() => {
      changeRoute()
    }, 1000);

  };
  const changeRoute = async () => {
    const login = await AsyncStorage.getItem('Login');
    if (login === 'true') {
      navigation.replace('App');
    } else {
      navigation.replace('Auth');
    }
  }
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        // onPress={() => changeRoute()}
        style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
        
        {/* <StatusBar hidden={true} /> */}
        <ImageBackground
          style={styles.mainContainer}
          source={appImages.splashBg}>
          <Image
            resizeMode="contain"
            source={appLogos.appLogo}
            style={styles.imageStyles}
          />
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
};

export default Splash;
