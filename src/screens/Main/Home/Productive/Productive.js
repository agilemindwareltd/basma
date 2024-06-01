import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  Platform,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { Card, Rating } from 'react-native-elements';
import { WhoWereHere, WhoWorkHere, CompanyORServiceRating } from '../../../../components';
import { appIcons, appLogos } from '../../../../utilities';
import { useSelector } from 'react-redux';

const Productive = ({ navigation, route }) => {
  const { businessDetails } = useSelector(state => state.business);
  console.log('cinema business data here ', businessDetails)

  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const modalizeRef = useRef(null);
  const modalize = useRef(null);
  const modalizeRefRating = useRef(null);

  useEffect(() => {
    
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
    return (
      <View style={styles.itemContainer}>
        <Card containerStyle={styles.cardStyle}>
          <View style={styles.cardViewStyle}>
            <View style={styles.rowContainer}>
              <Text style={styles.nameTxtStyle}>{item?.CompanyName}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  handleMap(item?.CompanyLatitude, item?.CompanyLongitude)
                }>
                <Image
                  resizeMode="contain"
                  style={styles.locIconStyle}
                  source={appIcons.location}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={styles.txtStyle}
              onPress={() => {
                setModalData(item);
                modalizeRef.current?.open();
              }}>
              Who were here ({item?.CompanyNumberOfExperiences})
            </Text>
            <Text
              style={styles.txtStyle}
              onPress={() => {
                setModalData(item);
                modalize.current?.open();
              }}>
              Who Work Here ({item?.NumberOfWorkers})
            </Text>
            <TouchableOpacity activeOpacity={0.7}
              onPress={() => {
                setModalData(item);
                modalizeRefRating.current?.open();
              }}
              style={styles.ratingContainer}>
              <Rating
                readonly
                imageSize={12}
                style={{ left: 3 }}
                startingValue={Math.round(item?.CompanyRatePercentage)}
              />
              <Text style={styles.ratingTxtStyle}>
                {' '}
                ({Math.round(item?.CompanyRatePercentage)})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('ProductiveDetails', { item: item })
              }
              style={styles.btnContainer}>
              <Text style={styles.btnTxtStyle}>Services</Text>
            </TouchableOpacity>
          </View>
        </Card>
        <Image style={styles.imgStyle} source={{ uri: item?.CompanyIcon }} />
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
      <TouchableOpacity style={styles.weIconBackBtn} activeOpacity={1} onPress={() => navigation.goBack()}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => (item + index).toString()}
      />
      <WhoWereHere modalizeRef={modalizeRef} modalData={modalData} />
      <WhoWorkHere modalizeRef={modalize} modalData={modalData} />
      <CompanyORServiceRating modalizeRef={modalizeRefRating} modalData={modalData} />

    </SafeAreaView>
  );
};

export default Productive;
