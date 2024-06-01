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
  companyDetailContainer: {
    padding: WP('5'),
    marginTop: HP('1'),
    width: width / 1.12,
    alignSelf: 'center',
    borderRadius: WP('5'),
    paddingVertical: WP('2.5'),
    backgroundColor: colors.g17,
  },
  descTxtStyle: {
    color: colors.b1,
    alignSelf: 'center',
    fontSize: size.xxsmall,
    marginBottom: HP('3'),
    fontFamily: family.Poppins_Regular,
  },
  comNameTxtStyle: {
    color: colors.b1,
    fontSize: size.small,
    fontFamily: family.Poppins_Medium,
  },
  compImgStyle: {
    height: HP('16'),
    borderRadius: 15,
    width: width / 1.13,
    alignSelf: 'center',
    marginVertical: HP('2'),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStyle: {
    width: '75%',
    margin: HP('2'),
    marginLeft: 0,
    padding: 0,
    elevation: 0,
    paddingTop: 0,
    borderRadius: 25,
    shadowOpacity: 0,
    alignSelf: 'center',
    marginBottom: HP('3'),
    marginVertical: HP('0'),
  },
  cardViewStyle: {
    padding: 0,
    borderRadius: 25,
    flexDirection: 'row',
  },
  imgStyle: {
    width: 100,
    height: 75,
    borderRadius: 20,
  },
  contentContainer: {
    height: 70,
    flexGrow: 1,
    marginLeft: 10,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameTxtStyle: {
    left: 4,
    width: '90%',
    height: 20,
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Regular,
  },
  rowContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locIconStyle: {
    width: 25,
    height: 25,
    tintColor: colors.p6,
  },
  locTxtStyle: {
    left: 2,
    width: '50%',
    color: colors.p6,
    fontSize: size.xtiny,
    fontFamily: family.Poppins_Regular,
  },
  txtStyle: {
    color: colors.b1,
    fontSize: size.tiny,
    fontFamily: family.Poppins_Regular,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTxtStyle: {
    left: 5,
    color: colors.b1,
    fontSize: size.xtiny,
    fontFamily: family.Poppins_Regular,
  },
  btnContainer: {
    top: 4,
    padding: 3,
    width: width / 5,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.p6,
    borderTopStartRadius: 20,
    borderBottomEndRadius: 40,
    right: Platform.OS === 'android' ? 20 : 5,
  },
  btnTxtStyle: {
    padding: 2,
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Poppins_Regular,
  },
  viewContainer: {
    flexGrow: 1,
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
