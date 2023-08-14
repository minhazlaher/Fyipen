import React from 'react';
import { ScreenNames } from '../utils/Constant';
import OTPScreen from '../screens/auth/OTPScreen';
import NameScreen from '../screens/auth/NameScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import PhoneNumberScreen from '../screens/auth/PhoneNumberScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={ScreenNames.WELCOME_SCREEN}>
            <Stack.Screen
                name={ScreenNames.WELCOME_SCREEN}
                component={WelcomeScreen} />
            <Stack.Screen
                name={ScreenNames.PHONE_NUMBER_SCREEN}
                component={PhoneNumberScreen} />
            <Stack.Screen
                name={ScreenNames.OTP_SCREEN}
                component={OTPScreen} />
            <Stack.Screen
                name={ScreenNames.NAME_SCREEN}
                component={NameScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;
