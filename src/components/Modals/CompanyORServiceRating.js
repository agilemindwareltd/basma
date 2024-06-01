import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { Divider, Rating } from 'react-native-elements';
import { Modalize } from 'react-native-modalize';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { NotesInput, UserCard } from '..';
import { appImages } from '../../assets';
import { Loading } from '../Loading';
import { WP, colors, HP, family, size } from '../../utilities';

// redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { getRatingsRequest, addRatingRequest, bsnsDetailsRequest } from '../../redux/actions';

const { width, height } = Dimensions.get('window');

export const CompanyORServiceRating = ({ modalizeRef, modalData }) => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [review, setReview] = useState('');
  const [scale, setScale] = useState(5);

  // redux stuff
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.login);


  useEffect(() => {
    if (modalData?.CompanyId) {
      getRatings();
    }
  }, [modalData]);

  const getRatings = () => {
    // setIsLoading(true);
    //When api is successfull
    const cbSuccess = async message => {
      console.log('Ratings are ==> ', message?.Response);
      setData(message?.Response);
      setIsLoading(false);
    };
    //When api is not successfull
    const cbFailure = message => {
      console.log('Msgs are ==> ', message);
      setIsLoading(false);
    };
    dispatch(
      getRatingsRequest(
        modalData.CompanyId,
        userData.Token,
        cbSuccess,
        cbFailure,
      ),
    );
  };

  const getBusinessDetails = () => {
    setIsLoading(true);
    const cbSuccess = response => {
      console.log('getBusinessDetails are ==> ', response);
      setIsLoading(false);
    };

    const cbFailure = err => {
      setIsLoading(false);
      console.log('Error Msg ==> ', err);
    };
    dispatch(bsnsDetailsRequest(modalData?.CompanyCategoryId, cbSuccess, cbFailure));
  };

 // console.log(' company review component ', modalData)

  const submitWork = () => {
    if (review === '') {
      alert('Kindly add review.');
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('CompanyId', modalData?.CompanyId);
      formData.append('scale', scale);
      formData.append('review', review);

      const params = {
        companyId: modalData?.CompanyId,
        scale: scale,
        review: review
      }
      console.log('formData ', params)

      //When api is successfull
      const cbSuccess = async message => {
        console.log('Res is ==> ', message);
        getBusinessDetails();
        getRatings();
        setDate('');
        setReview('');
        setScale(5);
        modalizeRef.current?.close();
        setIsLoading(false);
        alert('Review is submitted.');
      };
      //When api is not successfull
      const cbFailure = message => {
        alert(message?.ErrorMessage);
        console.log('Error msg ==> ', message);
        setIsLoading(false);
      };
      dispatch(
        addRatingRequest(params, userData?.Token, cbSuccess, cbFailure),
      );
    }
  };

  const handleConfirm = selectedDate => {
    setDate(moment(selectedDate).format('ll'));
    setDatePickerVisibility(false);
  };

  return (
    <Modalize
      useNativeDriver
      ref={modalizeRef}
      withHandle={false}
      modalStyle={styles.sheetContainer}
      overlayStyle={{ backgroundColor: colors.bg14 }}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      avoidKeyboardLikeIOS={Platform.select({ ios: true, android: false })}>
      <ImageBackground source={appImages.splashBg} style={styles.main}>
        <Loading visible={isLoading} />
        <ScrollView
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          style={{ marginBottom: Platform.OS === 'ios' ? 15 : 0 }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.heading}>{modalData?.CompanyName}</Text>
            <ImageBackground
              style={styles.circleImgStyle}
              source={appImages.circle}>
              <Image
                source={{ uri: modalData?.CompanyIcon }}
                style={styles.profileImgStyle}
              />
            </ImageBackground>
            <View style={styles.ratingContainer}>
              <Rating
                readonly
                imageSize={20}
                tintColor={colors.g9}
                startingValue={Math.round(modalData?.CompanyRatePercentage)}
              />
              <Text style={styles.ratingTxtStyle}>({modalData?.CompanyNumberOfRates})</Text>
            </View>
            <Image
              source={appImages.divider}
              style={styles.dividerImg}
            />
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.ratingTxtStyle}>Add your rate</Text>
              <Rating
                style={{ marginTop: 5 }}
                imageSize={20}
                tintColor={colors.g9}
                startingValue={scale}
                onFinishRating={(rating) => {
                  let val = rating;
                  setScale(val)
                  console.log("val ", val, ' rating ', rating, 'scale ', scale)

                }}
              />

            </View>
            <NotesInput
              isHeightSm
              value={review}
              placeholder={'Add Your Review '}
              onChangeText={txt => setReview(txt)}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => submitWork()}
              style={styles.sendBtn}>
              <ImageBackground
                resizeMode="contain"
                source={appImages.btnBg}
                style={styles.sendButtonStyle}>
                <Text style={styles.sendBtnTxt}>Send</Text>
              </ImageBackground>
            </TouchableOpacity>
            <Divider style={styles.dividerStyle} orientation="vertical" />
            <Text style={styles.subHeading}>Previous reviews</Text>
            <View style={{ width: width / 1.1 }}>
              {data.map(item => {
                return <UserCard item={item} isReview />;
              })}
            </View>
            {/* <FlatList
              data={[1, 2, 3, 4, 5, 6]}
              renderItem={() => {
                return <UserCard name={'Bandar'} date={'Date'} isRating />;
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{width: width / 1.1}}
              keyExtractor={(item, index) => (item + index).toString()}
            /> */}
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </ScrollView>
      </ImageBackground>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    width: width,
    height: height,
  },
  scrollViewStyles: {
    flexGrow: 1,
    height: height,
    marginBottom: 15,
  },
  container: {
    flexGrow: 1,
    width: width,
    minHeight: height,
    marginTop: HP('8'),
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.bg14,
  },
  circleImgStyle: {
    width: WP('33'),
    height: WP('33'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'android' ? WP('19') : WP('20'),
    height: Platform.OS === 'android' ? WP('12') : WP('11'),
  },
  profileImgStyle: {
    width: WP('25'),
    height: WP('25'),
    borderRadius: WP('25'),
  },
  sendBtn: {
    marginTop: 10,
    marginBottom: HP('4'),
  },
  dividerStyle: {
    left: 5,
    borderWidth: 2,
    alignSelf: 'center',
    width: width / 1.03,
    borderColor: colors.p1,
  },
  heading: {
    marginTop: 5,
    color: colors.white,
    fontSize: size.large,
    paddingVertical: HP('0.5'),
    fontFamily: family.Poppins_Regular,
  },
  subHeading: {
    marginTop: 5,
    marginBottom: 10,
    color: colors.white,
    fontSize: size.small,
    paddingVertical: HP('0.5'),
    fontFamily: family.Poppins_Medium,
  },
  sendBtnTxt: {
    color: colors.white,
    fontSize: size.small,
    textAlign: 'center',
    fontFamily: family.Poppins_Medium,
  },
  ratingContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingTxtStyle: {
    marginLeft: HP('1'),
    color: colors.white,
    fontSize: size.tiny,
    justifyContent: 'center',
    fontFamily: family.Poppins_Regular,
  },
  dividerImg: {
    marginBottom: HP(4),
    marginTop: HP(2),
    marginHorizontal: HP(5),
    alignSelf: 'center',
    width: HP(25),
    height: HP(0.5),
  },
});
