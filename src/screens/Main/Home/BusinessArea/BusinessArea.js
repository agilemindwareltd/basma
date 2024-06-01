import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {HP, WP, appImages} from '../../../../utilities';
import {Loading} from '../../../../components/Loading';
import styles from './styles';

// redux stuff
import {useDispatch} from 'react-redux';
import {businessRequest, bsnsDetailsRequest} from '../../../../redux/actions';

const BusinessArea = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // redux stuff
  const dispatch = useDispatch();

  useEffect(() => {
    getBusinessAreas();
  }, []);

  const getBusinessAreas = () => {
    setIsLoading(true);
    const cbSuccess = response => {
      setIsLoading(false);
      setData(response?.Response);
    };
    const cbFailure = err => {
      setIsLoading(false);
      console.log('Error Msg ==> ', err?.response);
    };
    dispatch(businessRequest(cbSuccess, cbFailure));
  };

  const getBusinessDetails = item => {
    setIsLoading(true);
    const cbSuccess = response => {
      setIsLoading(false);

      switch (item.Name) {
        case 'Resturant':
          navigation.navigate('Restaurants', {item: response.Response});
          break;
        case 'Productive Elites':
          navigation.navigate('Productive', {item: response.Response});
          break;
        case 'Cafés':
          navigation.navigate('Cafe', {item: response.Response});
          break;
        default:
          navigation.navigate(item.Name, {item: response.Response});
      }
    };

    const cbFailure = err => {
      setIsLoading(false);
      console.log('Error Msg ==> ', err);
    };
    dispatch(bsnsDetailsRequest(item?.Id, cbSuccess, cbFailure));
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => getBusinessDetails(item)}
        style={styles.itemContainer}>
        <ImageBackground
          style={styles.circleImgStyle}
          source={appImages.circle}
          onPress={() => navigation.goBack()}>
          <Image
            resizeMode="contain"
            source={{uri: item?.ImagePath}}
            style={{width: WP('11'), height: WP('11')}}
          />
        </ImageBackground>
        <Text style={styles.titleTxtStyle}>{item?.Name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="black" barStyle={'light-content'} />
      <ImageBackground style={styles.mainContainer} source={appImages.splashBg}>
        <Loading visible={isLoading} />
        <View style={{flex: 0.15}} />
        <View style={styles.rowContainer}>
          <Icon
            type={'MaterialIcons'}
            name={'keyboard-backspace'}
            color={'white'}
            size={HP('3.5')}
            style={{marginRight: WP('2')}}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headingTxtStyle}>Business Area</Text>
        </View>
        <View style={{flex: 0.1}} />
        <Text style={styles.descTxtStyle}>
          Lets' hook you up with a good Business
        </Text>
        <FlatList
          data={data}
          numColumns={3}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flStyle}
          keyExtractor={(item, index) => (item + index).toString()}
        />
      </ImageBackground>
    </View>
  );
};

export default BusinessArea;
