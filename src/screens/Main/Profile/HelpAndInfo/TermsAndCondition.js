// MAIN LIBRARIES 
import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

// SEMI LIBRARIES 
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

// COMPONENTS
import styles from './styles';
import {
  appImages,
  appLogos,
  HP,
  colors,
} from '../../../../utilities';

const TermsAndConditions = ({ navigation, route }) => {
  // HOOKS
  const { width } = useWindowDimensions();

  let termsAndCondition = route.params && route.params['token'] && route.params['token']
  const source = {
    html: `${termsAndCondition.Value}`
  };

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
              <View style={[styles.center, { marginTop: HP('3%') }]}>
                <Text style={[styles.termsHeading, styles.colorWhite]}>
                  Terms And Conditions
                </Text>
              </View>
            </View>
            <View style={[styles.center, { marginTop: HP('7%') }]}>
              <RenderHtml contentWidth={width} source={source} tagsStyles={tagsStyles} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const tagsStyles = {
  body: {
    color: colors.white,
    fontSize: 18,
    whiteSpace: 'normal',
    marginBottom: 15,
  },
};

export default TermsAndConditions;
