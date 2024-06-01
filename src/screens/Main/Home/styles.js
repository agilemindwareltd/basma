import {Platform, Dimensions, StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../../../utilities';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageStyles: {
    left: 5,
    width: width / 7,
    height: height / 10,
    alignSelf: 'center',
  },
  srchContainer: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageStyles1: {
    width: 30,
    height: 25,
  },
  srchIconStyle: {
    width: 30,
    height: 25,
  },
  srchView: {
    width: '63%',
    alignSelf: 'center',
  },
  rowContainer: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.bg4,
    justifyContent: 'space-between',
  },
  inputStyle: {
    padding: WP('1'),
    color: colors.white,
    fontSize: size.xxsmall,
    fontFamily: family.Poppins_Regular,
    bottom: Platform.OS === 'android' ? 0 : 2.5,
    paddingBottom: Platform.OS === 'android' ? -6 : 0,
  },
  imageStyle: {
    width: WP('4'),
    height: HP('2'),
    marginRight: WP('2'),
  },
  bsnsTxtStyle: {
    color: colors.white,
    fontSize: size.xtiny,
  },
});

export default styles;
