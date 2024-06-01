import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { colors, HP, WP, family, size } from '../../utilities';
import { appImages } from '../../assets';
import { Rating } from 'react-native-elements';

const { width } = Dimensions.get('window');

export const UserCard = ({ item, isRating, isReview }) => {
  return (
    <View style={{marginVertical: 5}}>
      <View style={styles.mainContainer}>
        <ImageBackground
          style={styles.circleImgStyle}
          source={appImages.circle}>
          <Image
            resizeMode="contain"
            source={{ uri: item?.userImage }}
            style={styles.profileImgStyle}
          />
        </ImageBackground>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>{item?.userName}try</Text>
          <Text style={styles.dateStyle}>
            {isRating
              ? moment(item?.joinDate).format('ll')
              : moment(item?.experianceDate).format('ll')}
          </Text>
          {isRating ? (
            <View style={styles.ratingContainer}>
              <Rating
                readonly
                imageSize={20}
                tintColor={colors.g9}
                startingValue={item?.userRate}
              />
              <Text style={styles.ratingTxtStyle}>({item?.userCountRate})</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.subHeading}>
                {item?.experiancDescription}
              </Text>
            </View>
          )}
          {isReview ? (<View style={{marginTop: -25, width: '95%',}}>
            <View style={styles.ratingContainer}>
              <Rating
                readonly
                imageSize={20}
                tintColor={colors.g9}
                startingValue={item?.Rate}
              />
              <Text style={[styles.ratingTxtStyle, {marginTop: 5, }]}>({item?.Rate})</Text>
            </View>
            <View>
              <Text style={styles.subHeading}>
                {item?.Review}
              </Text>
            </View>
          </View>) : null}
        </View>
      </View>
      {isRating || isReview ? (
        <View />
      ) : (
        <View style={styles.searchView}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={item?.image1 ? styles.searchBtn : styles.searchBtn1}>
            <Image
              source={{ uri: item?.image1 }}
              style={
                item?.image1 ? styles.seacrhIconStyle1 : styles.seacrhIconStyle
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={item?.image2 ? styles.searchBtn : styles.searchBtn1}>
            <Image
              source={{ uri: item?.image2 }}
              style={
                item?.image2 ? styles.seacrhIconStyle1 : styles.seacrhIconStyle
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={item?.image3 ? styles.searchBtn : styles.searchBtn1}>
            <Image
              source={{ uri: item?.image3 }}
              style={
                item?.image3 ? styles.seacrhIconStyle1 : styles.seacrhIconStyle
              }
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '90%',
    flexDirection: 'row',
  },
  circleImgStyle: {
    width: WP('21'),
    height: WP('21'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContainer: {
    top: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTxtStyle: {
    marginLeft: HP('1'),
    color: colors.white,
    fontSize: size.tiny,
    justifyContent: 'center',
    fontFamily: family.Poppins_Regular,
  },
  profileImgStyle: {
    width: WP('16.56'),
    height: WP('16.56'),
    borderRadius: 100,
  },
  contentContainer: {
    marginLeft: HP('1'),
    marginTop: HP(1.5),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    color: colors.white,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Medium,
  },
  subHeading: {
    color: colors.white,
    fontSize: size.xxsmall,
    fontFamily: family.Poppins_Regular,
  },
  dateStyle: {
    color: colors.g3,
    fontFamily: family.Poppins_Regular,
    fontSize: size.xxsmall,
  },
  searchView: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchBtn: {
    left: WP('5'),
    borderWidth: 2,
    width: WP('20'),
    height: WP('20'),
    borderRadius: 10,
    margin: HP('0.5'),
    padding: HP('1.5'),
    alignItems: 'center',
    borderColor: colors.p1,
    justifyContent: 'center',
  },
  searchBtn1: {
    left: WP('5'),
    borderWidth: 0,
    width: WP('20'),
    height: WP('20'),
    borderRadius: 10,
    margin: HP('0.5'),
    padding: HP('1.5'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  seacrhIconStyle: {
    width: 30,
    height: 30,
  },
  seacrhIconStyle1: {
    width: WP('17'),
    height: WP('17'),
    borderRadius: WP('1'),
  },
});
