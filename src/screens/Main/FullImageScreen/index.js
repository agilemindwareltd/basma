import React from 'react';
import {
    View,
    Image,
} from 'react-native';
const FullImageScreen = ({ route }) => {
    console.log(route.params, 'asdasdasdas')
    return (
        <View style={{ height: '100%', width: "100%", justifyContent: 'center', alignItems: 'center' }}>
            {route.params && route.params !== '' &&
                <Image source={{ uri: route.params['imgPath'] }} resizeMode="contain" style={{ height: '100%', width: '100%' }} />
            }
        </View>
    );
};

export default FullImageScreen;
