import axios from 'axios'
import React, {useState, useEffect, Component, createRef} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native'
import {MusicItem} from '../../../components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {appIcons, WP, appLogos} from '../../../utilities'
import {mockUp} from './mockUp'
import Video from 'react-native-video'

const {width, height} = Dimensions.get('window')

const AddSound = ({navigation}) => {
  const [sound, setSound] = React.useState(null)
  const [soundId, setSoundId] = React.useState(null)

  const goBack = back => {
    if (back) {
      // navigation.goBack(null)
    } else {
      console.warn('sound', sound)

      // navigation.navigate('Camera', {sound})
      AsyncStorage.setItem('sound', JSON.stringify(sound))
      navigation.navigate('Camera')
    }
  }

  const soundSelected = (sound, soundId) => {
    setSound(sound)
    setSoundId(soundId)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.musicContainer}>
          <Image
            source={appIcons.addAudio}
            resizeMode='contain'
            style={styles.iconStyle}
          />
          <Text style={styles.timeText}>Sounds</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.soundContainer}>
        <ScrollView>
          {mockUp.map((item, index) => {
            return (
              <MusicItem
                item={item}
                soundId={soundId}
                soundSelected={soundSelected}
                key={`music-${index}`}
              />
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.confrimContainer}>
          <TouchableOpacity onPress={() => goBack(true)}>
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
          <TouchableOpacity onPress={() => goBack(false)}>
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
  topContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundContainer: {
    flex: 0.9,
    borderWidth: 1,
    borderColor: 'white',
  },
  musicContainer: {
    flexDirection: 'row',
    width: 130,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },

  bottomContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 0.1,
    width: WP('100%'),
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
  timeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
})
export default AddSound
