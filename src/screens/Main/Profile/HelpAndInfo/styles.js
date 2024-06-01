import { StyleSheet, Platform } from 'react-native';
import { HP, WP, size, } from '../../../../utilities';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    width: WP('100%'),
    paddingHorizontal: size.h6,
    paddingTop: size.xxtiny,
  },
  rowDirection: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
  },
  colorWhite: {
    color: '#fff',
  },
  w_40: {
    width: WP('40%'),
  },
  imageStyles: {
    width: WP('25%'),
    height: HP('11%'),
    top: Platform.OS === 'android' ? HP('1') : HP('5'),
  },
  mainHeading: {
    fontSize: size.h5,
    letterSpacing: 1,
  },
  subHeading: {
    fontSize: size.xxlarge,
    letterSpacing: 1,
  },
  linkFont: {
    fontSize: size.small,
    marginTop: 15,
  },
  termsHeading: {
    fontSize: size.h6,
  },
});

export default styles;
