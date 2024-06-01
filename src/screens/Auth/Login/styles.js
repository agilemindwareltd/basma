import { Dimensions, StyleSheet, Platform } from 'react-native';
import { colors, HP, WP, size, family } from '../../../utilities';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageStyles: {
    left: WP('3'),
    width: WP('33%'),
    height: HP('15%'),
    top: Platform.OS === 'android' ? HP('1') : HP('5'),
  },
  iconsContainer: {
    bottom: 10,
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtStyle: {
    bottom: 7,
    color: colors.white,
    fontSize: size.xxlarge,
    fontFamily: family.Poppins_Regular,
  },
  iconStyle: {
    width: WP('13'),
    height: WP('13'),
  },
  outerView: {
    borderRadius: WP('9'),
    justifyContent: 'center',
    backgroundColor: colors.bg1,
    flex: Platform.OS === 'android' ? 0.13 : 0.1,
  },
  innerView: {
    borderRadius: WP('9'),
    backgroundColor: colors.bg2,
  },
  rowContainer: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginTxtStyle: {
    color: colors.b1,
    fontSize: size.xxlarge,
    fontFamily: family.Poppins_Regular,
  },
  signupTxtStyle: {
    color: colors.g9,
    fontSize: size.normal,
    fontFamily: family.Poppins_Regular,
  },
  passTxtStyle: {
    left: 5,
    color: colors.white,
    fontSize: size.small,
  },
  forgotTxtStyle: {
    color: colors.white,
    fontSize: size.small,
  },
  buttonStyle: {
    bottom: -40,
    alignSelf: 'center',
    borderRadius: WP('20'),
    height: 70,
    paddingTop: 10,
    paddingHorizontal:35,
    backgroundColor: colors.bg3,
  },
  buttonTxtStyle: {
    alignSelf: 'center',
    color: colors.white,
    fontSize: size.small,
    fontFamily: family.Poppins_SemiBold,
    top: Platform.OS === 'android' ? 1 : 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: '80%',
    height: "60%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalText: {
    marginVertical: 10,
    fontSize: 20
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between", borderBottomColor: '#606060', borderBottomWidth: 0.2
  }
});

export default styles;
