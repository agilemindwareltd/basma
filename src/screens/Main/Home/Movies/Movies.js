import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Linking,
  Platform,
  FlatList,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Icon, Card, Rating } from 'react-native-elements';
import { HP, WP, colors, appImages, appIcons } from '../../../../utilities';
import { ServiceRating } from '../../../../components';
import { useSelector } from 'react-redux';

import styles from './styles';

const Movies = ({ navigation, route }) => {
  const { businessDetails } = useSelector(state => state.business);
  console.log('cinema service data here ', businessDetails)

  const [companyId, setCompanyId] = useState();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState();
  const modalizeRefServiceRating = useRef(null);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const { item } = route?.params;
    if (data2 != undefined) {
      setData(data2);
    } else {
      setData(item);
    }
    let searchedArray = businessDetails.filter(i => i?.UserId === data?.UserId);
    setData2(searchedArray[0])
    console.log('searched ', searchedArray[0], 'data2 ', data2);

  }, [route.params, data2, businessDetails]);
  //console.log('data ', data)
  const handleMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    // const latLng = `${50.094998},${26.427577}`;
    const latLng = `${data?.CompanyLatitude},${data?.CompanyLongitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  const handleCall = () => {
    let phoneNumber = data?.CompanyTelephone;
    console.log('Number is ==> ', phoneNumber);
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${data?.CompanyTelephone}`;
    } else {
      phoneNumber = `tel:${data?.CompanyTelephone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  const renderItem = ({ item, index }) => {
    setCompanyId(data.CompanyCategoryId)
    return (
      <Card containerStyle={styles.cardStyle}>
        <View style={styles.cardViewStyle}>
          <View style={{ flex: 0.7 }}>
            <Image
              resizeMode="cover"
              style={styles.imgStyle}
              source={{
                uri:
                  item?.ServiceImage_1 ||
                  item?.ServiceImage_2 ||
                  item?.ServiceImage_3,
              }}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.nameTxtStyle}>{item.CurrencyName}</Text>
            <TouchableOpacity activeOpacity={0.7}
              onPress={() => {
                setModalData(item);
                modalizeRefServiceRating.current?.open();
              }}
              style={styles.ratingContainer}>
              <Rating
                readonly
                imageSize={10}
                style={{ left: 3 }}
                // tintColor={colors.bg8}
                startingValue={Math.round(item?.ServiceRatingPercentage)}
              />
              <Text style={styles.ratingTxtStyle}>
                {'  '}({item?.ServiceNumberOfRating})
              </Text>
            </TouchableOpacity>
            <Text style={styles.txtStyle} numberOfLines={2}>
              {item?.ServiceDescription}
            </Text>
            <Text style={styles.txtStyle}>Price: {item?.SerivcePrice}</Text>
          </View>
          <View style={styles.iconsContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleMap()}>
              <Image style={styles.iconStyle1} source={appIcons.location} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleCall()}>
              <Image style={styles.iconStyle2} source={appIcons.call} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.imageStyle} source={appImages.cinma}>
        <View style={{ width: WP('15') }}>
          <Icon
            type={'MaterialIcons'}
            name={'keyboard-backspace'}
            color={'white'}
            size={HP('3.5')}
            style={styles.iconStyle}
            onPress={() => navigation.goBack()}
          />
        </View>
      </ImageBackground>
      <Text style={styles.titleTxtStyle}>Coming Movies</Text>
      <View style={styles.viewContainer}>
        {data?.ServicesList === undefined ||
          data?.ServicesList?.length === 0 ? (
          <Text style={styles.recordsTextStyle}>No Records Found</Text>
        ) : (
          <FlatList
            data={data?.ServicesList}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => (item + index).toString()}
          />
        )}
      </View>
      <ServiceRating modalizeRef={modalizeRefServiceRating} companyId={companyId} modalData={modalData} />

    </View>
  );
};

export default Movies;
