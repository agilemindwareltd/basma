import React, { useState, useEffect } from 'react';
import { View, StatusBar, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './styles';
import { AppButton } from '../../../../components';
import { appImages } from '../../../../utilities';

const Hotels = ({ navigation, route }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const { item } = route?.params;
    setData(item);
  }, [route.params]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.imgStyle} source={appImages.hotelsBg}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.weIconBackBtn}
      />
        <AppButton
          onPress={() => navigation.navigate('HotelDetails', { item: data })}
          txt="SKIP"
        />
      </ImageBackground>
    </View>
  );
};

export default Hotels;
