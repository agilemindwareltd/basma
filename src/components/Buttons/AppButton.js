/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, family, HP, size} from '../../utilities';

const {width} = Dimensions.get('window');

export const AppButton = ({
  btnWidth = width / 3.5,
  onPress = () => {},
  txt = '',
  txtSize = size.xsmall,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.buttonStyle, {width: btnWidth}]}
      onPress={onPress}>
      <LinearGradient colors={colors.btn_gradient} style={{borderRadius: 5}}>
        <Text style={[styles.buttonText, {fontSize: txtSize}]}>{txt}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 15,
    bottom: HP('2'),
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    padding: 8,
    textAlign: 'center',
    color: colors.white,
    backgroundColor: 'transparent',
    fontFamily: family.Poppins_Medium,
  },
});
