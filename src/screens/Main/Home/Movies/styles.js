import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../../../../utilities';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.bg8,
  },
  imageStyle: {
    width: '100%',
    height: height / 4.2,
  },
  iconStyle: {
    left: WP('3'),
    marginTop: HP('5'),
    alignSelf: 'flex-start',
  },
  titleTxtStyle: {
    padding: HP('2'),
    color: colors.txt1,
    fontSize: size.normal,
    fontFamily: family.Poppins_Regular,
  },
  cardStyle: {
    width: '90%',
    margin: HP('5'),
    marginTop: HP('3'),
    padding: 0,
    elevation: 0,
    paddingTop: 0,
    borderRadius: 15,
    shadowOpacity: 0,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: Platform.OS === 'android' ? HP('6.5') : HP('3'),
    height: Platform.OS === 'android' ? height / 9 : height / 9.5,
  },
  cardViewStyle: {
    flex: 1,
    width: width / 1.15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: Platform.OS === 'android' ? 6 : 0,
  },
  imgStyle: {
    width: WP('28'),
    borderRadius: WP('4'),
    height: Platform.OS === 'android' ? HP('16') : HP('14'),
    bottom: Platform.OS === 'android' ? WP('-1.5') : 0,
  },
  contentContainer: {
    flex: 1,
    height: HP('8'),
    justifyContent: 'space-between',
  },
  nameTxtStyle: {
    color: colors.b1,
    fontSize: size.tiny,
    fontFamily: family.Poppins_Regular,
  },
  ratingContainer: {
    left: -4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtStyle: {
    color: colors.b1,
    fontSize: size.xxtiny,
    fontFamily: family.Poppins_Regular,
  },
  ratingTxtStyle: {
    color: colors.g1,
    fontSize: size.xxxtiny,
    fontFamily: family.Poppins_Regular,
  },
  iconsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    top: Platform.OS === 'android' ? 5 : 0,
    height: Platform.OS === 'android' ? HP('8.5') : HP('7'),
  },
  iconStyle1: {
    width: 30,
    height: 30,
  },
  iconStyle2: {
    width: 20,
    height: 20,
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  recordsTextStyle: {
    color: colors.b1,
    alignSelf: 'center',
    fontSize: size.large,
    fontFamily: family.Poppins_Medium,
  },
});

export default styles;
