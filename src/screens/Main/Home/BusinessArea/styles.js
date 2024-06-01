import {Platform, StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../../../../utilities';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  rowContainer: {
    left: WP('5'),
    alignItems: 'center',
    flexDirection: 'row',
  },
  headingTxtStyle: {
    left: WP('1.5'),
    color: colors.white,
    fontSize: size.large,
    fontFamily: family.Poppins_Medium,
  },
  descTxtStyle: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Medium,
  },
  flStyle: {
    top: HP('3'),
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: HP('0'),
    marginHorizontal: HP('1'),
  },
  circleImgStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'android' ? 100 : 110,
    height: Platform.OS === 'android' ? 100 : 110,
  },
  titleTxtStyle: {
    alignSelf: 'center',
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Poppins_SemiBold,
  },
});

export default styles;
