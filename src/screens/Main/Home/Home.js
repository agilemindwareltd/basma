import React, {useState} from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  TextInput,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'
import {appIcons, appImages, appLogos} from '../../../utilities'

const Home = ({navigation, route}) => {
  const [search, setSearch] = useState('')
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      // const music = route
      console.warn('music', route)
    })
    // return unsubscribe
  }, [navigation])
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor='black' barStyle={'light-content'} />
      <ImageBackground style={styles.mainContainer} source={appImages.splashBg}>
        {Platform.OS === 'android' ? null : <View style={{flex: 0.05}} />}
        <View style={styles.srchContainer}>
          <Image
            resizeMode='contain'
            source={appLogos.appLogo}
            style={styles.imageStyles}
          />
          <View style={styles.srchView}>
            <View style={styles.rowContainer}>
              <View style={{width: '88%'}}>
                <TextInput
                  value={search}
                  placeholder={'Search...'}
                  style={styles.inputStyle}
                  keyboardType={'default'}
                  placeholderTextColor={'white'}
                  onChangeText={txt => setSearch(txt)}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Image
                  resizeMode='contain'
                  source={appIcons.srch}
                  style={styles.srchIconStyle}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('Business')
            }}
            style={{alignItems: 'center'}}>
            <Image
              resizeMode='contain'
              source={appIcons.bsiness}
              style={styles.imageStyles1}
            />
            <Text style={styles.bsnsTxtStyle}>Business</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Home
