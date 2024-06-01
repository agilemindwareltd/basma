import {Platform, StyleSheet} from 'react-native';
import {colors, HP} from '../../../../utilities';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  weIconBackBtn: {
    left: HP(3),
    borderRadius: 15,
    height: HP(6),
    width: HP(6.6),
    position: 'absolute',
    top: 58,
  },
  imgStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    height: Platform.OS === 'android' ? '110%' : '100%',
  },
});

export default styles;
