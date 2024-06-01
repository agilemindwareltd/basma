import React, { useEffect, useState } from 'react';
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
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import moment from 'moment';

import {
  appIcons,
  appImages,
  appLogos,
  HP,
  WP,
  colors,
} from '../../../../utilities';
import styles from './styles';
import { getIWasHereRequest } from '../../../../redux/actions';

const IWasHere = ({ navigation }) => {
  // console.log(props,'propspropspropspropsprops')
  const [IWasHereData, setIWasHereData] = useState([]);
  const { userData } = useSelector(state => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    getIWasHere();
  }, []);

  const getIWasHere = () => {
    const cbSuccess = async message => {
      console.log('Ratings are ==> ', message);
      setIWasHereData(message)
    };
    //When api is not successfull
    const cbFailure = message => {
      console.log('Msgs are ==> ', message);
    };
    console.log(userData, 'userDatauserDatauserData')
    dispatch(getIWasHereRequest(cbSuccess, cbFailure, userData.Token))

  };



  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.mainContainer} source={appImages.splashBg}>
        <ScrollView>
          <View style={styles.wrapper}>
            <View style={styles.rowDirection}>
              <TouchableOpacity onPress={() => navigation.pop()} activeOpacity={0.8}>
                <ImageBackground
                  source={appImages.BusinessBorder2}
                  resizeMode={'contain'}
                  style={[styles.positionRelative, { width: 80, height: 80 }]}>
                  <Image
                    source={appLogos.appLogo}
                    style={[
                      styles.imageStyles,
                      styles.positionAbsolute,
                      { left: 18 },
                    ]}
                  /> 
                </ImageBackground>
              </TouchableOpacity>

              <View style={[styles.w_45, styles.center]}>
                <Text style={[styles.mainHeading, styles.colorWhite]}>
                  {' '}
                  I Was Here
                </Text>
              </View>
            </View>
          </View>


          <FlatList
            data={IWasHereData}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[styles.wrapper, { paddingHorizontal: 25, marginTop: 15 }]}>
                  <View style={[styles.rowDirection]}>
                    <ImageBackground
                      source={appImages.BusinessBorder2}
                      style={[{ width: 80, height: 80, justifyContent: "center", alignItems: "center" }]}>
                      <Image
                        source={{ uri: item.companyIcon }}
                        resizeMode={"cover"}
                        style={{ width: 50, height: 50, borderRadius: 25, }}
                      />
                    </ImageBackground>
                    <Text
                      style={[styles.subHeading, styles.colorWhite, { marginTop: 15 }]}>
                      {' '}
                      {item.companyName}
                      {'\n'}{' '}
                      <Text style={[styles.xsubHeading, styles.colorGray]}>{moment(item.experianceDate).format('MMMM Do YYYY | h:mm: a')}</Text>
                    </Text>
                  </View>
                  <TextInput
                    numberOfLines={2}
                    editable={false}
                    defaultValue={item.experiancDescription}
                    placeholder="My Experience"
                    placeholderTextColor={'gray'}
                    style={[styles.textInput,]}
                  />
                  <ScrollView horizontal={true}>
                    <View style={[styles.rowDirection]}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('FullImagescreen', { imgPath: item.image1 })}
                        style={[
                          styles.selectionAreaHorizontal,
                          styles.center,
                          styles.alignCenter,
                        ]}>
                        {item.image1 ?
                          <Image style={{ height: "90%", borderRadius: 10, width: "90%" }} source={{ uri: item.image1 }} />
                          :
                          <Image source={appImages.CameraNew} />
                        }
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('FullImagescreen', { imgPath: item.image2 })}
                        style={[
                          styles.selectionAreaHorizontal,
                          styles.center,
                          styles.alignCenter,
                        ]}>
                        {item.image2 ?
                          <Image style={{ height: "90%", borderRadius: 10, width: "90%" }} source={{ uri: item.image2 }} />
                          :
                          <Image source={appImages.CameraNew} />
                        }
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('FullImagescreen', { imgPath: item.image3 })}
                        style={[
                          styles.selectionAreaHorizontal,
                          styles.center,
                          styles.alignCenter,
                        ]}>
                        {item.image3 ?
                          <Image style={{ height: "90%", borderRadius: 10, width: "90%" }} source={{ uri: item.image3 }} />
                          :
                          <Image source={appImages.CameraNew} />
                        }
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              )
            }}
            keyExtractor={item => item.id}
          />



        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default IWasHere;
