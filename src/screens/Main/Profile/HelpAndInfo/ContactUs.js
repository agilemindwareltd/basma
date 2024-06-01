import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { appImages, appLogos, HP, appIcons } from '../../../../utilities';
import styles from './styles';

const ContactUs = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.mainContainer} source={appImages.splashBg}>
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.rowDirection}>
              <TouchableOpacity onPress={() => navigation.pop()}>
                <Animatable.Image
                  easing="linear"
                  duration={5000}
                  animation="rotate"
                  resizeMode="contain"
                  useNativeDriver={true}
                  iterationCount="infinite"
                  source={appLogos.appLogo}
                  style={styles.imageStyles}
                />
              </TouchableOpacity>
              <View style={[styles.w_40, styles.center, { marginTop: HP("3%") }]}>
                <Text style={[styles.mainHeading, styles.colorWhite]}>
                  Contact Us
                </Text>
              </View>
            </View>
            <View style={[styles.center, { marginTop: HP('7%') }]}>
              <Text style={[[styles.colorWhite, styles.subHeading]]}>
                We Were Here Team
              </Text>
              <Text
                style={[
                  [styles.colorWhite, styles.linkFont, { marginTop: HP('4%') }],
                ]}>
                We are here to help you!
              </Text>
              <TouchableOpacity
                style={styles.profileLinks}
                onPress={() => {
                  Linking.openURL('mailto:info@wewerehere.online');
                }}>
                <Text style={[styles.colorWhite, styles.linkFont]}>
                  <Image
                    source={appIcons.email}
                    style={styles.icon}
                    resizeMode={'contain'}
                  />
                  {'  '}
                  info@wewerehere.online
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ContactUs;
