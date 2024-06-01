import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from '../../screens/Main/Profile';
import PersonalProfile from '../../screens/Main/Profile/PersonalProfile';
import PrivacyPolicy from '../../screens/Main/Profile/HelpAndInfo/PrivacyPolicy';
import TermsAndConditions from '../../screens/Main/Profile/HelpAndInfo/TermsAndCondition';
import ContactUs from '../../screens/Main/Profile/HelpAndInfo/ContactUs';
import Ratings from '../../screens/Main/Profile/Ratings';
import RegisterCompany from '../../screens/Main/Profile/RegisterCompany';
import AddaService from '../../screens/Main/Profile/AddaService';
import IWasHere from '../../screens/Main/Profile/IWasHere';

const Stack = createNativeStackNavigator();

function AppScreens(props) {
    return (
        <Stack.Navigator
            initialRouteName="PersonalProfile"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PersonalProfile" component={PersonalProfile} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="Ratings" component={Ratings} />
            <Stack.Screen name="RegisterCompany" component={RegisterCompany} />
            <Stack.Screen name="AddaService" component={AddaService} />
            <Stack.Screen name="IWasHere" component={IWasHere} />
        </Stack.Navigator>
    );
}

export default AppScreens;
