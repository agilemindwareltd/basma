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
    txtStyle: {
        bottom: 7,
        color: colors.white,
        fontSize: size.xxlarge,
        fontFamily: family.Poppins_Regular,
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
    buttonStyle: {
        bottom: -40,
        paddingHorizontal: 35,
        alignSelf: 'center',
        borderRadius: WP('20'),
        height: 70,
        paddingTop: 10,
        backgroundColor: colors.bg3,
    },

    buttonTxtStyle: {
        alignSelf: 'center',
        color: colors.white,
        fontSize: size.small,
        fontFamily: family.Poppins_SemiBold,
        top: Platform.OS === 'android' ? 1 : 0,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
});

export default styles;
