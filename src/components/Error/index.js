import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { colors, family, } from '../../utilities';

export const Error = ({ errorMsg, disableError }) => { 
    return (
        <View style={styles.mainView}>
            <View style={styles.errorcontainer}>
                <Text style={{ color: 'white', width: "90%", fontFamily: family.Poppins_Regular, }}>{errorMsg}</Text>
                <TouchableOpacity style={{ width: "10%", justifyContent: "center", alignItems: "center" }} onPress={disableError}>
                    <Text style={{ color: colors.p1, }}>OK</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    errorcontainer: {
        paddingVertical: 15,
        position: "absolute",
        paddingHorizontal: 20,
        bottom: 10,
        borderRadius: 5,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        backgroundColor: colors.b4
    }
});
