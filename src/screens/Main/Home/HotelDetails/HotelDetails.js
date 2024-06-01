import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  FlatList,
  Platform,
  StatusBar,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Icon, Card, Rating } from 'react-native-elements';
import { WhoWereHere, WhoWorkHere, CompanyORServiceRating, ServiceRating } from '../../../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { AppButton } from '../../../../components';
import { HP, WP, appIcons, size } from '../../../../utilities';
import styles from './styles';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const facilities = [
  { id: 1, img: appIcons.f1 },
  { id: 2, img: appIcons.f2 },
  { id: 3, img: appIcons.f3 },
  { id: 4, img: appIcons.f4 },
  { id: 5, img: appIcons.f5 },
  { id: 5, img: appIcons.f6 },
];

const HotelDetails = ({ navigation, route }) => {
  const { businessDetails } = useSelector(state => state.business);
  console.log('resturant business data here ', businessDetails)
  const [companyId, setCompanyId] = useState();

  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const modalizeRef = useRef(null);
  const modalize = useRef(null);
  const modalizeRefRating = useRef(null);
  const modalizeRefServiceRating = useRef(null);

  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
   // const { item } = route?.params;
    setData(businessDetails);
  }, [businessDetails]);

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
    setCompanyId(item.CompanyCategoryId);
    let serviceDetail = item?.ServicesList[serviceIndex];
    return (
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <ImageBackground
            style={styles.imageStyle}
            source={{ uri: item?.CompanyIcon }}>
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
          <Text style={styles.titleTxtStyle}>Services</Text>
          <ScrollView
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: HP('1') }}>
            {item?.ServicesList.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setServiceIndex(index)}>
                  <Image
                    source={{ uri: item?.ServiceImage_1 }}
                    style={styles.serviceImgStyle}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.nameTxtStyle}>{item?.CompanyName}</Text>
            <TouchableOpacity activeOpacity={0.7}
              onPress={() => {
                setModalData(item);
                modalizeRefRating.current?.open();
              }}
              style={styles.ratingContainer}>
              <Rating
                readonly
                imageSize={20}
                startingValue={Math.round(data[index]?.CompanyRatePercentage)}
              />
              <Text style={styles.ratingTxtStyle}>
                ({Math.round(data[index]?.CompanyRatePercentage)})
              </Text>
            </TouchableOpacity>
            <View style={styles.rowContainer}>
              <View>
                <View style={styles.txtContainer}>
                  <Text style={styles.txtStyle1}>
                    {data[index]?.CompanyNumberOfExperiences}
                  </Text>
                </View>
                <Text style={styles.facilityTxtStyle}>Facilities</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  handleMap(
                    data[index]?.CompanyLatitude,
                    data[index]?.CompanyLongitude,
                  );
                }}
                style={{ alignItems: 'center' }}>
                <Image source={appIcons.location} style={styles.locIconStyle} />
                <Text style={styles.mapTxtStyle}>View on Map</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer}>
              {facilities.map((item, index) => {
                return (
                  <Image source={item.img} style={styles.facilityImgStyle} />
                );
              })}
            </View>
            <View style={styles.rowContainer1}>
              <Text style={styles.txtStyle2}>{serviceDetail?.ServiceName}</Text>
              <Text style={styles.txtStyle3}>
                {serviceDetail?.SerivcePrice} {serviceDetail?.CurrencyName}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}
              onPress={() => {
                setModalData(serviceDetail);
                modalizeRefServiceRating.current?.open();
              }}
              style={styles.ratingContainer}>
              <Rating
                readonly
                imageSize={20}
                startingValue={Math.round(serviceDetail?.ServiceRatingPercentage)}
              />
              <Text style={styles.ratingTxtStyle}>
                {' '}
                {serviceDetail?.ServiceRatingPercentage} (
                {serviceDetail?.ServiceNumberOfRating})
              </Text>
            </TouchableOpacity>
            <Text style={styles.descTxtStyle} numberOfLines={2}>
              {serviceDetail?.ServiceDescription}
            </Text>
          </Card>
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.imagesContainer}>
              <Image
                source={{ uri: serviceDetail?.ServiceImage_1 }}
                style={styles.imgStyle}
              />
              <Image
                source={{ uri: serviceDetail?.ServiceImage_2 }}
                style={styles.imgStyle}
              />
              <Image
                source={{ uri: serviceDetail?.ServiceImage_3 }}
                style={styles.imgStyle}
              />
            </View>
          </Card>
          <View style={styles.btnsContainer}>
            <AppButton
              btnWidth={width / 2.5}
              onPress={() => {
                setModalData(item);
                modalizeRef.current?.open();
              }}
              txt="Who Were Here (45)"
              txtSize={size.tiny}
            />
            <AppButton
              btnWidth={width / 2.5}
              onPress={() => {
                setModalData(item);
                modalize.current?.open();
              }}
              txt="Who Work Here (33)"
              txtSize={size.tiny}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <FlatList
        horizontal
        data={data}
        pagingEnabled
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => (item + index).toString()}
      />
      <WhoWereHere modalizeRef={modalizeRef} modalData={modalData} />
      <WhoWorkHere modalizeRef={modalize} modalData={modalData} />
      <CompanyORServiceRating modalizeRef={modalizeRefRating} modalData={modalData} />
      <ServiceRating modalizeRef={modalizeRefServiceRating} companyId={companyId} modalData={modalData} />

    </View>
  );
};

export default HotelDetails;
