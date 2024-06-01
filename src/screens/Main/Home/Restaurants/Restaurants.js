import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import styles from './styles';
import {appImages, HP} from '../../../../utilities';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const sliderImgs = [
  {img: appImages.resturant1},
  {img: appImages.resturant2},
  {img: appImages.resturant1},
];

const Restaurants = ({navigation, route}) => {
  const carouselRef = useRef(null);
  const [data, setData] = useState([]);
  const [sliderData, setSliderData] = useState(sliderImgs);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const {item} = route?.params;
    setData(item);
  }, [route.params]);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={item?.img}
          containerStyle={styles.imageContainer}
          style={{resizeMode: 'cover'}}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.imgStyle} source={appImages.resturantBg}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.weIconBackBtn}
        />
        <View style={{flex: 0.25}} />
        <View style={{flex: 1}}>
          <Carousel
            layout={'stack'}
            data={sliderData}
            ref={carouselRef}
            sliderWidth={width}
            sliderHeight={height}
            itemWidth={width / 1.3}
            layoutCardOffset={'30'}
            renderItem={renderItem}
            hasParallaxImages={true}
            firstItem={Platform.OS === 'android' ? sliderData.length - 1 : null}
            containerCustomStyle={{
              transform: Platform.OS === 'android' ? [{scaleX: -1}] : [],
            }}
            onSnapToItem={index => {
              console.log('Index is ==> ', index);
              Platform.OS === 'android'
                ? setActiveSlide(index === 0 ? 2 : index === 1 ? 1 : 0)
                : setActiveSlide(index);
            }}
          />
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.loadingTxtStyle} numberOfLines={2}>
            Loading Restaurants
          </Text>
          <Text
            onPress={() =>
              navigation.navigate('RestaurantDetails', {item: data})
            }
            style={styles.skipTxtStyle}
            numberOfLines={2}>
            Skip Intro
          </Text>
        </View>
        <Pagination
          activeDotIndex={activeSlide}
          dotsLength={sliderData.length}
          dotStyle={styles.activeDotStyle}
          inactiveDotStyle={styles.inActiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          containerStyle={{
            bottom: Platform.OS === 'android' ? HP('1') : HP('5'),
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default Restaurants;
