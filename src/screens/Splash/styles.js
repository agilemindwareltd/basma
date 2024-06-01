import {StyleSheet} from 'react-native';
import {colors, HP, WP} from '../../utilities';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  imageStyles: {
    width: WP('45%'),
    height: HP('22%'),
    alignSelf: 'center',
  },
});

export default styles;
