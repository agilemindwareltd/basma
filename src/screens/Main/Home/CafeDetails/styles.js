import {Platform, StyleSheet, Dimensions} from 'react-native';
import {HP, WP, size, family, colors} from '../../../../utilities';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imgStyle: {
    flex: 1,
    width: width,
    height: Platform.OS === 'android' ? '110%' : '100%',
  },
  rowContainer: {
    height: height / 7,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  logoStyle: {
    margin: HP('1'),
    width: WP('18'),
    height: WP('18'),
  },
  titleTxtStyle: {
    bottom: HP('2.5'),
    color: colors.white,
    fontSize: size.large,
    fontFamily: family.Poppins_SemiBold,
  },
  roughTxtStyle: {
    color: 'transparent',
  },
  scrollViewStyle: {
    flexGrow: 1,
    width: width,
    paddingBottom: HP('3'),
  },
  companyImgStyle: {
    margin: HP('1'),
    width: width / 1.2,
    alignSelf: 'center',
    height: height / 5,
    borderRadius: WP('5'),
  },
  companyDetailContainer: {
    padding: WP('3.5'),
    marginTop: HP('1'),
    width: width / 1.2,
    alignSelf: 'center',
    borderRadius: WP('4'),
    paddingVertical: WP('1.5'),
    backgroundColor: colors.bg10,
  },
  locRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameTxtStyle: {
    color: colors.b1,
    alignSelf: 'center',
    fontSize: size.normal,
    fontFamily: family.Poppins_SemiBoldItalic,
  },
  locIconStyle: {
    bottom: 3,
    width: 30,
    height: 30,
  },
  txtContainer: {
    width: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: HP('1.5'),
    backgroundColor: colors.bg6,
  },
  ratingTxtStyle: {
    padding: 5,
    fontSize: size.tiny,
    color: colors.white,
    fontFamily: family.Poppins_Regular,
  },
  descTxtStyle: {
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Regular,
  },
  txtStyle: {
    marginTop: 5,
    left: WP('5'),
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_SemiBold,
  },
  headingTxtStyle: {
    color: colors.b1,
    alignSelf: 'center',
    fontSize: size.xxlarge,
    fontFamily: family.Poppins_SemiBold,
  },
  itemContainer: {
    padding: WP('5'),
    marginTop: HP('1.5'),
    width: width / 1.2,
    alignSelf: 'center',
    borderRadius: WP('6'),
    backgroundColor: colors.bg11,
    flexDirection: 'row',
  },
  productTxtStyle: {
    color: colors.white,
    fontSize: size.xxlarge,
    fontFamily: family.Poppins_SemiBold,
  },
  ratingContainer: {
    left: 2,
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTxtStyle1: {
    left: 5,
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Regular,
  },
  descTxtStyle1: {
    paddingBottom: 3,
    color: colors.white,
    fontSize: size.xtiny,
    paddingVertical: HP('2'),
    fontFamily: family.Poppins_Light,
  },
  priceRowContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceTxtStyle: {
    color: colors.white,
    fontSize: size.large,
    fontFamily: family.Poppins_Medium,
  },
  productImgStyle: {
    margin: HP('1'),
    width: WP('15'),
    height: WP('15'),
    backgroundColor: colors.g1,
    borderRadius: 10,
  },
  viewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  recordsTextStyle: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: size.large,
    fontFamily: family.Poppins_Medium,
  },
});

export default styles;
