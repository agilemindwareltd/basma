import { Dimensions, StyleSheet, Platform } from 'react-native';
import { colors, HP, WP, size, family } from '../../../../utilities';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    width: WP('100%'),
    paddingTop: size.xxtiny,
  },
  rowDirection: {
    flexDirection: 'row',
  },
  columnDirection: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  mainHeading: {
    fontSize: size.h5,
    letterSpacing: 1,
  },
  subHeading: {
    fontSize: size.medium,
    letterSpacing: 0.5,
  },
  xsubHeading: {
    fontSize: size.xsmall,
    letterSpacing: 0.5,
  },
  colorWhite: {
    color: colors.white,
  },
  colorGray: {
    color: colors.g3,
  },
  colorPrimary: {
    color: colors.p1,
  },
  iconStar: {
    width: WP('6%'),
    height: HP('4%'),
  },
  h40: {
    height: HP('40%'),
  },
  imageStyles: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  positionRelative: {
    position: 'relative',
  },
  positionAbsolute: {
    position: 'absolute',
  },
  textInput: {
    height: 90,
    borderWidth: 1,
    borderColor: '#FF8CFF',
    borderRadius: 15,
    paddingHorizontal: 10,
    color: "#fff",
    backgroundColor: '#000',
    marginVertical: 10,
  },
  selectionAreaHorizontal: {
    backgroundColor: 'rgb(0,0,0)',
    borderWidth: 1.5,
    borderColor: '#FF8CFF',
    height: 80,
    width: 80,
    marginVertical: 10,
    borderRadius: 15,
    marginRight: 7,
  },
});

export default styles;
