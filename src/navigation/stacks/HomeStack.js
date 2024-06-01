import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../../screens/Main/Home';

const Stack = createNativeStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default HomeStack;
