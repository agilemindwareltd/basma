import React from 'react';
import {View, Image, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HP, colors, appIcons} from '../../utilities';

// Bottom Tabs Screens
import HomeStack from '../stacks/HomeStack';
import LocationStack from '../stacks/LocationStack';
import CameraStack from '../stacks/CameraStack';
import EventStack from '../stacks/EventStack';
import ProfileStack from '../stacks/ProfileStack';

const Tab = createBottomTabNavigator();

export default BottomTabs = ({params, navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, presentation: 'fullScreenModal'}}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: colors.p1,
        inactiveTintColor: colors.g5,
        labelPosition: 'below-icon',
        showLabel: false,
        tabStyle: {
          height: Platform.OS === 'android' ? HP('8') : HP('7'),
          backgroundColor: 'black',
        },
      }}>
      <Tab.Screen
        component={HomeStack}
        name={'Home'}
        options={{
          tabBarLabel: '.',
          tabBarIcon: ({focused}) => (
            <Image source={appIcons.home} style={styles.iconStyle} />
          ),
        }}
      />
      <Tab.Screen
        component={LocationStack}
        name={'Location'}
        options={{
          tabBarLabel: '.',
          tabBarIcon: ({focused}) => (
            <Image source={appIcons.map} style={styles.iconStyle1} />
          ),
        }}
      />

      <Tab.Screen
        component={CameraStack}
        name={'Camera'}
        options={{
          tabBarButton: props => (
            <TouchableOpacity
              activeOpacity={1}
              {...props}
              onPress={() => {
                if (true) {
                  navigation.navigate('FullScreenCamera');
                } else {
                  props.onPress();
                }
              }}
            />
          ),
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <View style={styles.iconContainer}>
              <Image source={appIcons.camera} style={styles.iconStyle2} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        component={EventStack}
        name={'Events'}
        options={{
          tabBarLabel: '.',
          tabBarIcon: ({focused}) => (
            <Image source={appIcons.events} style={styles.iconStyle} />
          ),
        }}
      />
      <Tab.Screen
        component={ProfileStack}
        name={'Profile'}
        options={{
          tabBarLabel: '.',
          tabBarIcon: ({focused}) => (
            <Image source={appIcons.profile} style={styles.iconStyle} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 30,
    height: 30,
    bottom: Platform.OS === 'android' ? 5 : 1,
  },
  iconStyle1: {
    width: 30,
    height: 35,
    bottom: Platform.OS === 'android' ? 5 : 1,
  },
  iconContainer: {
    width: 70,
    height: 70,
    bottom: '50%',
    borderWidth: 5,
    borderRadius: 50,
    alignItems: 'center',
    borderColor: colors.g1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  iconStyle2: {
    width: 30,
    height: 30,
  },
});
