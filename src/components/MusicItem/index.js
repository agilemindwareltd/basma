import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import OneMusicItem from './OneMusicItem'
import {colors} from '../../utilities'
const {width, height} = Dimensions.get('window')

export const MusicItem = ({item, soundId, soundSelected}) => {
  const {CountryName, Musics} = item
  return (
    <View style={styles.musicView}>
      <Text style={styles.itemTitle}>{CountryName}</Text>
      <View style={styles.musicItem}>
        {Musics.map((oneMusic, index) => {
          return (
            <OneMusicItem
              soundId={soundId}
              soundSelected={soundSelected}
              item={oneMusic}
              key={`oneMusic-${index}`}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  musicView: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemTitle: {
    color: 'white',
    fontSize: 17,
    textAlign: 'left',
  },
  musicItem: {
    padding: 5,
    width: '100%',
  },
})
