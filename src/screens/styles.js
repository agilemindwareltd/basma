import {Dimensions, StyleSheet, Platform} from 'react-native';
import {colors, HP, WP, size, family} from '../utilities';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  error: {
    color: colors.red,
    alignSelf:'center'
  },
});

export default styles;
