import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  FlatList,
  Platform,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import { WhoWereHere, WhoWorkHere, CompanyORServiceRating, ServiceRating } from '../../../../components';
import styles from './styles';
import { appIcons, appImages, appLogos, colors } from '../../../../utilities';
import { useSelector } from 'react-redux';

const bgColors = [colors.bg11, colors.bg12, colors.bg13];

const CafeDetails = ({ navigation, route }) => {
  const { businessDetails } = useSelector(state => state.business);
  console.log('resturant business data here ', businessDetails)
  const [companyId, setCompanyId] = useState();

  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const modalizeRef = useRef(null);
  const modalize = useRef(null);
  const modalizeRefRating = useRef(null);
  const modalizeRefServiceRating = useRef(null);

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

  const renderService = ({ item, index }) => {
    const bgColor = bgColors[index % bgColors.length];

    return (
      <View style={[styles.itemContainer, { backgroundColor: bgColor }]}>
        <View style={{ flex: 0.7 }}>
          <Text style={styles.productTxtStyle}>{item?.ServiceName}</Text>
          <TouchableOpacity activeOpacity={0.7}
            onPress={() => {
              setModalData(item);
              modalizeRefServiceRating.current?.open();
            }}
            style={styles.ratingContainer}>
            <AirbnbRating
              isDisabled={true}
              size={15}
              showRating={false}
              defaultRating={Math.round(item?.ServiceRatingPercentage)}
            />
            <Text style={styles.ratingTxtStyle1}>
              {item?.ServiceRatingPercentage} ({item?.ServiceNumberOfRating})
            </Text>
          </TouchableOpacity>
          <Text style={styles.descTxtStyle1} numberOfLines={2}>
            {item?.ServiceDescription}
          </Text>
        </View>

        <View style={styles.priceRowContainer}>
          <Image
            source={{
              uri:
                item?.ServiceImage_1 ||
                item?.ServiceImage_2 ||
                item?.ServiceImage_3,
            }}
            style={styles.productImgStyle}
          />
          <Text style={styles.priceTxtStyle}>
            {item?.SerivcePrice} {item?.CurrencyName}
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    setCompanyId(item.CompanyCategoryId);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}>
        <Image
          source={{ uri: item?.CompanyIcon }}
          style={styles.companyImgStyle}
        />
        <View style={styles.companyDetailContainer}>
          <View style={styles.locRowContainer}>
            <Text style={styles.nameTxtStyle}>{item?.CompanyName}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                handleMap(
                  data[index]?.CompanyLatitude,
                  data[index]?.CompanyLongitude,
                )
              }>
              <Image source={appIcons.location1} style={styles.locIconStyle} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.7}
            onPress={() => {
              setModalData(item);
              modalizeRefRating.current?.open();
            }}>
            <View style={{ alignItems: 'flex-start' }}>
              <AirbnbRating
                isDisabled={true}
                size={20}
                showRating={false}
                defaultRating={Math.round(item?.CompanyRatePercentage)}
              />
            </View>
            <View style={styles.txtContainer}>
              <Text style={styles.ratingTxtStyle}>
                {item?.CompanyNumberOfExperiences}
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.descTxtStyle} numberOfLines={2}>
            Lorem ipsum is the dummy text used for the testing purpose in
            software field.
          </Text>
          <Text
            style={styles.txtStyle}
            onPress={() => {
              setModalData(item);
              modalizeRef.current?.open();
            }}>
            Who Were Here{' '}
            <Text style={{ color: colors.p4 }}>
              ({item?.CompanyNumberOfExperiences})
            </Text>
          </Text>
          <Text
            style={styles.txtStyle}
            onPress={() => {
              setModalData(item);
              modalize.current?.open();
            }}>
            Who Work Here{' '}
            <Text style={{ color: colors.p4 }}>({item?.NumberOfWorkers})</Text>
          </Text>
        </View>
        <View style={[styles.companyDetailContainer, { marginTop: 13 }]}>
          <Text style={styles.headingTxtStyle}>Popular Products</Text>
        </View>
        <View style={styles.viewContainer}>
          {item?.ServicesList === undefined ||
            item?.ServicesList?.length === 0 ? (
            <Text style={styles.recordsTextStyle}>No Records Found</Text>
          ) : (
            <FlatList
              data={item?.ServicesList}
              pagingEnabled
              renderItem={renderService}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => (item + index).toString()}
            />
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.imgStyle} source={appImages.cafeBg}>
        <View style={{ flexGrow: 1 }} />
        <View style={styles.rowContainer}>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('BusinessArea')}>
            <Image
              resizeMode="contain"
              style={styles.logoStyle}
              source={appLogos.appLogo}
            />
          </TouchableOpacity>
          <Text style={styles.titleTxtStyle}>CAFE AREA</Text>
          <Text style={styles.roughTxtStyle}> Rough Txt </Text>
        </View>
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

      </ImageBackground>
    </View>
  );
};

export default CafeDetails;
