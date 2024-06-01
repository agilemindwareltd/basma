import {Dimensions, StyleSheet, Platform} from 'react-native';
import {colors, HP, WP, size, family} from '../../../../utilities';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    width: WP('100%'),
    paddingHorizontal: size.xtitle,
    paddingTop: size.xxtiny,
  },
  rowDirection: {
    flexDirection: 'row',
  },
  columnDirection: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  imageStyles: {
    width: WP('35%'),
    height: HP('14%'),
    top: Platform.OS === 'android' ? HP('1') : HP('5'),
  },
  mainHeading: {
    fontSize: size.h5,
    letterSpacing: 1,
  },
  subHeading: {
    fontSize: size.medium,
    letterSpacing: 0.5,
  },
  xsubHeading:{
    fontSize: size.xsmall,
    letterSpacing: 0.5,
  },
  colorWhite: {
    color: colors.white,
  },
  colorGray: {
    color: colors.g3,
  },
  iconStar: {
    width: WP('6%'),
    height: HP('4%'),
  },
  h40: {
    height: HP('40%'),
  },
});

export default styles;
