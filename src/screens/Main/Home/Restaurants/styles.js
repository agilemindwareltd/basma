import { Platform, Dimensions, StyleSheet } from 'react-native';
import { colors, family, HP, size } from '../../../../utilities';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imgStyle: {
    flex: 1,
    width: '100%',
    height: Platform.OS === 'android' ? '110%' : '100%',
    justifyContent: 'flex-end',
  },
  weIconBackBtn: {
    left: HP(3.3),
    marginTop: HP(6.5),
    borderRadius: 15,
    height: HP(6.5),
    width: HP(8),
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
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,
    width: Platform.OS === 'android' ? width / 1.3 : width / 1.3,
    height: height / 1.75,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: colors.g15,
  },
  txtContainer: {
    flex: 0.2,
    alignItems: 'center',
  },
  loadingTxtStyle: {
    color: colors.white,
    fontSize: size.xxlarge,
    fontFamily: family.Poppins_Regular,
    marginTop: Platform.OS === 'android' ? HP('2') : 0,
  },
  skipTxtStyle: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.Poppins_Light,
    top: Platform.OS === 'android' ? HP('2') : HP('2.5'),
  },
  activeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.p4,
  },
  inActiveDotStyle: {
    width: 17,
    height: 17,
    borderRadius: 10,
    marginHorizontal: -5,
    backgroundColor: colors.g16,
  },
});

export default styles;
