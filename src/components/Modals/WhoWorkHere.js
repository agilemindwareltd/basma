import React, {useState, useEffect} from 'react';
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
import {Divider} from 'react-native-elements';
import {Modalize} from 'react-native-modalize';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {NotesInput, UserCard} from '../../components';
import {appImages} from '../../assets';
import {Loading} from '../../components/Loading';
import {WP, colors, HP, family, size} from '../../utilities';

// redux stuff
import {useSelector, useDispatch} from 'react-redux';
import {getWorkersRequest, joinWorkRequest} from '../../redux/actions';

const {width, height} = Dimensions.get('window');

export const WhoWorkHere = ({modalizeRef, modalData}) => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // redux stuff
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.login);

  useEffect(() => {
    if (modalData?.CompanyId) {
      getWorkers();
    }
  }, [modalData]);

  const getWorkers = () => {
    // setIsLoading(true);
    //When api is successfull
    const cbSuccess = async message => {
      console.log('Workers are ==> ', message?.Response);
      setData(message?.Response);
      setIsLoading(false);
    };
    //When api is not successfull
    const cbFailure = message => {
      console.log('Msgs are ==> ', message);
      setIsLoading(false);
    };
    dispatch(
      getWorkersRequest(
        modalData.CompanyId,
        userData.Token,
        cbSuccess,
        cbFailure,
      ),
    );
  };

  const submitWork = () => {
    if (date === '') {
      alert('Kindly add work starting date.');
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('CompanyId', modalData?.CompanyId);
      formData.append('JoinDate', date);

      //When api is successfull
      const cbSuccess = async message => {
        console.log('Res is ==> ', message);
        getWorkers();
        setDate('');
        modalizeRef.current?.close();
        setIsLoading(false);
        alert('Joining date is submitted.');
      };
      //When api is not successfull
      const cbFailure = message => {
        alert(message?.ErrorMessage);
        console.log('Error msg ==> ', message);
        setIsLoading(false);
      };
      dispatch(
        joinWorkRequest(formData, userData?.Token, cbSuccess, cbFailure),
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
      overlayStyle={{backgroundColor: colors.bg14}}
      scrollViewProps={{showsVerticalScrollIndicator: false}}
      avoidKeyboardLikeIOS={Platform.select({ios: true, android: false})}>
      <ImageBackground source={appImages.splashBg} style={styles.main}>
        <Loading visible={isLoading} />
        <ScrollView
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          style={{marginBottom: Platform.OS === 'ios' ? 15 : 0}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.heading}>{modalData?.CompanyName}</Text>
            <ImageBackground
              style={styles.circleImgStyle}
              source={appImages.circle}>
              <Image
                source={{uri: modalData?.CompanyIcon}}
                style={styles.profileImgStyle}
              />
            </ImageBackground>
            <Text style={styles.subHeading}>I Work Here</Text>
            <NotesInput
              editable={false}
              placeholder={'Work Starting Date'}
              onChangeText={txt => setDate(txt)}
              onPress={() => setDatePickerVisibility(true)}
              value={date}
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
            <Text style={styles.subHeading}>Who Work Here</Text>
            <View style={{width: width / 1.1}}>
              {data.map(item => {
                return <UserCard item={item} isRating />;
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
});
