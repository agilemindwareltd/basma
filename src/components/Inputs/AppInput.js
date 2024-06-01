/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Image, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors, family, HP, size, WP } from '../../utilities';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

export const AppInput = ({
  value,
  _func,
  placeholder,
  keyboardType,
  onChangeText,
  multiline = false,
  isIcon = false,
  countCode,
  countCodeValue,
  isIcon1 = false,
  secureTextEntry ,
  placeholderColor = colors.g2,
  appWidth = width / 1.25,
  autoCapitalize = 'none',
}) => {
  const [passShow, setPassShow] = useState(false)
  return (
    <View style={{ width: appWidth, alignSelf: 'center' }}>
      {countCode ?
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => _func()} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: isIcon ? '20%' : '100%', }}>
            <MaterialIcons name={"phone"} size={20} color={colors.g7} />
            <Text style={{ color: colors.fntClr, marginHorizontal: 5 }}>{countCodeValue}</Text>
            <AntDesign name={"caretdown"} size={10} color={colors.g7} />
          </TouchableOpacity>
          <View style={{ width: isIcon ? '60%' : '100%' }}>
            <TextInput
              value={value}
              placeholder={placeholder}
              style={styles.inputStyle}
              keyboardType={keyboardType}
              placeholderTextColor={placeholderColor}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              multiline={multiline}
              autoCapitalize={autoCapitalize}
            />
          </View>
          {isIcon ? (
            <View style={{ justifyContent: 'center' }}>
              {/* <Image source={isIcon1 ? require('../../assets/icons/passwordicon.png') : require('../../assets/icons/userIcon.png')} marginRight={15} ></Image> */}
            </View>
          ) : null}
        </View>
        :
        <View style={styles.rowContainer}>
          {isIcon ? (
            <View style={{ justifyContent: 'center' }}>
              <Image source={isIcon1 ? require('../../assets/icons/passwordicon.png') : require('../../assets/icons/userIcon.png')} marginRight={15} ></Image>
            </View>
          ) : null}
          <View style={{ width: isIcon ? '78%' : '100%' }}>
            <TextInput
              value={value}
              placeholder={placeholder}
              style={styles.inputStyle}
              keyboardType={keyboardType}
              placeholderTextColor={placeholderColor}
              onChangeText={onChangeText}
              secureTextEntry={passShow||!secureTextEntry ? false : true}
              multiline={multiline}
              autoCapitalize={autoCapitalize}
            />
          </View>
          {isIcon1 &&
            <TouchableOpacity
              onPress={() => setPassShow(!passShow)}
              style={{ justifyContent: 'center', width: '10%' }}>
              {passShow ?
                <FontAwesome5 name={"eye"} size={18} color={colors.v3} />
                :
                <FontAwesome5 name={"eye-slash"} size={18} color={colors.v3} />
              }
            </TouchableOpacity>
          }
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  inputStyle: {
    bottom: Platform.OS === 'android' ? 2 : 2.5,
    paddingBottom: Platform.OS === 'android' ? -6 : 0,
    fontSize: size.small,
    color: colors.drakBlack,
    padding: WP('1'),
    // fontFamily: family.Poppins_Regular,
  },
  imageStyle: {
    width: WP('4'),
    height: HP('2'),
    marginRight: WP('2'),
  },
});
