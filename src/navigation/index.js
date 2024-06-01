import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Splash from '../screens/Splash';
import AuthStack from './stacks/AuthStack';
import PersonalProfile from '../screens/Main/Profile/PersonalProfile';
import PrivacyPolicy from '../screens/Main/Profile/HelpAndInfo/PrivacyPolicy';

import TermsAndConditions from '../screens/Main/Profile/HelpAndInfo/TermsAndCondition';
import ContactUs from '../screens/Main/Profile/HelpAndInfo/ContactUs';
import FullImageScreen from '../screens/Main/FullImageScreen';

import AddaService from '../screens/Main/Profile/AddaService';
import IWasHere from '../screens/Main/Profile/IWasHere';
import Ratings from '../screens/Main/Profile/Ratings';
import RegisterCompany from '../screens/Main/Profile/RegisterCompany/RegisterCompany';
import BottomTabs from './tabs/BottomTabs';
import BusinessStack from './stacks/BusinessStack';
import FullScreenCamera from '../screens/Main/Camera/Camera';
import Preview from '../screens/Main/Camera/Preview';
import AddSound from '../screens/Main/Camera/AddSound';

const MainAppNav = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animationEnabled: true }}>

        <AppStack.Screen name={'FullImagescreen'} component={FullImageScreen} 
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}
        // options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, }}
         />

        <AppStack.Screen name={'Splash'} component={Splash} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, }} />

        <AppStack.Screen name={'Auth'} component={AuthStack} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, }} />

        <AppStack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} name="PersonalProfile" component={PersonalProfile} />

        <AppStack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} name="PrivacyPolicy" component={PrivacyPolicy} />

        <AppStack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} name="TermsAndConditions" component={TermsAndConditions} />

        <AppStack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} name="ContactUs" component={ContactUs} />

        <AppStack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} name="Ratings" component={Ratings} />

        <AppStack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} name="RegisterCompany" component={RegisterCompany} />

        <AppStack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} name="AddaService" component={AddaService} />

        <AppStack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} name="IWasHere" component={IWasHere} />

        <AppStack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} name={'App'} component={BottomTabs} />

        <AppStack.Screen name={'Business'} component={BusinessStack} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} />

        <AppStack.Screen name={'FullScreenCamera'} component={FullScreenCamera} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} />
        
        <AppStack.Screen name={'Preview'} component={Preview} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} />
        <AppStack.Screen name={'AddSound'} component={AddSound} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} />


      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default MainAppNav;
