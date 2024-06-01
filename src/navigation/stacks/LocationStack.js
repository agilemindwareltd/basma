import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Location from '../../screens/Main/Location';

const Stack = createNativeStackNavigator();

function LocationStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Location"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Location" component={Location} />
    </Stack.Navigator>
  );
}

export default LocationStack;
