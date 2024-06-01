import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Events from '../../screens/Main/Events';

const Stack = createNativeStackNavigator();

function EventStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Events"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Events" component={Events} />
    </Stack.Navigator>
  );
}

export default EventStack;
