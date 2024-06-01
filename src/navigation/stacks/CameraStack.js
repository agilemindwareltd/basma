import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Camera from '../../screens/Main/Camera';

const Stack = createNativeStackNavigator();

function CameraStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Camera"
      screenOptions={{headerShown: false, presentation: 'fullScreenModal'}}>
      <Stack.Screen name="Camera" component={Camera} />
    </Stack.Navigator>
  );
}

export default CameraStack;
