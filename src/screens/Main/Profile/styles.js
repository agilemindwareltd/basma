import { Dimensions, StyleSheet, Platform } from 'react-native';
import { colors, HP, WP, size, family } from '../../../utilities';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    width: WP('100%'),
    paddingHorizontal: size.h5,
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
    alignItems: "center"
  },
  imageStyle: {
    width: WP('15%'),
    height: HP('11%'),
    top: Platform.OS === 'android' ? HP('1') : HP('5'),
  },
  imageStyles: {
    width: WP('17%'),
    height: HP('12%'),
    top: Platform.OS === 'android' ? HP('1') : HP('5'),
  },
  mainHeading: {
    fontSize: size.h5,
    letterSpacing: 1,
  },
  subHeading: {
    fontSize: size.small,
    letterSpacing: 1,
  },
  profileInfoText: {
    fontSize: size.xxsmall,
    letterSpacing: 1,
  },
  colorWhite: {
    color: colors.white,
  },
  w_45: {
    width: WP('45%'),

  },
  profileImage: {
    width: 95,
    height: 95,
    left:2.5,
    top:2.5,
    borderRadius: 50,
  },
  defaultuserIcon: {
    width: 50,
    height: 50,
    top:25,
    borderRadius: 0,
  },
  profileViewBtn: {
    width: WP('44%'),
    height: 65,
    // marginTop: 5,
  },
  profileBtnTxt: {
    position: 'absolute',
    // top: HP('3.7%'),
    // left: WP('6.5%'),
    // width: WP('40%'),
  },
  profileLinks: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    // backgroundColor:'red',
    alignItems: 'center',
    // height: HP('6.5%')
    // paddingVertical:5
    marginTop:10
  },
  linkFont: {
    fontSize: size.small,
  },
  icon: {
    width: 30,
    height: 30,
  },
  balancer: {
    marginVertical: 20,
  },
  positionRelative: {
    position: 'relative',
    justifyContent:'center',
    alignItems:"center"
  },
  positionAbsolute: {
    position: 'absolute',
  },
  textInputProfile: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    color:colors.white,
    padding: 4,
    fontWeight: '500',
  },
  passTxtStyle: {
    left: 5,
    color: colors.white,
    fontSize: size.small,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  iconStar: {
    width: WP('5%'),
    height: HP('5%'),
  },
  verticalBoxes: {
    width: WP('23%'),
    height: HP('14%'),
    justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    borderWidth: 2,
    borderColor: '#CC3D8F',
    borderRadius: 20,
    position: 'relative',
  },
  followUpInfoTxt: {
    width: WP('12%'),
    textAlign: 'left',
    borderRightWidth: 0.6,
    borderColor: colors.white,
    fontWeight: 'bold',
  },
  followUpInfoTxtNoBorder: {
    width: WP('12%'),
    textAlign: 'left',
    fontWeight: 'bold',
  },
  cameraIconProfileScreen: { bottom: 0, height: 45, width: 45, backgroundColor: "#120233", borderRadius: 25, left: WP('25%') }
});

export default styles;
