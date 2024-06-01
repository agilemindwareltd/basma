import {Platform, Dimensions, StyleSheet} from 'react-native';
import {colors, family, HP, WP, size} from '../../../../utilities';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  weIconBackBtn: {
    left: HP(2),
    position: 'absolute',
    top: HP(3),
    borderRadius: 15,
    height: HP(8),
    width: HP(7),
  },
  logoStyle: {
    margin: HP('1'),
    width: WP('18'),
    height: WP('18'),
  },
  imgStyle: {
    marginTop: 5,
    width: width,
    height: Platform.OS === 'android' ? height / 1.75 : height / 2,
  },
  welcomeTxtStyle: {
    color: colors.b1,
    marginTop: HP('3'),
    alignSelf: 'center',
    fontSize: size.large,
    fontFamily: family.Poppins_Italic,
  },
  descTxtStyle: {
    lineHeight: 22,
    color: colors.g1,
    marginTop: HP('2'),
    fontSize: size.tiny,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: family.Poppins_Regular,
  },
  enterTxtStyle: {
    color: colors.b1,
    textAlign: 'center',
    fontSize: size.small,
    backgroundColor: 'transparent',
    fontFamily: family.Poppins_Regular,
  },
});

export default styles;
