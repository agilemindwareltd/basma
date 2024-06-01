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
    paddingHorizontal: size.h6,
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
  imageStyles: {
    width: WP('35%'),
    height: HP('14%'),
    top: Platform.OS === 'android' ? HP('1') : HP('5'),
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
    fontSize: size.tiny,
    letterSpacing: 0.5,
  },
  colorWhite: {
    color: colors.white,
  },
  colorGray: {
    color: colors.g3,
  },
  iconStar: {
    width: WP('6%'),
    height: HP('4%'),
  },
  h40: {
    height: HP('40%'),
  },
  uploadingArea: {
    height: HP('20%'),
    borderColor: '#fff',
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 25,
  },
  uploadImage: {
    width: WP('20%'),
    height: HP('10%'),
  },
  defaultIcon: {
    width: WP('82%'),
    height: HP('16%'),
    // borderRadius:15,
  },
  selectionAreaHorizontal: {
    backgroundColor: 'rgba(69,56,94,0.4)',
    height: HP('18%'),
    width: WP('25%'),
    marginVertical: 10,
    borderRadius: 15,
    marginRight: 15,
  },
  servicesSelectionAreaHorizontal: {
    backgroundColor: 'rgb(69,56,94)',
    height: HP('13%'),
    width: WP('22%'),
    marginVertical: 10,
    borderRadius: 15,
    marginRight: 15,
  },
  textInputProfile: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    color: colors.white,
    padding: 4,
    fontWeight: '400',
    fontSize: size.tiny,
  },
  positionRelative: {
    position: 'relative',
  },
  positionAbsolute: {
    position: 'absolute',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  absWorkForDltIcon: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: colors.p1,
    right: 10,
    top: 5,
    padding: 5,
    borderRadius: 20
  }
});

export default styles;
