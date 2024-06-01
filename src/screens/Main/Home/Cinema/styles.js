import {Platform, Dimensions, StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../../../../utilities';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
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
  item: {
    width: width,
    height: height / 1.75,
    backgroundColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    width: Platform.OS === 'android' ? width / 1.8 : width / 1.86,
    height: height / 1.75,
    marginBottom: Platform.select({ios: 0, android: 1}),
    backgroundColor: 'white',
    borderRadius: 15,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  bgImgStyle: {
    width: Platform.OS === 'android' ? width / 1.8 : width / 1.86,
    height: Platform.OS === 'android' ? height / 7 : height / 8,
    top: Platform.OS === 'android' ? -4 : -5,
  },
  browseImgStyle: {
    marginTop: '-10%',
    width: Platform.OS === 'android' ? width / 3 : width / 2.3,
    height: Platform.OS === 'android' ? height / 20 : height / 20,
    alignSelf: 'center',
  },
  contentContainer: {
    marginLeft: WP('7'),
    marginTop: Platform.OS === 'android' ? HP('0.3') : HP('1.25'),
    marginRight: WP('2'),
  },
  nameTxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Poppins_Medium,
  },
  ratingContainer: {
    left: -4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtStyle: {
    color: colors.white,
    fontSize: size.xtiny,
    fontFamily: family.Poppins_Regular,
  },
  ratingTxtStyle: {
    color: colors.white,
    fontSize: size.xxxtiny,
    fontFamily: family.Poppins_Regular,
  },
});

export default styles;
