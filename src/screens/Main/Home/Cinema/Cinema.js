import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { WhoWereHere, WhoWorkHere, CompanyORServiceRating } from '../../../../components';
import { HP, WP, appImages, colors } from '../../../../utilities';
import styles from './styles';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const Cinema = ({ navigation, route }) => {
  const { businessDetails } = useSelector(state => state.business);
  console.log('cinema business data here ', businessDetails)
 
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const carouselRef = useRef(null);
  const modalizeRef = useRef(null);
  const modalize = useRef(null);
  const modalizeRefRating = useRef(null);

  useEffect(() => {
    
      setData(businessDetails);
   
  }, [businessDetails]);

  const renderItem = ({ item, index }, parallaxProps) => {
    
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item?.CompanyIcon }}
          containerStyle={styles.imageContainer}
          style={{ resizeMode: 'cover' }}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
        <ImageBackground
          resizeMode="cover"
          source={appImages.txtBg}
          style={styles.bgImgStyle}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Movies', { item: item })}>
            <Image source={appImages.browse} style={styles.browseImgStyle} />
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <Text style={styles.nameTxtStyle} numberOfLines={2}>
              {item?.CompanyName}
            </Text>
            <TouchableOpacity activeOpacity={0.7}
              onPress={() => {
                setModalData(item);
                modalizeRefRating.current?.open();
              }}
              style={styles.ratingContainer}>
              <Rating
                readonly
                imageSize={10}
                style={{ left: 3 }}
                tintColor={colors.bg7}
                startingValue={Math.round(item?.CompanyRatePercentage)}
              />
              <Text style={styles.ratingTxtStyle}>
                {'  '}({item?.CompanyNumberOfRates})
              </Text>
            </TouchableOpacity>
            <Text
              style={styles.txtStyle}
              onPress={() => {
                setModalData(item);
                modalizeRef.current?.open();
              }}>
              Who Were Here ({item?.CompanyNumberOfExperiences})
            </Text>
            <Text
              style={styles.txtStyle}
              onPress={() => {
                setModalData(item);
                modalize.current?.open();
              }}>
              Who Work Here ({item?.NumberOfWorkers})
            </Text>
          </View>
        </ImageBackground>
      </View>
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
      <Text style={styles.titleTxtStyle}>Available Cinema</Text>
      <View style={{ flex: 0.25 }} />
      <View>
        <Carousel
          ref={carouselRef}
          sliderWidth={width}
          sliderHeight={height}
          itemWidth={width / 1.8}
          data={data}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      </View>
      <WhoWereHere modalizeRef={modalizeRef} modalData={modalData} />
      <WhoWorkHere modalizeRef={modalize} modalData={modalData} />
      <CompanyORServiceRating modalizeRef={modalizeRefRating} modalData={modalData} />

    </View>
  );
};

export default Cinema;
