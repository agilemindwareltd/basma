import React, { useRef, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {
  View,
  Text,
  Image,
  Linking,
  Platform,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { WhoWereHere, WhoWorkHere, CompanyORServiceRating, ServiceRating } from '../../../../components';
import { appIcons, appImages, appLogos, colors, HP } from '../../../../utilities';
import styles from './styles';
import { useSelector } from 'react-redux';
import { ScrollView as ServiceScroll } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window');

const TourismDetails = ({ navigation, route }) => {
  const { businessDetails } = useSelector(state => state.business);
  console.log('resturant business data here ', businessDetails)
  const [companyId, setCompanyId] = useState();

  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const modalizeRef = useRef(null);
  const modalize = useRef(null);
  const modalizeRefRating = useRef(null);
  const modalizeRefServiceRating = useRef(null);

  let serviceIndex = () => { };
  const [index, setIndex] = useState(0);

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

  const handleDisplayItem = (layout) => {
    console.log(layout)
  };

  const RenderServices = ({ item, index }) => {
    //console.log('check swapper ', item)
    const imgsArr = [
      item?.ServiceImage_1,
      item?.ServiceImage_2,
      item?.ServiceImage_3,
    ];
    return (
      <View style={styles.serviceItemContainer}>
        <View style={styles.cardRowContainer}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                numberOfLines={1}
                style={[styles.txtStyle, { width: width / 1.7 }]}>
                {item?.ServiceName}
              </Text>
              <View>
                <Text>Price</Text>
                <Text style={styles.priceTxtStyle}>
                  {item?.SerivcePrice} {item?.CurrencyName}
                </Text>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.7}
              onPress={() => {
                setModalData(item);
                modalizeRefServiceRating.current?.open();
              }}
              style={styles.ratingView}>
              <Image source={appIcons.star} style={styles.starIconStyle} />
              <Text style={styles.txtStyle1}>
                {Math.round(item?.ServiceRatingPercentage)} (
                {item?.ServiceNumberOfRating})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[{ marginTop: HP('1.7') }]}>Description</Text>
        <Text style={styles.descTxtStyle} numberOfLines={2}>
          {item?.ServiceDescription}
        </Text>
        <View style={{
          flex: 1,
          flexWrap: 'wrap',
          flexDirecton: 'row',
          marginLeft: 2
        }}>
        
          {imgsArr?.map((imgItem, index) => {
            return imgItem ? (
              <View key={index} style={styles.serviceImgContainer}>
                <Image key={index}
                  style={styles.serviceImgStyle}
                  source={{ uri: imgItem }}
                />
              </View>
            ) : (
              null
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    setCompanyId(item.CompanyCategoryId);

    return (
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.itemContainer}>
        <LinearGradient
          colors={colors.bg_gradient1}
          style={styles.gradientStyle}>
          <View style={styles.rowContainer}>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('BusinessArea')}>
              <Image
                resizeMode="contain"
                style={styles.logoStyle}
                source={appLogos.appLogo}
              />
            </TouchableOpacity>
            <Text style={styles.titleTxtStyle}>Tourism Companies</Text>
            <Text style={styles.roughTxtStyle}> Rough Text </Text>
          </View>
          <View style={styles.upperViewContainer}>
            <View style={styles.imgViewContainer}>
              <Image
                source={{ uri: item?.CompanyIcon }}
                style={styles.imgStyle}
              />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.txtStyle} numberOfLines={2}>
                {item?.CompanyName}
              </Text>
              <View style={styles.ratingRowContainer}>

                <TouchableOpacity activeOpacity={0.7}
                  onPress={() => {
                    setModalData(item);
                    modalizeRefRating.current?.open();
                  }}
                  style={{ flexDirection: 'row' }}>
                  <Image source={appIcons.star} style={styles.starIconStyle} />
                  <Text style={styles.txtStyle1}>
                    {Math.round(item?.CompanyRatePercentage)} ({item?.CompanyNumberOfRates})
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    handleMap(item?.CompanyLatitude, item?.CompanyLongitude)
                  }>
                  <Image
                    source={appIcons.location1}
                    style={styles.locIconStyle}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.rowContainer1}>
                <Text style={styles.dotTxtStyle}>•</Text>
                <Text
                  style={styles.hereTxtStyle}
                  onPress={() => {
                    setModalData(item);
                    modalizeRef.current?.open();
                  }}>
                  Who Were Here ({item?.CompanyNumberOfExperiences})
                </Text>
              </View>
              <View style={[styles.rowContainer1, { top: 7 }]}>
                <Text style={styles.dotTxtStyle}>•</Text>
                <Text
                  style={styles.hereTxtStyle}
                  onPress={() => {
                    setModalData(item);
                    modalize.current?.open();
                  }}>
                  Who Work Here ({item?.NumberOfWorkers})
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.headingTxtStyle}>Explore Our Services</Text>
          <ImageBackground
            resizeMode="contain"
            style={styles.cricleImgStyle}
            source={appImages.dottedCircle}>
            <Icon
              type={'entypo'}
              name={'arrow-bold-left'}
              color={colors.white}
              size={HP('3')}
              onPress={() => handleDisplayItem('left')}
            />
            <Icon
              type={'entypo'}
              name={'arrow-bold-right'}
              color={colors.white}
              size={HP('3')}
              onPress={() => handleDisplayItem('right')}
            />
          </ImageBackground>
          <View style={styles.imgContainer}>
            <Image
              resizeMode="contain"
              style={styles.smallBgStyle}
              source={appImages.bg1}
            />
          </View>
        </LinearGradient>

        <View style={styles.bottomView}>
          <Card
            containerStyle={
              item?.ServicesList[0] === undefined
                ? styles.cardStyle1
                : styles.cardStyle
            }>
            {item?.ServicesList === undefined ||
              item?.ServicesList.length === 0 ? (
              <Text style={styles.recordsTextStyle}>No Records Found</Text>
            ) : (
              <ServiceScroll
                horizontal
                pagingEnabled
                nestedScrollEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
              >
                {item?.ServicesList.map((serviceItem, index) => {
                  serviceIndex = (index) => {
                    console.log('index ', index)
                  }
                  //console.log('map ', index, ' ', serviceItem)
                  return <RenderServices item={serviceItem} />
                }
                )}
              </ServiceScroll>

            )}
          </Card>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        horizontal
        data={data}
        pagingEnabled
        renderItem={renderItem}
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

export default TourismDetails;
