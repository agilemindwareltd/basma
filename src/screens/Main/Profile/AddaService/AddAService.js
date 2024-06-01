import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  useSelector,
  useDispatch
} from 'react-redux'
import { _errorMsg } from '../../../../redux/actions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';
import { companyAddServices } from '../../../../redux/actions';

import {
  deleteServiceRequest,
} from '../../../../redux/actions';
import {
  appIcons,
  appImages,
  HP,
  colors,
  WP
} from '../../../../utilities';
import { MapViewScreen } from '../../../../components/MapViewScreen'


import { Error } from '../../../../components/Error'
import { AppLoading } from '../../../../components/appLoading'
// import 

const AddAService = ({ navigation, route }) => {
  // console.log(route.params.item,'routerouterouterouteroute')

  const [selectedCategoryData, setselectedCategoryData] = useState('')

  const [image1, setimage1] = useState('')

  const [viewServices, setViewServices] = useState(false)

  const [isLoading, setIsLoading] = useState(false);

  const [mapViewEnabled, setmapViewEnabled] = useState(false);

  const [latitude, setlatitude] = useState('')

  const [longitude, setlongitude] = useState('')

  const [image2, setimage2] = useState('')

  const [image3, setimage3] = useState('')

  const [serviceName, setserviceName] = useState('')

  const [serviceNameAr, setserviceNameAr] = useState('')

  const [serviceId, setserviceId] = useState('')

  const [servicePrice, setservicePrice] = useState('')

  const [location, setlocation] = useState('')

  const [serviceDes, setserviceDes] = useState('')

  const { errorMsg } = useSelector(state => state.app);
  const { businessData } = useSelector(state => state.business);
  const { userData } = useSelector(state => state.login);

  const dispatch = useDispatch(); 


  useEffect(() => {
    // console.log(route.params,  '<<<<<<<<<<<<<<<<', route.params )

    if (route?.params?.item) {
      setViewServices(true)
      setimage1(route.params.item.ServiceImage_1)
      setimage2(route.params.item.ServiceImage_2)
      setimage3(route.params.item.ServiceImage_3)
      setserviceNameAr(route.params.item.ServiceNameArabic)
      setserviceName(route.params.item.ServiceName)
      // setlocation(route.params.item.ServiceLocations)
      setserviceDes(route.params.item.ServiceDescription)
      setselectedCategoryData(route.params.item.CategoryId)
      setservicePrice(route.params.item.ServicePrice)
      setlocation(route.params.item.ServiceDescription)
      setserviceId(route.params.item.ServiceId)
      // setlatitude(route.params.item.CompanyLatitude)
      // setlongitude(route.params.item.CompanyLongitude)
      // console.log(route.params.item, 'route?.params?.item',route.params.item.CompanyLongitude)
    }
    if (route?.params?.lat && route?.params?.long) {
      // setla
      // alert()
      setlongitude(route.params.lat)
      setlatitude(route.params.long)
    }
  }, [])

  const handledltService = (serviceId) => {
    // console.log(userData, 'userDatauserData')
    setIsLoading(true);
    let data = new FormData();
    if (serviceId) {
      data.append('serviceId', serviceId);
    }
    const cbSuccess = response => {
      setIsLoading(false)
      // getUserCompany()
      navigation.replace('RegisterCompany', { token: 'My Company' })
    }
    const cbFailure = err => {
      setIsLoading(false);
      dispatch(_errorMsg({ errorMsg: 'delete failed  ' }))
      setTimeout(() => {
        dispatch(_errorMsg({ errorMsg: '', }))
      }, 3000);
    };
    dispatch(deleteServiceRequest(cbSuccess, cbFailure, data, userData && userData.Token));
  }

  const handleAddCompanyService = (CategoryId, Name, NameArabic, Image_1, Image_2, Image_3, Price, CurrencyId, ServiceDescription, Latitude, Longitude, LocationDescription) => {
    setIsLoading(true)
    let data = new FormData();
    if (CategoryId) {
      data.append('CategoryId', CategoryId);
    }
    if (Name) {
      data.append('Name', Name);
    }
    if (NameArabic) {
      data.append('NameArabic', NameArabic);
    }
    if (typeof Image_1 == 'object') {
      data.append('Image_1', {
        uri: Image_1.uri,
        name: 'image.jpg',
        type: Image_1.type,
      });
    }
    if (typeof Image_2 == 'object') {
      data.append('Image_2', {
        uri: Image_2.uri,
        name: 'image.jpg',
        type: Image_2.type,
      });
    }
    if (typeof Image_3 == 'object') {
      data.append('Image_3', {
        uri: Image_3.uri,
        name: 'image.jpg',
        type: Image_3.type,
      });
    }
    if (Price) {
      data.append('Price', Number(Price));
    }
    if (CurrencyId) {
      data.append('CurrencyId', CurrencyId);
    }
    if (ServiceDescription) {
      data.append('ServiceDescription', ServiceDescription);
    }
    if (latitude !== '') {
      data.append('Latitude', latitude.toString());
    }
    if (longitude !== '') {
      data.append('Longitude', longitude.toString());
    }
    if (LocationDescription) {
      data.append('LocationDescription', LocationDescription);
    }
    const cbSuccess = async data => {
      navigation.push('RegisterCompany', { token: 'My Company' })
    };

    const cbFailure = message => {
      setIsLoading(false)
      // console.log(message, 'messagemessagemessage')
      // dispatch(_errorMsg({ errorMsg: 'upload fail'}))
      // setTimeout(() => {
      //   dispatch(_errorMsg({ errorMsg: '', }))
      // }, 3000);
    };
    if (!CategoryId || !Name || !NameArabic || !Price || !CurrencyId || !ServiceDescription || !LocationDescription || !Image_1 && !Image_2 && !Image_3) {
      setIsLoading(false)
      dispatch(_errorMsg({ errorMsg: `Please fill ${!CategoryId && 'Category' || !Name && 'Name' || !NameArabic && 'Arabic Name' || !Price && 'Price' || !CurrencyId && 'Currency' || !ServiceDescription && 'Service description' || !LocationDescription && 'Location description' || !Image_1 && !Image_2 && !Image_3 && 'image path'}` }))
      setTimeout(() => {
        dispatch(_errorMsg({ errorMsg: '', }))
      }, 3000);
    } else {
      dispatch(companyAddServices(cbSuccess, cbFailure, data, userData && userData.Token))
    }
  }
  const getImg = async (name) => {
    try {
      let options = {
        title: 'Select Image',
        includeBase64: true,
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option',
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, async res => {
        if (res.assets) {
          if (name == 'image1') setimage1(res.assets[0])
          if (name == 'image2') setimage2(res.assets[0])
          if (name == 'image3') setimage3(res.assets[0])
        }
      });
    } catch (err) {
      throw err;
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.mainContainer} source={appImages.splashBg}>
        {isLoading && <AppLoading />}

        {mapViewEnabled &&
          <View style={{ position: 'absolute', height: "100%", width: "100%", zIndex: 2 }}>

            <MapViewScreen
              conrdinates={{ latitude, longitude }}
              _func={(lat, long) => {
                setmapViewEnabled(false)
                setlatitude(lat)
                setlongitude(long)
              }} />
          </View>
        }

        <View
          style={[
            styles.rowDirection,
            { paddingVertical: 20, paddingHorizontal: 15 },
          ]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesign name="arrowleft" size={27} color="#fff" />
          </TouchableOpacity>
          <Text
            style={[styles.subHeading, styles.colorWhite, { marginLeft: 12 }]}>
            {viewServices ? 'Service Detail' : 'Add Services'}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.wrapper}>
            <ScrollView horizontal={true}>
              {[1, 2, 3].map((item) => {
                return (
                  <TouchableOpacity
                    activeOpacity={viewServices ? 0.9 : 0.8}

                    style={[
                      styles.selectionAreaHorizontal,
                      styles.center,
                      styles.alignCenter,
                    ]}
                    onPress={() => {
                      if (viewServices) {
                      } else {
                        getImg(item == 1 ? 'image1' : item == 2 ? 'image2' : 'image3');
                      }
                    }}>
                    {image1 && item == 1 || image2 && item == 2 || image3 && item == 3 ?
                      <Image
                        source={{ uri: item == 1 ? image1.uri ? image1.uri : image1 : item == 2 ? image2.uri ? image2.uri : image2 : image3.uri ? image3.uri : image3 }}
                        resizeMode={'cover'}
                        style={{ width: '90%', borderRadius: 10, height: '90%' }}
                      /> :
                      <>
                        <Image
                          source={appImages.Camera}
                          resizeMode={'contain'}
                          style={{ width: 70, height: 50 }}
                        />
                        <Text
                          style={[
                            styles.xsubHeading,
                            styles.colorWhite,
                            { marginTop: 5 },
                          ]}>
                          Service Image
                        </Text>
                      </>
                    }
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
            <Text
              style={[
                styles.subHeading,
                styles.colorWhite,
                { marginTop: HP('5%') },
              ]}>
              Select Buisness Category
            </Text>
            <ScrollView horizontal={true}>
              {businessData && businessData.length > 0 && businessData.map((item) => {
                return (
                  <TouchableOpacity
                    activeOpacity={viewServices ? 1 : 0.8}
                    onPress={() => {
                      if (viewServices) {
                      } else {
                        setselectedCategoryData(item.Id)
                      }
                    }}
                    style={[
                      styles.servicesSelectionAreaHorizontal,
                      styles.center,
                      styles.alignCenter,
                    ]}>
                    {selectedCategoryData == item.Id &&
                      <Image source={require('../../../../assets/images/catogeryBorder.png')}
                        resizeMode='stretch'
                        style={{
                          height: HP('13%'),
                          width: WP('22%'),
                          position: 'absolute',
                          zIndex: 2,
                        }} />
                    }
                    <Image tintColor={selectedCategoryData == item.Id ? colors.white : colors.p1} source={{ uri: item.ImagePath }} style={{ height: 50, width: 50 }} resizeMode='contain' />
                    <Text
                      style={[
                        styles.xsubHeading,
                        styles.colorWhite,
                        { marginTop: 10 },
                      ]}>
                      {item.Name}
                    </Text>
                  </TouchableOpacity>)
              })}
            </ScrollView>
            <TextInput
              style={styles.textInputProfile}
              placeholder="Service Name"
              value={serviceName}
              onChangeText={(text) => setserviceName(text)}
              placeholderTextColor={'#8A8A8A'}
              editable={viewServices ? false : true}
            />
            <TextInput
              style={styles.textInputProfile}
              placeholder="Service Name Arabic"
              value={serviceNameAr}
              editable={viewServices ? false : true}
              onChangeText={(text) => setserviceNameAr(text)}
              placeholderTextColor={'#8A8A8A'}
            />
            <TextInput
              style={styles.textInputProfile}
              placeholder="Service Price"
              value={servicePrice}
              keyboardType='numeric'
              editable={viewServices ? false : true}
              onChangeText={(text) => setservicePrice(text)}
              placeholderTextColor={'#8A8A8A'}
            />
            <TextInput
              style={styles.textInputProfile}
              placeholder="Location Description"
              value={location}
              editable={viewServices ? false : true}
              onChangeText={(text) => setlocation(text)}
              placeholderTextColor={'#8A8A8A'}
            />
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('MapViewScreen', { comeFrom: 'Register' })}
              style={styles.positionRelative}>
              <TextInput
                style={styles.textInputProfile}
                placeholder={latitude == '' && longitude == '' ? "Select Location" : 'latitude : ' + Number(latitude).toFixed(1) + ' Longitude :' + Number(longitude).toFixed(1)}
                placeholderTextColor={'#fff'}
                editable={false}
              />
              <Image
                source={appIcons.map}
                style={[
                  styles.positionAbsolute,
                  { top: 8, right: 0, width: 20, height: 20 },
                ]}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              // onPress={() => navigation.navigate('MapViewScreen', { comeFrom: 'Service' })}
              onPress={() => setmapViewEnabled(true)}

              style={styles.positionRelative}>

              <TextInput
                style={styles.textInputProfile}
                // placeholder="Select Location"
                placeholder={latitude == '' && longitude == '' ? "Select Location" : 'latitude : ' + Number(latitude).toFixed(1) + ' Longitude :' + Number(longitude).toFixed(1)}
                placeholderTextColor={'#8A8A8A'}
                editable={false}
              />
              <Image
                source={appIcons.map}
                style={[
                  styles.positionAbsolute,
                  { top: 15, right: 0, width: 25, height: 25 },
                ]}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.textInputProfile}
              placeholder="Service Description"
              value={serviceDes}
              editable={viewServices ? false : true}
              onChangeText={(text) => setserviceDes(text)}
              placeholderTextColor={'#8A8A8A'}
            />
            <View
              style={[styles.rowDirection, { alignItems: 'center', justifyContent: 'flex-end' },]}>
              <TouchableOpacity
                onPress={() => {
                  if (viewServices) {
                    // alert(serviceId)
                    handledltService(serviceId)
                  }
                  else {
                    // alert()
                    handleAddCompanyService(selectedCategoryData, serviceName, serviceNameAr, image1, image2, image3, servicePrice, 1, serviceDes, "30.3753", "69.3451", location)
                  }
                }
                } style={[styles.center, styles.alignCenter]}>
                <Image
                  source={appImages.AddService}
                  style={{ marginTop: HP('3%') }}
                />
                <Text
                  style={[
                    styles.subHeading,
                    styles.colorWhite,
                    { marginVertical: 10 },
                  ]}>
                  {viewServices ? 'Delete' : 'Save'}
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
        {errorMsg !== '' &&
          <Error errorMsg={errorMsg} disableError={() => dispatch(_errorMsg({ errorMsg: '', }))} />
        }
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AddAService;
