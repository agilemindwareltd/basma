import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView, Linking,
  SafeAreaView,
  Image,
  Platform,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import DocumentPicker from 'react-native-document-picker'
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';

// import styles from './styles';
import * as TYPES from '../../redux/actions/types';
import {
  appIcons,
  appImages,
  HP,
  colors,
  WP,
} from '../../utilities';
import {
  businessRequest,
  deleteServiceRequest,
  updateCompanyProfile,
  getUserCompanyRequest
} from '../../redux/actions';
import { _errorMsg, } from '../../redux/actions';
import { AppLoading, } from '../appLoading';
import { Error } from '../Error'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let json = [{ "elementType": "geometry", "stylers": [{ "color": "#233253" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#fcfcfc" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#050505" }] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "color": "#f7029e" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#fcfcfc" }] }, { "featureType": "administrative.locality", "elementType": "geometry.stroke", "stylers": [{ "color": "#d61fae" }] }, { "featureType": "administrative.neighborhood", "elementType": "geometry.stroke", "stylers": [{ "color": "#d61fae" }] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "color": "#d61fae" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [{ "color": "#952197" }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#140c32" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#051c4d" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#fafafa" }] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [{ "color": "#0a0a0a" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#140c32" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#fafafa" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#cf157f" }, { "weight": 1 }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#f9fafa" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#21205b" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#190e3e" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#fcfcfc" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [{ "color": "#671355" }] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#f9fafa" }] }, { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [{ "color": "#f7f7f7" }] }, { "featureType": "transit.line", "elementType": "geometry.fill", "stylers": [{ "color": "#283d6a" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#7d3174" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#110c55" }] }]

export const MapViewScreen = ({ conrdinates, _func }) => {
  console.log(conrdinates, 'conrdinatesconrdinatesconrdinates')
  const [lat, setlat] = useState(conrdinates?.latitude !== '' ? Number(conrdinates?.latitude) : 37.78825)
  const [long, setlong] = useState(conrdinates?.latitude !== '' ? Number(conrdinates?.longitude) : - 122.4324)
  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", zIndex: 1 }}>
        <TouchableOpacity
          onPress={() => _func(lat, long)}
          // onPress={() => {
          //   if (comeFrom == 'Register') {
          //     navigation.replace('RegisterCompany', { token: 'My Company', lat, long })
          //   } else {
          //     navigation.replace('AddaService', { token: 'My Company', lat, long })
          //   }
          // }}
          style={styles.btn} >
          <Text style={styles.btnText}>Set Location</Text>
        </TouchableOpacity>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: conrdinates?.latitude !== '' ? Number(conrdinates?.latitude) : 37.78825,
          longitude: conrdinates?.latitude !== '' ? Number(conrdinates?.longitude) : - 122.4324,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        customMapStyle={json}
      >
        <Marker draggable
          coordinate={{
            latitude: conrdinates?.latitude !== '' ? Number(conrdinates?.latitude) : 37.78825,
            longitude: conrdinates?.latitude !== '' ? Number(conrdinates?.longitude) : -122.4324,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onDragEnd={(e) => {
            setlat(e.nativeEvent.coordinate.latitude)
            setlong(e.nativeEvent.coordinate.longitude)
          }
          }
        />
      </MapView>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btnText: { color: '#CE157F' },
  btn: { paddingHorizontal: 30, paddingVertical: 20, backgroundColor: "rgba(0, 0, 0, 0.8)", marginVertical: 10, borderRadius: 10 }
});

// export default MapViewScreen;
