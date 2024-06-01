import React from 'react';
import {Platform} from 'react-native';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, family, HP, size} from '../../utilities';

export const NotesInput = ({
  title,
  value,
  isHeight,
  isHeightSm,
  placeholder,
  keyboardType,
  onChangeText,
  editable = true,
  onPress = () => {},
  placeholderColor = colors.g3,
}) => {
  return (
    <View style={styles.inputRowBorder}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          editable ? console.log('clicked') : onPress();
        }}
        style={isHeight ? styles.inputContainer : isHeightSm ? styles.inputContainer1 : styles.inputContainer2}>
        <TextInput
          value={value}
          placeholder={placeholder}
          onPressOut={() => {
            editable ? console.log('clicked') : onPress();
          }}
          style={isHeight ? styles.inputStyleNotes : isHeightSm ? styles.inputStyleNotes1 : styles.inputStyle}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderColor}
          multiline={isHeight ? true : isHeightSm ? true : false}
          editable={editable}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputRowBorder: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors.p1,
  },
  inputContainer: {
    justifyContent: 'flex-start',
    width: Platform.OS === 'android' ? HP('42') : HP('40'),
    height: Platform.OS === 'android' ? HP('20') : HP('14'),
  },
  inputContainer1: {
    justifyContent: 'flex-start',
    width: Platform.OS === 'android' ? HP('42') : HP('40'),
    height: Platform.OS === 'android' ? HP('10') : HP('7'),
  },
  inputContainer2: {
    justifyContent: 'center',
    width: Platform.OS === 'android' ? HP('42') : HP('40'),
    height: Platform.OS === 'android' ? HP('6.5') : HP('5'),
  },
  inputStyleNotes: {
    borderRadius: 20,
    color: colors.white,
    fontSize: size.tiny,
    minHeight: HP('9'),
    paddingTop: HP('0.5'),
    textAlignVertical: 'top',
    paddingHorizontal: HP('1'),
    backgroundColor: colors.b1,
    fontFamily: family.Poppins_Regular,
    height: Platform.OS === 'android' ? HP('20') : HP('14'),
  },
  inputStyleNotes1: {
    borderRadius: 20,
    color: colors.white,
    fontSize: size.tiny,
    minHeight: HP('9'),
    paddingTop: HP('0.8'),
    textAlignVertical: 'top',
    paddingHorizontal: HP('1.5'),
    backgroundColor: colors.b1,
    fontFamily: family.Poppins_Regular,
    height: Platform.OS === 'android' ? HP('10') : HP('7'),
  },
  inputStyle: {
    borderRadius: 20,
    color: colors.white,
    fontSize: size.tiny,
    backgroundColor: colors.b1,
    paddingHorizontal: HP('1'),
    textAlignVertical: 'center',
    fontFamily: family.Poppins_Regular,
    height: Platform.OS === 'android' ? HP('6.5') : HP('5'),
  },
  txtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Poppins_Regular,
    marginTop: HP('1'),
    marginLeft: HP('5'),
  },
  textItemStyle: {
    fontSize: size.xtiny,
    fontFamily: family.Poppins_Regular,
    color: colors.g18,
  },
});
