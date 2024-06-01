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
  TouchableOpacity,
  TextInput,
} from 'react-native';

import DocumentPicker from 'react-native-document-picker'
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';


import styles from './styles';
import * as TYPES from '../../../../redux/actions/types';
import {
  appIcons,
  appImages,
  HP,
  colors,
  WP,
} from '../../../../utilities';
import {
  businessRequest,
  registerCompany,
  deleteServiceRequest,
  updateCompanyProfile,
  getUserCompanyRequest
} from '../../../../redux/actions';
import { MapViewScreen } from '../../../../components/MapViewScreen'

import { _errorMsg, } from '../../../../redux/actions';
import { AppLoading, } from '../../../../components/appLoading';
import { Error } from '../../../../components/Error'

// const latitude = "30.3753";
// const longitude = "69.3451";

const RegisterCompany = ({ navigation, route }) => {
  const [services, setservices] = useState([])

  const [profile, setProfile] = useState('')

  const [isLoading, setIsLoading] = useState(false);

  const [mapViewEnabled, setmapViewEnabled] = useState(false);

  const [categorries, setcategorries] = useState([])

  const [selectedlogoPdf, setselectedlogoPdf] = useState('')

  const [selectedregistration, setselectedregistration] = useState('')

  const [selectedworkLicense, setselectedworkLicense] = useState('')

  const [latitude, setlatitude] = useState('')

  const [longitude, setlongitude] = useState('')

  const [selectedlatter, setselectedlatter] = useState('')

  const [selectedCategoryData, setselectedCategoryData] = useState('')

  const [companyName, setcompanyName] = useState('')

  const [Telephone, setTelephone] = useState('')

  const [Contact, setContact] = useState('')

  const [Email, setEmail] = useState('')

  const [Employees, setEmployees] = useState('')

  const [Branches, setBranches] = useState('')

  const [Website, setWebsite] = useState('')

  const { userData } = useSelector(state => state.login);

  const { errorMsg } = useSelector(state => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    getCategory()
    if (route.params['token'] == 'My Company') {
      getUserCompany()
      // alert()
    }
    if (route?.params?.lat && route?.params?.long) {
      // setla
      // console.log(route.params.lat, '<<<<<<<<<<<<<<<<', route.params.long)
      setlongitude(route.params.lat)
      setlatitude(route.params.long)
    }

  }, [])

  const handleUpdateProfile = (CategoryId, CompanyName, Telephone, ContactPerson, Email, Website, Longitude, Latitude, CompanyIcon, CompanyLogoPDF, CompanyCommercialRegister, officialLetter, WorkLicense, NumberOfEmployees, NumberOfBranches) => {
    setIsLoading(true);
    let data = new FormData();
    if (CategoryId) {
      data.append('CategoryId', CategoryId);
    }
    if (CompanyName) {
      data.append('CompanyName', CompanyName);
    }
    if (Telephone) {
      data.append('Telephone', Telephone);
    }
    if (ContactPerson) {
      data.append('ContactPerson', ContactPerson);
    }
    if (Email) {
      data.append('Email', Email);
    }
    if (Website) {
      data.append('Website', Website);
    }
    if (longitude !== '') {
      data.append('Longitude', longitude.toString());
    }
    if (latitude !== '') {
      data.append('Latitude', latitude.toString());
    }
    if (typeof CompanyIcon == 'object') {
      data.append('CompanyIcon', {
        uri: CompanyIcon.uri ? CompanyIcon.uri : CompanyIcon.path,
        name: 'image.jpg',
        type: CompanyIcon.type ? CompanyIcon.type : CompanyIcon.mime,
      });
    }
    if (typeof CompanyLogoPDF == 'object') {
      data.append('CompanyLogoPDF', CompanyLogoPDF);
    }
    if (typeof CompanyCommercialRegister == 'object') {
      data.append('CompanyCommercialRegister', CompanyCommercialRegister);
    }
    if (typeof officialLetter == 'object') {
      data.append('officialLetter', officialLetter);
    }
    if (typeof WorkLicense == 'object') {
      data.append('WorkLicense', WorkLicense);
    }
    if (NumberOfEmployees) {
      data.append('NumberOfEmployees', NumberOfEmployees);
    }
    if (NumberOfBranches) {
      data.append('NumberOfBranches', NumberOfBranches);
    }
    const cbSuccess = async data => {
      getUserCompany()
      setIsLoading(false);
      let currentUser = userData
      currentUser.IsCompany = true
      dispatch({ type: TYPES.LOGIN_REQUEST_SUCCESS, payload: currentUser })
      navigation.navigate('Profile');
    };

    const cbFailure = message => {
      setIsLoading(false);
      dispatch(_errorMsg({ errorMsg: message.data.ErrorMessage ? message.data.ErrorMessage : Object.values(message.data.errors)[0] ? Object.values(message.data.errors)[0] : message.data.title }))
      setTimeout(() => {
        dispatch(_errorMsg({ errorMsg: '', }))
      }, 3000);
    };

    if (!CategoryId || !CompanyName || !Telephone || !ContactPerson || !Email || !Website || !CompanyIcon || !CompanyLogoPDF || !officialLetter || !WorkLicense || !NumberOfEmployees || !NumberOfBranches || latitude == '' || longitude == '') {
      // if (!CategoryId || !Name || !NameArabic || !Price || !CurrencyId || !ServiceDescription || !LocationDescription || !Image_1 && !Image_2 && !Image_3) {
      setIsLoading(false)
      dispatch(_errorMsg({ errorMsg: `Please fill ${!CategoryId && 'Category' || !Telephone && 'Telephone' || !ContactPerson && 'ContactPerson' || !Email && 'Email' || !Website && 'Website' || !CompanyIcon && 'CompanyIcon' || !CompanyLogoPDF && 'CompanyLogoPDF' || !officialLetter && 'officialLetter' || !WorkLicense && 'WorkLicense' || !NumberOfEmployees && 'NumberOfEmployees' || !NumberOfBranches && 'NumberOfBranches' || latitude == '' && longitude == '' && 'Location'}` }))
      setTimeout(() => {
        dispatch(_errorMsg({ errorMsg: '', }))
      }, 3000);
    }
    else {

      if (route.params['token'] !== 'My Company') {
        dispatch(registerCompany(cbSuccess, cbFailure, data, userData && userData.Token))
      } else {
        if (validURL(Website)) {
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
          if (reg.test(Email) === false) {
            dispatch(_errorMsg({ errorMsg: 'Email is Not Correct' }))
            setTimeout(() => {
              dispatch(_errorMsg({ errorMsg: '', }))
            }, 3000);
            setIsLoading(false);
          } else {
            if (Telephone.length !== 14) {
              setIsLoading(false);
              dispatch(_errorMsg({ errorMsg: 'Please enter 14 digit phone number' }))
              setTimeout(() => {
                dispatch(_errorMsg({ errorMsg: '', }))
              }, 3000);
            } else {
              console.log(data, '///////////////')
              dispatch(updateCompanyProfile(cbSuccess, cbFailure, data, userData && userData.Token))
            }
          }
        } else {
          dispatch(_errorMsg({ errorMsg: 'Website URL is not correct' }))
          setTimeout(() => {
            dispatch(_errorMsg({ errorMsg: '', }))
          }, 3000);
          setIsLoading(false);
        }
      }
    }
  }
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  const fileAdd = async (pdfFOr) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      })
      if (pdfFOr == 'Logos') {
        setselectedlogoPdf(res[0])
      } else if (pdfFOr == 'registration') {
        setselectedregistration(res[0])
      } else if (pdfFOr == 'license') {
        setselectedworkLicense(res[0])
      } else if (pdfFOr == 'latter') {
        setselectedlatter(res[0])
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }

  const getCategory = () => {
    setIsLoading(true)
    const cbSuccess = response => {
      setcategorries(response.Response)
      setIsLoading(false)
    };
    const cbFailure = err => {
      setIsLoading(false);
      dispatch(_errorMsg({ errorMsg: message.data.ErrorMessage ? message.data.ErrorMessage : message.data.title }))
      setTimeout(() => {
        dispatch(_errorMsg({ errorMsg: '', }))
      }, 3000);
    };
    dispatch(businessRequest(cbSuccess, cbFailure,));
  }

  const getUserCompany = () => {
    setIsLoading(true)
    const cbSuccess = response => {
      setProfile(response[0].CompanyIcon)
      setTelephone(response[0].CompanyTelephone)
      setEmail(response[0].CompanyEmail)
      setBranches(response[0].CompanyNumberOfBranches.toString())
      setEmployees(response[0].CompanyNumberOfEmployees.toString())
      setcompanyName(response[0].CompanyName)
      setWebsite(response[0].CompanyWebsite)
      setContact(response[0].CompanyContactPerson)
      setselectedworkLicense(response[0].CompanyWorkLicense)
      setselectedregistration(response[0].CompanyCommercialRegister)
      if (response[0].Services) {
        setservices(response[0].Services)
      }
      setselectedlogoPdf(response[0].CompanyLogoPDF)
      setselectedlatter(response[0].CompanyOfficialLetter)
      setselectedCategoryData(response[0].CategoryId)
      setlatitude(response[0].CompanyLatitude)
      setlongitude(response[0].CompanyLongitude)
      setIsLoading(false)
    }
    const cbFailure = err => {
      setIsLoading(false);
      dispatch(_errorMsg({ errorMsg: message.data.ErrorMessage ? message.data.ErrorMessage : message.data.title }))
      setTimeout(() => {
        dispatch(_errorMsg({ errorMsg: '', }))
      }, 3000);
    };
    dispatch(getUserCompanyRequest(cbSuccess, cbFailure, userData && userData.Token));
  }
  const handledltService = (serviceId) => {
    setIsLoading(true);
    let data = new FormData();
    if (serviceId) {
      data.append('serviceId', serviceId);
    }
    const cbSuccess = response => {
      setIsLoading(false)
      getUserCompany()
    }
    const cbFailure = err => {
      setIsLoading(false);
      dispatch(_errorMsg({ errorMsg: message.data.ErrorMessage ? message.data.ErrorMessage : message.data.title }))
      setTimeout(() => {
        dispatch(_errorMsg({ errorMsg: '', }))
      }, 3000);
    };
    dispatch(deleteServiceRequest(cbSuccess, cbFailure, data, userData && userData.Token));
  }
  const getImg = async () => {
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
          setProfile(res.assets[0])
        }
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />

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

      <ImageBackground style={styles.mainContainer} source={appImages.splashBg}>
        <View
          style={[
            styles.rowDirection,
            { paddingVertical: 20, paddingHorizontal: 15 },
          ]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <AntDesign name="arrowleft" size={27} color="#fff" />
          </TouchableOpacity>
          <Text
            style={[styles.subHeading, styles.colorWhite, { marginLeft: 12 }]}>
            {route.params['token'] ? 'Company Profile' : 'Register Company'}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.wrapper}>
            <View
              style={[styles.uploadingArea, styles.center, styles.alignCenter]}>
              <TouchableOpacity
                onPress={() => {
                  getImg();
                }}>
                {profile !== '' ?
                  <Image
                    resizeMode={'cover'}
                    source={profile !== '' ? { uri: profile.uri ? profile.uri : profile.path ? profile.path : profile + '?random_number=' + new Date().getTime() } : appImages.Camera}
                    style={profile !== '' ? styles.defaultIcon : styles.uploadImage} /> :
                  <Image
                    source={profile !== '' ? { uri: profile.uri ? profile.uri : profile.path ? profile.path : profile } : appImages.Camera}
                    style={profile !== '' ? styles.defaultIcon : styles.uploadImage} />
                }
              </TouchableOpacity>
              {profile !== '' &&
                <>
                  <TouchableOpacity
                    onPress={() => editImage()}
                    style={{ backgroundColor: colors.p1, position: "absolute", left: 20, top: 20, padding: 5, borderRadius: 30 }}>
                    <Feather name="crop" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setProfile('')}
                    style={[styles.absWorkForDltIcon, { backgroundColor: colors.p1, right: 20, top: 20 }]}>
                    <Image source={require('../../../../assets/images/dltIcon.jpg')}
                      tintColor={'white'}
                      style={{ height: 20, width: 20 }}
                    />
                  </TouchableOpacity>
                </>
              }
            </View>
            <Text
              style={[
                styles.subHeading,
                styles.colorWhite,
                { marginTop: HP('5%') },
              ]}>
              Select Buisness Category
            </Text>
            <ScrollView horizontal={true}>
              {categorries && categorries.length > 0 && categorries.map((item) => {
                return (
                  <>
                    <TouchableOpacity
                      onPress={() => setselectedCategoryData(item.Id)}
                      style={[
                        styles.selectionAreaHorizontal,
                        styles.center,
                        styles.alignCenter,
                      ]}>
                      {selectedCategoryData == item.Id &&
                        <Image
                          resizeMode={'stretch'}
                          source={require('../../../../assets/images/catogeryBorder.png')} style={{
                            position: 'absolute', zIndex: 2,
                            height: HP('18%'),
                            width: WP('26%'),
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
                    </TouchableOpacity>
                  </>
                )
              })}
            </ScrollView>

            <TextInput
              style={styles.textInputProfile}
              placeholder="Company Name"
              value={companyName}
              onChangeText={(text) => setcompanyName(text)}
              placeholderTextColor={'#fff'}
            />
            <TextInput
              style={styles.textInputProfile}
              placeholder="Telephone"
              value={Telephone}
              onChangeText={(text) => setTelephone(text)}
              placeholderTextColor={'#fff'}
              keyboardType={'number-pad'}
            />
            <TextInput
              style={styles.textInputProfile}
              placeholder="Contact Person"
              value={Contact}
              onChangeText={(text) => setContact(text)}
              placeholderTextColor={'#fff'}
              keyboardType={'number-pad'}
            />
            <TextInput
              style={styles.textInputProfile}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={'#fff'}
              keyboardType={'email-address'}
              placeholder="Email ID"
              value={Email}
            />
            <TextInput
              style={styles.textInputProfile}
              placeholder="Number Of Employees"
              value={Employees}
              onChangeText={(text) => setEmployees(text)}
              placeholderTextColor={'#fff'}
              keyboardType={'number-pad'}
            />
            <TextInput
              style={styles.textInputProfile}
              placeholder="Number Of Branches"
              value={Branches}
              onChangeText={(text) => setBranches(text)}
              placeholderTextColor={'#fff'}
              keyboardType={'number-pad'}
            />
            <TouchableOpacity
              // onPress={() => navigation.navigate('MapViewScreen', { comeFrom: 'Register' })}
              onPress={() => setmapViewEnabled(true)}
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
            </TouchableOpacity>
            <TextInput
              style={styles.textInputProfile}
              placeholder="Website"
              placeholderTextColor={'#fff'}
              value={Website}
              onChangeText={(text) => setWebsite(text)}
              keyboardType={'url'}
            />
            <ScrollView horizontal={true} style={{ marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => fileAdd('Logos')}
                style={[
                  styles.servicesSelectionAreaHorizontal,
                  styles.center,
                  styles.alignCenter,
                  { borderWidth: selectedlogoPdf !== '' ? 2 : 0, borderStyle: 'dotted', borderColor: 'white' }
                ]}>
                {selectedlogoPdf !== '' ?
                  <View style={{ height: '100%', justifyContent: "center", width: '100%' }}>
                    <Image source={require('../../../../assets/images/pdfIcon.png')}
                      resizeMode="contain"
                      style={{ height: '90%', width: '100%' }} />
                    <TouchableOpacity
                      onPress={() => setselectedlogoPdf('')}
                      style={styles.absWorkForDltIcon}>
                      <Image source={require('../../../../assets/images/dltIcon.jpg')}
                        tintColor={'white'}
                        style={{ height: 15, width: 15 }} />
                    </TouchableOpacity>

                  </View> :
                  <>
                    <Image source={require('../../../../assets/images/uploadIcon.png')}
                      tintColor={'gray'}
                      style={{ height: '70%', width: '70%' }} />
                    <Text
                      style={[
                        styles.xsubHeading,
                        styles.colorWhite,
                      ]}>
                      Logos
                    </Text>
                  </>
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => fileAdd('registration')}
                style={[
                  styles.servicesSelectionAreaHorizontal,
                  styles.center,
                  styles.alignCenter,
                  { borderWidth: selectedregistration !== '' ? 2 : 0, borderStyle: 'dotted', borderColor: 'white' }
                ]}>
                {selectedregistration !== '' ?
                  <View style={{ height: '100%', justifyContent: "center", width: '100%' }}>
                    <Image source={require('../../../../assets/images/pdfIcon.png')}
                      resizeMode='contain'
                      style={{ height: '90%', width: '100%' }} />
                    <TouchableOpacity
                      onPress={() => setselectedregistration('')}
                      style={styles.absWorkForDltIcon}>
                      <Image source={require('../../../../assets/images/dltIcon.jpg')}
                        tintColor={'white'}
                        style={{ height: 15, width: 15 }} />
                    </TouchableOpacity>
                  </View> :
                  <>
                    <Image source={require('../../../../assets/images/uploadIcon.png')}
                      tintColor={'gray'}
                      style={{ height: '70%', width: '70%' }} />
                    <Text
                      style={[{ fontSize: 10 },
                      styles.colorWhite,
                      ]}>
                      Commercial Register
                    </Text>
                  </>
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => fileAdd('latter')}
                style={[
                  styles.servicesSelectionAreaHorizontal,
                  styles.center,
                  styles.alignCenter,
                  { borderWidth: selectedlatter !== '' ? 2 : 0, borderStyle: 'dotted', borderColor: 'white' }
                ]}>
                {selectedlatter !== '' ?
                  <View style={{ height: '100%', justifyContent: 'center', width: '100%' }}>
                    <Image source={require('../../../../assets/images/pdfIcon.png')}
                      resizeMode='contain'
                      style={{ height: '90%', width: '100%' }} />
                    <TouchableOpacity
                      onPress={() => setselectedlatter('')}
                      style={styles.absWorkForDltIcon}>
                      <Image source={require('../../../../assets/images/dltIcon.jpg')}
                        tintColor={'white'}
                        style={{ height: 15, width: 15 }} />
                    </TouchableOpacity>
                  </View> :
                  <>
                    <Image source={require('../../../../assets/images/uploadIcon.png')}
                      tintColor={'gray'}
                      style={{ height: '70%', width: '70%' }} />
                    <Text
                      style={[
                        styles.xsubHeading,
                        styles.colorWhite,
                      ]}>
                      Official Letter
                    </Text>
                  </>
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => fileAdd('license')}
                style={[
                  styles.servicesSelectionAreaHorizontal,
                  styles.center,
                  styles.alignCenter,
                  { borderWidth: selectedworkLicense !== '' ? 2 : 0, borderStyle: 'dotted', borderColor: 'white' }
                ]}>
                {selectedworkLicense !== '' ?
                  <View style={{ height: '100%', justifyContent: "center", width: '100%' }}>
                    <Image source={require('../../../../assets/images/pdfIcon.png')}
                      resizeMode='contain'
                      style={{ height: '90%', width: '100%' }} />

                    <TouchableOpacity
                      onPress={() => setselectedworkLicense('')}
                      style={styles.absWorkForDltIcon}>
                      <Image source={require('../../../../assets/images/dltIcon.jpg')}
                        tintColor={'white'}
                        style={{ height: 15, width: 15 }} />
                    </TouchableOpacity>
                  </View> :
                  <>
                    <Image source={require('../../../../assets/images/uploadIcon.png')}
                      tintColor={'gray'}
                      style={{ height: '70%', width: '70%' }} />
                    <Text
                      style={[
                        styles.xsubHeading,
                        styles.colorWhite,
                      ]}>
                      Work License
                    </Text>
                  </>
                }
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity
              style={[styles.center, styles.alignCenter, { alignSelf: 'flex-end', marginRight: route.params['token'] == 'My Company' ? 0 : 15 }]}
              onPress={() => handleUpdateProfile(selectedCategoryData, companyName, Telephone, Contact, Email, Website, longitude, latitude, profile, selectedlogoPdf, selectedregistration, selectedlatter, selectedworkLicense, Employees, Branches)}>
              <Image
                source={appImages.AddService}
                style={{ marginTop: HP('3%') }}
              />
              <Text
                style={[
                  styles.xsubHeading,
                  styles.colorWhite,
                  { marginVertical: 10 },
                ]}>
                {route.params['token'] == 'My Company' ? 'Save Updates' : "Save"}
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.rowDirection,
                { justifyContent: 'space-between', },
              ]}>
              <Text
                style={[
                  styles.subHeading,
                  styles.colorWhite,
                  { marginTop: HP('5%') },
                ]}>
                Services
              </Text>
              <TouchableOpacity
                style={[styles.center, styles.alignCenter]}
                onPress={() => navigation.push('AddaService')}>
                <Image
                  source={appImages.AddService}
                  style={{ marginTop: HP('3%') }}
                />
                <Text
                  style={[
                    styles.xsubHeading,
                    styles.colorWhite,
                    { marginVertical: 10 },
                  ]}>
                  Add Services
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={services && services.length > 0 && services}
              contentContainerStyle={{ flexDirection: "row", flexWrap: 'wrap', marginBottom: 30 }}
              renderItem={({ item, i }) => {
                return (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => handledltService(item.ServiceId)}
                      style={[styles.absWorkForDltIcon, { backgroundColor: colors.p1, right: 10, top: 40 }]}>
                      <Image source={require('../../../../assets/images/dltIcon.jpg')}
                        tintColor={'white'}
                        style={{ height: 20, width: 20 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.push('AddaService', { item })}
                      activeOpacity={0.8}
                      style={{ height: 130, marginTop: 30, width: 110, marginHorizontal: 5, overflow: "hidden", borderRadius: 10 }}>
                      <ImageBackground style={{ height: "100%", width: "100%", justifyContent: "flex-end", alignItems: "center" }} source={{ uri: item.ServiceImage_1 || item.ServiceImage_2 || item.ServiceImage_3 }}>
                        <Text style={{ color: 'white', width: '80%', marginBottom: 10, }}>{item.ServiceName}</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </>
                )
              }}
            />
          </View>
        </ScrollView>
        {errorMsg !== '' &&
          <Error errorMsg={errorMsg} disableError={() => dispatch(_errorMsg({ errorMsg: '', }))} />
        }
      </ImageBackground >
    </SafeAreaView >
  );
};

export default RegisterCompany;
