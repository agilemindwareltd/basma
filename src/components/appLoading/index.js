import React from 'react';
import { View, } from 'react-native';
import { appLogos, WP, HP } from '../../utilities';
import * as Animatable from 'react-native-animatable';

export const AppLoading = () => (
    <View style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(0,0,0,0.6)" }}>
        <Animatable.Image
            easing="linear"
            duration={2000}
            animation="rotate"
            resizeMode="contain"
            useNativeDriver={true}
            iterationCount="infinite"
            source={appLogos.appLogo}
            style={{
                width: WP('25%'),
                height: HP('25%'),
            }}
        />

    </View>
);
