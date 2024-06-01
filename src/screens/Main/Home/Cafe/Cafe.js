import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  Platform,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import { appImages, appLogos, colors, HP } from '../../../../utilities';

const Cafe = ({ navigation, route }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const { item } = route?.params;
    setData(item);
  }, [route.params]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          resizeMode="contain"
          style={styles.logoStyle}
          source={appLogos.appLogo}
        />
        <TouchableOpacity style={styles.weIconBackBtn} activeOpacity={1} onPress={() => navigation.goBack()}
        />
        <Image
          resizeMode="contain"
          style={styles.imgStyle}
          source={appImages.cafeIntro}
        />
        <Text style={styles.welcomeTxtStyle}>Welcome to world of Coffee</Text>
        <Text style={styles.descTxtStyle}>
          Browse the best Coffee shops around you,{'\n'}explore there special
          products
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('CafeDetails', { item: data })}
          style={styles.buttonStyle}>
          <Icon
            type={'antdesign'}
            name={'heart'}
            color={colors.white}
            size={Platform.OS === 'android?' ? HP('2') : HP('1.5')}
            style={styles.heartIconStyle}
          />
          <Text style={styles.buttonText}>Find Your Best Cafe</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cafe;
