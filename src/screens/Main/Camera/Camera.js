import React, {useState, useEffect, Component} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native'
import moment from 'moment'
import {RNCamera} from 'react-native-camera'
import {appIcons} from '../../../utilities'
import Video from 'react-native-video'
import AsyncStorage from '@react-native-async-storage/async-storage'
import VideoEditing from 'react-native-video-editing'

const {width, height} = Dimensions.get('window')

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
)

const Camera = ({navigation, route}) => {
  const cameraRef = React.useRef(null)

  const [isFlip, setIsFlip] = React.useState(false)
  const [isAudio, setIsAudio] = React.useState(true)
  const [isBack, setIsBack] = React.useState(true)
  const [recordTime60, setRecordTime60] = React.useState(false)
  const [isVideoRecording, setIsVideoRecording] = React.useState(false)

  const [record, setRecord] = useState(false)
  const [time, setTime] = useState(0)
  const [timeI, setTimeI] = useState(null)

  React.useEffect(() => {
    if (!isVideoRecording) {
      setTime(0)
      clearInterval(timeI)
    }
  }, [isVideoRecording])

  const takePicture = async () => {
    console.log('photo')
    const options = {quality: 0.5, base64: true}
    try {
      const data = await cameraRef.current.takePictureAsync(options)
      const source = data.uri
      if (source) navigation.navigate('Preview', {sourceUrl: source})
    } catch (error) {
      console.log('error take picture', error)
    }
  }

  const takeRecord = async () => {
    var i = 0
    setTimeI(
      setInterval(() => {
        i = i + 1
        setTime(i)
      }, 1000),
    )
    try {
      const options = {
        quality: '720p',
        maxDuration: recordTime60 ? 60 : 30,
        videoBitrate: 8000000,
      }
      const promise = cameraRef.current.recordAsync(options)
      if (promise) {
        setIsVideoRecording(true)
        setPause(false)
        const data = await promise
        const source = data.uri
        const option = {
          video: {
            source: source,
          },
          audio: {
            source: selectedMusic?.MusicPath,
          },
          motion: VideoEditing.FILTER_SPEED_2X_FAST,
          videoQuality: VideoEditing.QUALITY_960x540,
          audioMatched: false,
        }
        VideoEditing.videoMotionFilter(option)
          .then(newSource => {
            console.warn('Success : ' + newSource)
            clearInterval(timeI)
            navigation.navigate('Preview', {sourceUrl: newSource})
            setIsVideoRecording(false)
          })
          .catch(error => {
            console.log('Error: ' + error)
          })
      }
    } catch (error) {
      throw error
    }
  }

  const endRecording = async () => {
    if (cameraRef.current) {
      setIsVideoRecording(false)
      console.log('stop recording')
      await cameraRef.current.stopRecording()
    }
  }
  const addSound = () => {
    navigation.navigate('AddSound')
  }
  const handleFlip = () => {
    console.log('Flip')
    setIsFlip(!isFlip)
  }

  const handleAudio = () => {
    setIsAudio(!isAudio)
  }

  const handleCameraType = () => {
    setIsBack(!isBack)
  }

  const addGallery = () => {
    console.log('add Gallery')
  }

  const handleRecordTime = () => {
    setRecordTime60(!recordTime60)
  }
  const errorAlert = error => {
    console.log('error Alerrt')
  }

  const videoRef = React.createRef()
  const videoError = () => {
    console.log('Video-------error')
  }

  const [pause, setPause] = React.useState(true)
  const [selectedMusic, setSelectedMusic] = React.useState('')

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      getMusic()
    })
    // return unsubscribe
  }, [navigation])

  const getMusic = async () => {
    const music = await AsyncStorage.getItem('sound')
    console.warn('music', music)
    setSelectedMusic(JSON.parse(music))
  }
  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={[styles.preview]}
        type={
          !isBack ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        }
        flashMode={
          isFlip
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        captureAudio={selectedMusic?.MusicPath === ''}
        defaultVideoQuality={RNCamera.Constants.VideoQuality['720p']}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera'}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }}
        onMountError={errorAlert}>
        {({camera, status}) => {
          if (status !== 'READY') return <PendingView />
          return (
            <>
              {selectedMusic?.MusicPath !== '' && (
                <Video
                  source={{
                    uri: selectedMusic?.MusicPath,
                  }} // Can be a URL or a local file.
                  ref={videoRef} // Store reference
                  // fullscreen={true}
                  audioOnly={true}
                  repeat={true}
                  paused={true}
                  onError={videoError} // Callback when video cannot be loaded
                  style={styles.musicContainer}
                  resizeMode='contain'
                  controls={false}
                />
              )}
              {isVideoRecording ? (
                <View style={styles.recording}>
                  <View style={styles.recordingDot} />
                  <Text style={styles.recordingText}>
                    {moment.utc(time * 1000).format('m:ss')}
                  </Text>
                </View>
              ) : null}
              <View style={styles.musicContainer1}>
                {selectedMusic?.Name !== '' && (
                  <Text style={styles.timeText}>{selectedMusic?.Name}</Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.musicContainer}
                onPress={addSound}>
                <Image
                  source={appIcons.addAudio}
                  resizeMode='contain'
                  style={styles.iconStyle}
                />
                <Text style={styles.timeText}>Add Sound</Text>
              </TouchableOpacity>

              <View style={styles.controlButton}>
                <TouchableOpacity onPress={handleFlip} style={styles.capture}>
                  {!isFlip ? (
                    <Image
                      source={appIcons.flashOff}
                      resizeMode='contain'
                      style={styles.iconStyle}
                    />
                  ) : (
                    <Image
                      source={appIcons.flashAuto}
                      resizeMode='contain'
                      style={styles.iconStyle}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleAudio}
                  style={styles.capture}
                  disabled={isVideoRecording}>
                  {!isAudio ? (
                    <Image
                      source={appIcons.speakMute}
                      resizeMode='contain'
                      style={styles.iconStyle}
                    />
                  ) : (
                    <Image
                      source={appIcons.speakOn}
                      resizeMode='contain'
                      style={styles.iconStyle}
                    />
                  )}
                </TouchableOpacity>

                {!isVideoRecording ? (
                  <TouchableOpacity
                    onPress={takePicture}
                    onLongPress={takeRecord}
                    style={styles.capture}>
                    <View style={styles.recordButton} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onLongPress={endRecording}
                    style={styles.capture}>
                    <View style={styles.stopVideoButton} />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={handleCameraType}
                  style={styles.capture}
                  disabled={isVideoRecording}>
                  {isBack ? (
                    <Image
                      source={appIcons.cameraSwitch}
                      resizeMode='contain'
                      style={styles.iconStyle}
                    />
                  ) : (
                    <Image
                      source={appIcons.cameraSwitch}
                      resizeMode='contain'
                      style={styles.iconStyle}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={addGallery} style={styles.capture}>
                  <Image
                    source={appIcons.gallery}
                    resizeMode='contain'
                    style={styles.iconStyle}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.timeSet}>
                <TouchableOpacity onPress={handleRecordTime}>
                  <Text
                    style={[
                      styles.timeText,
                      {color: recordTime60 ? 'white' : 'purple'},
                    ]}>
                    30
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRecordTime}>
                  <Text
                    style={[
                      styles.timeText,
                      {color: !recordTime60 ? 'white' : 'purple'},
                    ]}>
                    60
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )
        }}
      </RNCamera>
    </View>
  )
}

const styles = StyleSheet.create({
  musicContainer: {
    flexDirection: 'row',
    width: 140,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 40,
  },
  musicContainer1: {
    flexDirection: 'row',
    width: 140,
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controlButton: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
  },
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 0,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 30,
    backgroundColor: 'transparent',
    height: 30,
  },
  recordButton: {
    borderWidth: 12,
    borderColor: 'gray',
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  endCapture: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 0,
    alignSelf: 'center',
  },
  stopVideoButton: {
    width: 60,
    height: 60,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'purple',
    borderRadius: 30,
  },
  timeSet: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
  },
  timeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    color: '#fff',
  },
  recording: {
    alignSelf: 'center',
    position: 'absolute',
    top: 5,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 10,
  },
  recordingText: {
    color: 'white',
    fontSize: 20,
  },
})
export default Camera
