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
    height: Platform.OS === 'android' ? height / 1.65 : height / 2,
  },
  welcomeTxtStyle: {
    color: colors.b1,
    alignSelf: 'center',
    fontSize: size.title,
    fontFamily: family.Giddyup_Std,
  },
  descTxtStyle: {
    marginTop: 7,
    lineHeight: 22,
    color: colors.g1,
    fontSize: size.tiny,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: family.Poppins_Regular,
  },
  buttonStyle: {
    bottom: 5,
    borderRadius: 15,
    width: width / 1.8,
    marginTop: HP('5'),
    alignSelf: 'center',
    backgroundColor: colors.bg9,
  },
  heartIconStyle: {
    marginTop: 7,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttonText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: size.small,
    paddingBottom: HP('2.2'),
    backgroundColor: 'transparent',
    fontFamily: family.Poppins_Medium,
  },
});

export default styles;
