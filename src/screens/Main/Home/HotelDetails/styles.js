import {Platform, Dimensions, StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../../../../utilities';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.bg5,
  },
  imageStyle: {
    width: width,
    height: height / 2.8,
  },
  iconStyle: {
    left: WP('3'),
    marginTop: HP('5'),
    alignSelf: 'flex-start',
  },
  titleTxtStyle: {
    left: HP('2'),
    color: colors.b1,
    marginTop: HP('1'),
    marginBottom: HP('1'),
    fontSize: size.normal,
    fontFamily: family.Poppins_Medium,
  },
  serviceImgStyle: {
    marginLeft: 10,
    width: WP('16'),
    height: WP('16'),
    alignItems: 'center',
    borderRadius: WP('2.5'),
    justifyContent: 'center',
  },
  quantityTxtStyle: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.Poppins_SemiBold,
  },
  cardStyle: {
    width: '90%',
    margin: HP('5'),
    marginTop: HP('2'),
    padding: 10,
    elevation: 0,
    paddingTop: 0,
    borderRadius: 0,
    shadowOpacity: 0,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  ratingContainer: {
    left: 2,
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtStyle: {
    color: colors.b1,
    fontSize: size.xxtiny,
    fontFamily: family.Poppins_Regular,
  },
  ratingTxtStyle: {
    left: 5,
    color: colors.b1,
    fontSize: size.normal,
    fontFamily: family.Poppins_Medium,
  },
  nameTxtStyle: {
    marginTop: 5,
    color: colors.b1,
    fontSize: size.normal,
    fontFamily: family.Poppins_Medium,
    marginBottom: Platform.OS === 'android' ? -8 : -3,
  },
  rowContainer: {
    width: Platform.OS === 'android' ? '84.5%' : '83%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtContainer: {
    width: 30,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: colors.bg6,
  },
  txtStyle1: {
    padding: 5,
    fontSize: size.tiny,
    color: colors.white,
    fontFamily: family.Poppins_Regular,
  },
  facilityTxtStyle: {
    marginTop: 7,
    color: colors.txt2,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Regular,
  },
  locIconStyle: {
    width: 30,
    height: 30,
    tintColor: colors.txt3,
  },
  mapTxtStyle: {
    marginTop: 7,
    color: colors.txt3,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Regular,
  },
  iconsContainer: {
    width: '83%',
    flexDirection: 'row',
    marginVertical: HP('1.5'),
    justifyContent: 'space-between',
  },
  facilityImgStyle: {
    width: WP('7'),
    height: WP('7'),
  },
  rowContainer1: {
    flex: 1,
    width: '83%',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#75757524',
    justifyContent: 'space-between',
  },
  txtStyle2: {
    flex: 0.9,
    width: 150,
    color: colors.b1,
    fontSize: size.normal,
    fontFamily: family.Poppins_SemiBold,
  },
  txtStyle3: {
    color: colors.b1,
    fontSize: size.normal,
    fontFamily: family.Poppins_SemiBold,
  },
  descTxtStyle: {
    top: 3,
    left: 3,
    width: '82%',
    marginBottom: 10,
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Medium,
  },
  imagesContainer: {
    width: '95%',
    marginTop: HP('2'),
    marginBottom: HP('1'),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imgStyle: {
    width: WP('16'),
    height: WP('16'),
    borderRadius: WP('2.5'),
  },
  btnsContainer: {
    width: '90%',
    marginTop: HP('2'),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
