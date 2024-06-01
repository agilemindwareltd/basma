import {Platform, Dimensions, StyleSheet} from 'react-native';
import {colors, family, HP, WP, size} from '../../../../utilities';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  gradientStyle: {
    width: '100%',
    borderRadius: 0,
    height: HP('20'),
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  iconStyle: {
    left: WP('3'),
    marginTop: HP('5'),
    alignSelf: 'flex-start',
  },
  cardStyle: {
    padding: 0,
    elevation: 5,
    width: '90%',
    borderRadius: 10,
    shadowOpacity: 5,
    margin: HP('2.2'),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? HP('-15') : HP('-10'),
  },
  imgStyle: {
    top: -2,
    borderRadius: 0,
    width: width / 1.112,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: Platform.OS === 'android' ? height / 3.5 : height / 4,
  },
  itemContainer: {
    flexGrow: 1,
    width: width,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  nameRowContainer: {
    width: '85%',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtStyle: {
    left: 7,
    width: '80%',
    color: colors.g1,
    fontSize: size.h6,
    textAlign: 'center',
    fontFamily: family.Poppins_Regular,
  },
  locIconStyle: {
    width: 30,
    height: 30,
    tintColor: colors.g1,
  },
  ratingRowContainer: {
    marginTop: 5,
    width: '100%',
    paddingRight: 5,
    marginBottom: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starIconStyle: {
    width: 20,
    height: 20,
  },
  txtStyle1: {
    marginLeft: 7,
    color: colors.g1,
    fontSize: size.normal,
    fontFamily: family.Poppins_Regular,
  },
  hereTxtStyle: {
    marginTop: 5,
    color: colors.p4,
    fontSize: size.xxsmall,
    fontFamily: family.Poppins_Regular,
  },
  headingTxtStyle: {
    color: colors.p4,
    marginVertical: HP('2'),
    alignSelf: 'center',
    fontSize: size.normal,
    fontFamily: family.Poppins_Regular,
  },
  serviceItemContainer: {
    flexGrow: 1,
    width: width,
    marginBottom: 5,
  },
  imgStyle1: {
    margin: 3,
    borderRadius: 10,
    width: width / 1.3,
    marginHorizontal: 10,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: Platform.OS === 'android' ? height / 4.5 : height / 5,
  },
  viewStyle: {
    right: HP('1'),
    bottom: HP('1'),
    borderRadius: 15,
    backgroundColor: colors.p4,
  },
  priceTextStyle: {
    padding: 7,
    textAlign: 'center',
    color: colors.white,
    fontSize: size.xsmall,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    fontFamily: family.Poppins_Regular,
    top: Platform.OS === 'android' ? 2 : 0,
  },
  buttonStyle: {
    borderRadius: 40,
    width: width / 1.25,
    alignSelf: 'center',
    marginVertical: HP('3'),
    backgroundColor: colors.p4,
  },
  buttonText: {
    padding: 10,
    textAlign: 'center',
    color: colors.white,
    fontSize: size.xsmall,
    backgroundColor: 'transparent',
    fontFamily: family.Poppins_Regular,
  },
  ratingContainer: {
    bottom: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTxtStyle: {
    top: 2,
    left: 5,
    color: colors.g1,
    fontSize: size.xxxtiny,
    fontFamily: family.Poppins_Regular,
  },
  viewContainer: {
    flex: 0.9,
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
