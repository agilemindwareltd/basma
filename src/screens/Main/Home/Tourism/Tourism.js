import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { appImages, appLogos } from '../../../../utilities';

const Tourism = ({ navigation, route }) => {
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
          source={appImages.tourInfo}
        />
        <Text style={styles.welcomeTxtStyle}>
          Welcome to world of Adventure
        </Text>
        <Text style={styles.descTxtStyle}>
          Browse the best tourism countries in the{'\n'} world... stay connected
          with best sightseeing
        </Text>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('TourismDetails', { item: data })}>
        <Text style={styles.enterTxtStyle}>Enter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Tourism;
