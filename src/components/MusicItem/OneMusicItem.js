import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {CheckBox} from 'react-native-elements'
import Video from 'react-native-video'

const OneMusicItem = ({item, soundId, soundSelected}) => {
  const {Name, Singer, DurationSecond, MusicPath, Id} = item
  const [isCheck, setIsCheck] = React.useState(false)
  const [pause, setPause] = React.useState(true)
  const handleCheck = () => {
    // setIsCheck(!isCheck)
    if (soundId && soundId == Id) {
      soundSelected('', null)
    } else {
      soundSelected(item, Id)
    }
  }
  const videoRef = React.createRef()
  const videoError = () => {
    console.log('Video-------error')
  }

  const onplay = () => {
    setPause(!pause)
  }

  return (
    <View style={styles.musicView}>
      <Video
        source={{
          uri: MusicPath,
        }} // Can be a URL or a local file.
        ref={videoRef} // Store reference
        // fullscreen={true}
        audioOnly={true}
        paused={pause}
        onError={videoError} // Callback when video cannot be loaded
        style={styles.musicContainer}
        resizeMode='contain'
        controls={false}
      />
      <TouchableOpacity
        style={styles.avatar}
        onPress={onplay}></TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.contentText}>{Name}</Text>
        <Text style={styles.contentText}>{Singer}</Text>
        <Text style={styles.contentText}>{DurationSecond}</Text>
      </View>
      <View style={styles.checkStyle}>
        <CheckBox
          center
          checked={soundId === Id}
          checkedColor='white'
          onPress={() => handleCheck()}
        />
        {/* <TouchableOpacity onPress={onplay}>
          <Text style={styles.contentText}>{pause ? 'Play' : 'Pause'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAdd}>
          <Text style={styles.contentText}>{'Add'}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  musicView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    position: 'relative',
  },
  avatar: {
    width: 95,
    height: 80,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 15,
  },
  content: {
    flexDirection: 'column',
  },
  contentText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  checkStyle: {
    right: 0,
    position: 'absolute',
  },
})

export default OneMusicItem
