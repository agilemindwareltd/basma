import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  Platform,
  FlatList,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Icon, Card, Rating } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { WhoWereHere, WhoWorkHere, CompanyORServiceRating, ServiceRating } from '../../../../components';
import { appIcons, colors, HP, WP } from '../../../../utilities';
import styles from './styles';
import { ScrollView as GestureHandlerScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const RestaurantDetails = ({ navigation, route }) => {
  const { businessDetails } = useSelector(state => state.business);
  console.log('resturant business data here ', businessDetails)
  const carouselRef = useRef(null);
  const [data, setData] = useState([]);
  const [companyId, setCompanyId] = useState();
  const [modalData, setModalData] = useState([]);
  const modalizeRef = useRef(null);
  const modalize = useRef(null);
  const modalizeRefRating = useRef(null);
  const modalizeRefServiceRating = useRef(null);

  useEffect(() => {
    // const { item } = route?.params;
    setData(businessDetails);
  }, [businessDetails]);

  //console.log(data)

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

  const RenderService = ({ item }) => {
    return (
      <View style={styles.serviceItemContainer}>
        <ImageBackground
          source={{
            uri:
              item?.ServiceImage_1 ||
              item?.ServiceImage_2 ||
              item?.ServiceImage_3,
          }}
          style={styles.imgStyle1}
          imageStyle={{ borderRadius: 25 }}>
          <View style={styles.viewStyle}>
            <Text style={styles.priceTextStyle}>
              Price: {item?.SerivcePrice} {item?.CurrencyName}
            </Text>
          </View>
        </ImageBackground>
        <TouchableOpacity activeOpacity={1} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>{item?.ServiceName}</Text>
        </TouchableOpacity>
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
            startingValue={Math.round(item?.ServiceRatingPercentage)}
          />
          <Text style={styles.ratingTxtStyle}>
            {'  '}({Math.round(item?.ServiceRatingPercentage)})
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    //console.log('resturent item component ', item)
    setCompanyId(item.CompanyCategoryId);

    return (
      <GestureHandlerScrollView
        scrollEnabled={true}
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.itemContainer}>
        <LinearGradient
          colors={colors.bg_gradient}
          style={styles.gradientStyle}>
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
        </LinearGradient>
        <Card containerStyle={styles.cardStyle}>
          <View style={styles.contentContainer}>
            <Image source={{ uri: item?.CompanyIcon }} style={styles.imgStyle} />
            <View style={styles.nameRowContainer}>
              <Text />
              <Text />
              <Text style={styles.txtStyle}>{item?.CompanyName}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  handleMap(
                    data[index]?.CompanyLatitude,
                    data[index]?.CompanyLongitude,
                  )
                }>
                <Image source={appIcons.location} style={styles.locIconStyle} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.7}
              onPress={() => {
                setModalData(item);
                modalizeRefRating.current?.open();
              }}
              style={styles.ratingRowContainer}>
              <Image source={appIcons.star} style={styles.starIconStyle} />
              <Text style={styles.txtStyle1}>
                ({Math.round(item?.CompanyRatePercentage)}){'  '}
                {item?.CompanyNumberOfRates} Reviews
              </Text>
            </TouchableOpacity>
            <Text
              style={styles.hereTxtStyle}
              onPress={() => {
                setModalData(item);
                modalizeRef.current?.open();
              }}>
              Who Were Here ({item?.CompanyNumberOfExperiences})
            </Text>
            <Text
              style={[styles.hereTxtStyle, { marginBottom: 10 }]}
              onPress={() => {
                setModalData(item);
                modalize.current?.open();
              }}>
              Who Work Here ({item?.NumberOfWorkers})
            </Text>
          </View>
        </Card>
        <Text style={styles.headingTxtStyle}>What We Serve</Text>
        <View style={styles.viewContainer}>
          {item?.ServicesList === undefined ||
            item?.ServicesList?.length === 0 ? (
            <Text style={styles.recordsTextStyle}>No Records Found</Text>
          ) : (
            <ScrollView
              // horizontal
              pagingEnabled
              scrollEventThrottle={10}
              scrollEnabled
              nestedScrollEnabled>
              {item?.ServicesList?.map(serviceItem => {
                return <RenderService item={serviceItem} />;
              })}
            </ScrollView>
          )}
        </View>
      </GestureHandlerScrollView>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        horizontal
        data={data}
        pagingEnabled
        scrollEnabled
        renderItem={renderItem}
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item, index) => (item + index).toString()}
      />
      <WhoWereHere modalizeRef={modalizeRef} modalData={modalData} />
      <WhoWorkHere modalizeRef={modalize} modalData={modalData} />
      <CompanyORServiceRating modalizeRef={modalizeRefRating} modalData={modalData} />
      <ServiceRating modalizeRef={modalizeRefServiceRating} companyId={companyId} modalData={modalData} />

    </View>
  );
};

export default RestaurantDetails;
