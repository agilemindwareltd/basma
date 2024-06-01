import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import Login from '../../screens/Auth/Login';
import SignUp from '../../screens/Auth/SignUp';
import AddPhoneForSocial from '../../screens/Auth/AddPhoneForSocial';
import ForgetPassword from '../../screens/Auth/ForgetPassword';
import Verification from '../../screens/Auth/Verification';
import ResetPassword from '../../screens/Auth/ResetPassword';

const Stack = createStackNavigator();

function AuthStack(props) {

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, }} name="Login" component={Login} />

      <Stack.Screen name="SignUp" options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, }} component={SignUp} />

      <Stack.Screen name="Verification" options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, }} component={Verification} />

      <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, }} />

      <Stack.Screen name="AddPhoneForSocial" options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, }} component={AddPhoneForSocial} />

      <Stack.Screen name="ResetPassword" options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, }} component={ResetPassword} />
    </Stack.Navigator>
  );
}

export default AuthStack;
