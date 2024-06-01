import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as NB from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
    Platform,
    StyleSheet,
    StatusBar,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import FastImage from 'react-native-fast-image';
import { RNCamera } from "react-native-camera";
import CameraRoll from '@react-native-community/cameraroll';

import { Icons, Fonts, Colors } from '@config';
import { CommunityActions } from "@store/actions";
import { ModalImage } from '@components';

// Completed
export default AccountCamera = (props) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(false);
    const [front, setFront] = useState(false);
    const [flash, setFlash] = useState(false);

    const [image, setImage] = useState(false);
    const [images, setImages] = useState(false);
    const [record, setRecord] = useState(false);
    const [time, setTime] = useState(0);
    const [timeI, setTimeI] = useState(null);

    const onShoot = async (camera) => {
        if (type) {
            if (!record) {
                setRecord(true);
                var i = 0;
                setTimeI(setInterval(() => {
                    i = i + 1;
                    setTime(i);
                }, 1000));
                const { uri, codec = 'mp4' } = await camera.recordAsync();
                CameraRoll.save(uri);
                setTimeout(() => dispatch(CommunityActions.isCamera()), 1000);
                props.navigation.pop();
            } else {
                setRecord(false);
                clearInterval(timeI);
                camera.stopRecording();
            }
        } else {
            const result = await camera.takePictureAsync();
            setImage(true);
            setImages(result);
        }
    }

    return (
        <NB.Container style={styles.container}>
            <NB.Header style={styles.header} transparent={true}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 30, height: 30 }} onPress={() => props.navigation.pop()}>
                    <FastImage source={Icons.community_close1} style={{ width: 14, height: 14 }} resizeMode={FastImage.resizeMode.contain} />
                </TouchableOpacity>
                <Text style={styles.title}>Photo</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: 30 }} />
            </NB.Header>
            <RNCamera
                useNativeZoom={true}
                style={styles.camera}
                captureAudio={true}
                type={front ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
                flashMode={flash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                // videoStabilizationMode={type ? RNCamera.Constants.VideoStabilization['standard'] : RNCamera.Constants.VideoStabilization['off']}
                defaultVideoQuality={RNCamera.Constants.VideoQuality['480p']}
                permissionDialogTitle={"Permission to use camera"}
                permissionDialogMessage={"We need your permission to use your camera"}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel'
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel'
                }}
            >
                {({ camera }) => {
                    return (
                        <View style={styles.bottom}>
                            <View style={styles.bottomWrapper}>
                                <TouchableOpacity onPress={() => setFlash(!flash)}>
                                    <FastImage source={flash ? Icons.flash : Icons.flashOff} style={{ backgroundColor: "#fff", height: 30, width: 25 }} resizeMode={FastImage.resizeMode.contain} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shootButton} onPress={() => onShoot(camera)}>
                                    <View style={styles.shoot2Button}>
                                        <View style={styles.shoot3Button}>
                                            {type && (<Text style={{ fontFamily: Fonts.book, fontSize: 14, color: Colors.red }}>{moment.utc(time * 1000).format('m:ss')}</Text>)}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setFront(!front)}>
                                    <Icon name='ios-camera-reverse' style={{ color: Colors.black, fontSize: 35 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.type}>
                                <TouchableOpacity style={[styles.button, { borderBottomColor: !type ? Colors.black : Colors.white }]} disabled={!type} onPress={() => setType(false)}>
                                    <Text style={{ fontFamily: Fonts.medium, fontSize: 16, color: !type ? Colors.primary : Colors.darkGray }}>Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, { borderBottomColor: type ? Colors.black : Colors.white }]} disabled={type} onPress={() => setType(true)}>
                                    <Text style={{ fontFamily: Fonts.medium, fontSize: 16, color: type ? Colors.primary : Colors.darkGray }}>Video</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            </RNCamera>
            <ModalImage
                visible={image}
                data={images}
                onDismiss={() => setImage(false)}
                onDone={(result) => {
                    CameraRoll.save(result.uri);
                    setTimeout(() => dispatch(CommunityActions.isCamera()), 1000);
                    props.navigation.pop();
                }}
            />
        </NB.Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderBottomColor: Colors.light30Gray,
        borderBottomWidth: 1,
        zIndex: 999999999999999999,
    },
    title: {
        fontFamily: Fonts.medium,
        fontSize: 18,
        color: Colors.black
    },
    camera: {
        flex: 1,
        height: hp('100%'),
    },
    type: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp('100%'),
        height: (Platform.OS === 'ios' && (
            DeviceInfo.getModel() === 'iPhone X' ||
            DeviceInfo.getModel() === 'iPhone XS' ||
            DeviceInfo.getModel() === 'iPhone XS Max' ||
            DeviceInfo.getModel() === 'iPhone XR' ||
            DeviceInfo.getModel() === 'iPhone 11' ||
            DeviceInfo.getModel() === 'iPhone 11 Pro' ||
            DeviceInfo.getModel() === 'iPhone 11 Pro Max' ||
            DeviceInfo.getModel() === 'iPhone 12 mini' ||
            DeviceInfo.getModel() === 'iPhone 12' ||
            DeviceInfo.getModel() === 'iPhone 12 Pro' ||
            DeviceInfo.getModel() === 'iPhone 12 Pro Max'
        )) ? 65 : 40,
        paddingBottom: (Platform.OS === 'ios' && (
            DeviceInfo.getModel() === 'iPhone X' ||
            DeviceInfo.getModel() === 'iPhone XS' ||
            DeviceInfo.getModel() === 'iPhone XS Max' ||
            DeviceInfo.getModel() === 'iPhone XR' ||
            DeviceInfo.getModel() === 'iPhone 11' ||
            DeviceInfo.getModel() === 'iPhone 11 Pro' ||
            DeviceInfo.getModel() === 'iPhone 11 Pro Max' ||
            DeviceInfo.getModel() === 'iPhone 12 mini' ||
            DeviceInfo.getModel() === 'iPhone 12' ||
            DeviceInfo.getModel() === 'iPhone 12 Pro' ||
            DeviceInfo.getModel() === 'iPhone 12 Pro Max'
        )) ? 25 : 0,
        backgroundColor: Colors.white,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('50%'),
        height: '100%',
        borderBottomWidth: 2
    },
    bottom: {
        position: 'absolute',
        bottom: 0
    },
    bottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        alignItems: 'center',
        width: wp('100%'),
        backgroundColor: Colors.white
    },
    shootButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.darkGray
    },
    shoot2Button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.white
    },
    shoot3Button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: Colors.white
    }
});
