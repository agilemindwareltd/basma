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
  itemContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardStyle: {
    width: '60%',
    margin: HP('2'),
    marginVertical: HP('3'),
    padding: 0,
    elevation: 0,
    paddingTop: 0,
    borderRadius: 25,
    shadowOpacity: 0,
    marginBottom: HP('3'),
    height: Platform.OS === 'android' ? height / 6 : height / 8.5,
  },
  cardViewStyle: {
    padding: 15,
    paddingTop: 5,
    paddingBottom: 0,
    borderRadius: 25,
    width: width / 1.72,
    height: Platform.OS === 'android' ? height / 6 : height / 8.5,
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameTxtStyle: {
    width: '90%',
    height: 20,
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Regular,
  },
  locIconStyle: {
    width: 25,
    height: 25,
  },
  txtStyle: {
    color: colors.b1,
    fontSize: size.tiny,
    fontFamily: family.Poppins_Regular,
  },
  ratingContainer: {
    top: 4,
    left: 5,
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
    width: width / 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.p6,
    borderBottomEndRadius: 50,
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
  },
  btnTxtStyle: {
    padding: 2,
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Poppins_Regular,
  },
  imgStyle: {
    zIndex: -9,
    left: WP('-15'),
    width: Platform.OS === 'android' ? WP('44') : WP('40'),
    height: Platform.OS === 'android' ? WP('44') : WP('40'),
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default styles;
