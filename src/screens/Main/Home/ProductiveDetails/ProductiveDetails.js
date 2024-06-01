import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  FlatList,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { Card, Rating } from 'react-native-elements';
import { appIcons, appImages, appLogos } from '../../../../utilities';
import { ServiceRating } from '../../../../components';
import { useSelector } from 'react-redux';

const ProductiveDetails = ({ navigation, route }) => {
  const { businessDetails } = useSelector(state => state.business);
  console.log('cinema service data here ', businessDetails)
  const [companyId, setCompanyId] = useState();
  const [data2, setData2] = useState();

  const [data, setData] = useState([]);
  const modalizeRefServiceRating = useRef(null);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const { item } = route?.params;
    console.log('item ', item)
    if (data2 != undefined) {
      setData(data2);
    } else {
      setData(item);
    }
    let searchedArray = businessDetails.filter(i => i?.CompanyId === data?.CompanyId);
    setData2(searchedArray[0])
    console.log('searched ', searchedArray[0], 'data2 ', data2);

  }, [route.params, data2, businessDetails]);

  const handleMap = (lat, lng) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  const renderItem = ({ item, index }) => {
    setCompanyId(data.CompanyCategoryId)
    return (
      <View style={styles.itemContainer}>
        <Card containerStyle={styles.cardStyle}>
          <View style={styles.cardViewStyle}>
            <Image
              style={styles.imgStyle}
              source={{
                uri:
                  item?.ServiceImage_1 ||
                  item?.ServiceImage_2 ||
                  item?.ServiceImage_3,
              }}
            />
            <View style={styles.contentContainer}>
              <Text style={styles.nameTxtStyle}>{item?.ServiceName}</Text>

              <TouchableOpacity activeOpacity={0.7}
                onPress={() => {
                  setModalData(item);
                  modalizeRefServiceRating.current?.open();
                }}
                style={styles.ratingContainer}>
                <Rating
                  readonly
                  imageSize={12}
                  style={{ left: 3 }}
                  startingValue={item?.ServiceRatingPercentage}
                />
                <Text style={styles.ratingTxtStyle}>
                  {' '}
                  ({item?.ServiceRatingPercentage})
                </Text>
              </TouchableOpacity>
              <View style={styles.rowContainer1}>
                <Image
                  resizeMode="contain"
                  style={styles.locIconStyle}
                  source={appIcons.location}
                />
                <Text numberOfLines={2} style={styles.locTxtStyle}>
                  Location
                </Text>
                <TouchableOpacity activeOpacity={1} style={styles.btnContainer}>
                  <Text style={styles.btnTxtStyle}>
                    {item?.SerivcePrice} {item?.CurrencyName}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <Image
        resizeMode="contain"
        style={styles.logoStyle}
        source={appLogos.appLogo}
      />
      <TouchableOpacity style={styles.weIconBackBtn} activeOpacity={1} onPress={() => navigation.navigate('BusinessArea')}
      />
      <View style={styles.companyDetailContainer}>
        <Text style={styles.comNameTxtStyle}>{data?.CompanyName}</Text>
      </View>
      <Image style={styles.compImgStyle} source={{ uri: data?.CompanyIcon }} />
      <Text style={styles.descTxtStyle}>Company Description</Text>
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

    </SafeAreaView>
  );
};

export default ProductiveDetails;
