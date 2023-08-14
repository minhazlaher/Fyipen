import React from 'react';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { useSelector } from 'react-redux';
import { ScreenNames } from '../utils/Constant';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AppNavigation = () => {

    const Stack = createNativeStackNavigator();
    const { userData } = useSelector((state) => state.AuthReducer);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={userData ? ScreenNames.HOME_STACK : ScreenNames.AUTH_STACK}>
                <Stack.Screen
                    name={ScreenNames.AUTH_STACK}
                    component={AuthStack} />
                <Stack.Screen
                    name={ScreenNames.HOME_STACK}
                    component={HomeStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
