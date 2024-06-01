import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Image, TouchableOpacity
} from 'react-native';

import moment from 'moment';
import * as Animatable from 'react-native-animatable';

import {
  appIcons,
  appImages,
  appLogos,
  WP,
} from '../../../../utilities';
import styles from './styles';

const Ratings = ({ route,navigation }) => {
  let { rating, noOfReviews, userName } = route?.params?.data
  let allReviews = route?.params?.allReviews
  console.log(allReviews)
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.mainContainer} source={appImages.ratingBg}>
        <ScrollView>
          <View
            style={[
              styles.columnDirection,
              styles.center,
              styles.alignCenter,
              styles.h40,
              { paddingTop: 55 },
            ]}>
            <TouchableOpacity onPress={() => navigation.pop()} activeOpacity={0.8}>
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
            <Text
              style={[styles.subHeading, styles.colorWhite, { marginTop: 15 }]}>
              {userName}
            </Text>
            <View style={[styles.rowDirection, styles.center, { marginTop: 5 }]}>
              <Image source={appIcons.star} style={[styles.iconStar]} />
              <Text
                style={[styles.subHeading, styles.colorWhite, { marginTop: 3 }]}>
                {'  '}({rating}) {noOfReviews} Reviews
              </Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 6 }}>
            <Text style={[styles.subHeading, styles.colorWhite]}>
              Previous Reviews
            </Text>
            {allReviews &&
              allReviews.map((item, index) => {
                return (
                  <View
                    style={[styles.rowDirection, { marginVertical: 15 }]}
                    key={index}>
                    <View style={([styles.center], { width: WP('18%') })}>
                        <Image
                        source={{ uri: item.userImage && item.userImage }}
                           style={{ width: 70, height: 70, borderRadius: 35 }}
                      />
                    </View>
                    <View style={{ width: WP('82%'), marginLeft: 15 }}>
                      <Text style={[styles.subHeading, styles.colorWhite]}>
                        {item.userName && item.userName}
                      </Text>
                      <Text
                        style={[
                          styles.xsubHeading,
                          styles.colorGray,
                          { marginTop: 10 },
                        ]}>
                        {moment(item.RateDate).format('ll')}
                      </Text>
                      <View style={[styles.rowDirection, { marginTop: 4 }]}>
                        {[0, 1, 2, 3, 4].map((items) =>
                          <Image
                            tintColor={item.Rate <= items && 'gray'}
                            source={appIcons.star}
                            key={items}
                            style={[styles.iconStar, { marginHorizontal: 2 }]} />)}
                      </View>
                      <Text
                        style={[
                          styles.subHeading,
                          styles.colorWhite,
                          { marginTop: 8 },
                        ]}>
                        {item.Review}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Ratings;
