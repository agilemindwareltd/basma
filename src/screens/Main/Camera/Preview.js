import React, {useState, useEffect, Component, createRef} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native'
import {appIcons, WP, appLogos} from '../../../utilities'
import Video from 'react-native-video'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {width, height} = Dimensions.get('window')

const Preview = ({route, navigation}) => {
  const {sourceUrl} = route.params
  const [isPhoto, setIsPhoto] = React.useState(false)
  const [paused, setPaused] = React.useState(true)

  React.useEffect(() => {
    const isImage = sourceUrl.indexOf('jpg') > -1 ? true : false
    setIsPhoto(isImage)
  }, [sourceUrl])

  const videoRef = React.createRef()
  const goBack = () => {
    navigation.pop()
  }
  const videoError = () => {
    console.log('Video-------error')
  }
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
    setSelectedMusic(JSON.parse(music))
  }
  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        {!isPhoto && selectedMusic?.MusicPath !== '' && (
          <Video
            source={{
              uri: selectedMusic?.MusicPath,
            }} // Can be a URL or a local file.
            ref={videoRef} // Store reference
            // fullscreen={true}
            audioOnly={true}
            onLoad={data => {
              if (data.duration === data.currentTime) {
                console.warn('done')
              }
            }}
            onProgress={data => {
              // if (data.currentTime) {
              //   setPaused(true)
              // }
            }}
            repeat={true}
            paused={paused}
            onError={videoError} // Callback when video cannot be loaded
            style={styles.musicContainer}
            resizeMode='contain'
            controls={false}
          />
        )}
        {isPhoto ? (
          <Image
            source={{uri: sourceUrl}}
            resizeMode='cover'
            style={styles.previewImage}
          />
        ) : (
          <Video
            source={{uri: sourceUrl}} // Can be a URL or a local file.
            ref={videoRef} // Store reference
            fullscreen={true}
            onError={videoError} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
            resizeMode='contain'
            controls={true}
          />
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.addEffect}>
          <TouchableOpacity>
            <Image
              source={appIcons.sticker}
              resizeMode='contain'
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={appIcons.textDesign}
              resizeMode='contain'
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={appIcons.frame}
              resizeMode='contain'
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.confrimContainer}>
          <TouchableOpacity onPress={goBack}>
            <Image
              source={appIcons.closeIcon}
              resizeMode='contain'
              style={styles.bottomIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logo}>
            <Image
              source={appLogos.appLogo}
              resizeMode='contain'
              style={styles.logoIcon}
            />
            <Text style={styles.logoText}>We were Here</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={appIcons.nextIcon}
              resizeMode='contain'
              style={styles.bottomIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  previewImage: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    width: WP('100%'),
  },
  addEffect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    paddingVertical: 10,
    backgroundColor: 'gray',
  },
  confrimContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  iconStyle: {
    width: 40,
    backgroundColor: 'transparent',
    height: 40,
  },
  logoIcon: {
    width: 50,
    backgroundColor: 'transparent',
    height: 50,
  },
  bottomIcon: {
    width: 30,
    backgroundColor: 'transparent',
    height: 30,
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    color: 'white',
  },
  backgroundVideo: {
    height: height - 87,
    width: width,
  },
})
export default Preview
