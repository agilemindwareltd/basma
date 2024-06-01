import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import BusinessArea from '../../screens/Main/Home/BusinessArea';
import Cinema from '../../screens/Main/Home/Cinema';
import Movies from '../../screens/Main/Home/Movies';
import Hotels from '../../screens/Main/Home/Hotels';
import HotelDetails from '../../screens/Main/Home/HotelDetails';
import Restaurants from '../../screens/Main/Home/Restaurants';
import RestaurantDetails from '../../screens/Main/Home/RestaurantDetails';
import Cafe from '../../screens/Main/Home/Cafe';
import CafeDetails from '../../screens/Main/Home/CafeDetails';
import Tourism from '../../screens/Main/Home/Tourism';
import TourismDetails from '../../screens/Main/Home/TourismDetails';
import Productive from '../../screens/Main/Home/Productive';
import ProductiveDetails from '../../screens/Main/Home/ProductiveDetails';

const Stack = createStackNavigator();

function BusinessStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="BusinessArea"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="BusinessArea" component={BusinessArea} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="Cinema" component={Cinema} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="Movies" component={Movies} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="Hotels" component={Hotels} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="HotelDetails" component={HotelDetails} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="Restaurants" component={Restaurants} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="RestaurantDetails" component={RestaurantDetails} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="Cafe" component={Cafe} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="CafeDetails" component={CafeDetails} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="Tourism" component={Tourism} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="TourismDetails" component={TourismDetails} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="Productive" component={Productive} />
      <Stack.Screen
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        name="ProductiveDetails" component={ProductiveDetails} />
    </Stack.Navigator>
  );
}

export default BusinessStack;
