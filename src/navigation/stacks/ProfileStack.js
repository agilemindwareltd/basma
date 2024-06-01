import * as React from 'react';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Profile from '../../screens/Main/Profile';

const Stack = createNativeStackNavigator();

function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
