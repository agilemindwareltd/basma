import { Platform, Dimensions, StyleSheet } from 'react-native';
import { colors, family, HP, WP, size } from '../../../../utilities';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemContainer: {
    flexGrow: 1,
    width: width,
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
  gradientStyle: {
    flex: 0.6,
  },
  iconStyle: {
    left: WP('3'),
    marginTop: HP('5'),
    alignSelf: 'flex-start',
  },
  upperViewContainer: {
    padding: 10,
    elevation: 5,
    width: '90%',
    borderRadius: 10,
    margin: HP('2.2'),
    marginTop: HP('5'),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  imgViewContainer: {
    flex: 0.45,
    justifyContent: 'center',
  },
  imgStyle: {
    width: Platform.OS === 'android' ? WP('38') : WP('38'),
    height: Platform.OS === 'android' ? WP('40') : WP('35'),
    borderRadius: 10,
  },
  contentContainer: {
    flex: 0.55,
    paddingLeft: WP('5'),
  },
  txtStyle: {
    width: '75%',
    color: colors.b1,
    fontSize: size.small,
    fontFamily: family.Poppins_Regular,
  },
  ratingRowContainer: {
    top: 10,
    paddingRight: 5,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  starIconStyle: {
    width: 15,
    height: 15,
  },
  locIconStyle: {
    bottom: 2,
    width: 25,
    height: 25,
    tintColor: colors.p5,
  },
  txtStyle1: {
    marginLeft: 7,
    color: colors.b1,
    fontSize: size.xtiny,
    fontFamily: family.Poppins_Regular,
  },
  dotTxtStyle: {
    marginRight: 3,
    color: colors.p5,
    fontSize: size.xxlarge,
    fontFamily: family.Poppins_Regular,
  },
  hereTxtStyle: {
    color: colors.p5,
    fontSize: size.xxsmall,
    fontFamily: family.Poppins_Regular,
  },
  rowContainer1: {
    top: HP('1.5'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingTxtStyle: {
    color: colors.white,
    alignSelf: 'center',
    fontSize: size.normal,
    fontFamily: family.Poppins_Medium,
  },
  cricleImgStyle: {
    width: 60,
    height: 60,
    marginTop: 15,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  smallBgStyle: {
    width: '75%',
    height: height / 8,
  },
  bottomView: {
    flex: 0.4,
    marginTop: HP('-3.8'),
    padding: 0
  },
  cardStyle: {
    flex: 1,
    padding: 15,
    elevation: 5,
    width: '92%',
    marginTop: 5,
    borderRadius: 10,
    margin: HP('2.2'),
    alignSelf: 'center',
    flexDirection: 'row',
    shadowColor: colors.white,
    backgroundColor: colors.white,
    height: Platform.OS === 'android' ? height / 3 : height / 2.95,
  },
  cardStyle1: {
    padding: 15,
    elevation: 5,
    width: '90%',
    marginTop: 0,
    borderRadius: 10,
    margin: HP('2.2'),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.white,
    backgroundColor: colors.white,
    height: Platform.OS === 'android' ? height / 2.3 : height / 2.95,
  },
  serviceItemContainer: {
    width: HP(45)
  },
  cardRowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingView: {
    marginTop: -12,
    flexDirection: 'row',
    width: HP(5)
  },
  priceTxtStyle: {
    marginTop: 0,

  },
  descTxtStyle: {
    top: 2,
    color: colors.g1,
    fontSize: size.xxsmall,
    fontFamily: family.Poppins_Regular,
  },
  serviceImgContainer: {
    padding: 10,
    flexDirection: 'row',
    marginRight: 7,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    //margin: 6,
    height: 95,
    backgroundColor: colors.white,
  },
  serviceImgContainer1: {
    padding: 10,
    marginRight: 7,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  serviceImgStyle: {
    width: 83,
    height: 83,
    borderRadius: 10,
  },
  viewContainer: {
    flexGrow: 0.9,
    alignItems: 'center',
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
