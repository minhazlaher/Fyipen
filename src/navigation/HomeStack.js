import React from 'react';
import { ScreenNames } from '../utils/Constant';
import HomeScreen from '../screens/home/HomeScreen';
import CreateTaskScreen from '../screens/home/CreateTaskScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={ScreenNames.HOME_SCREEN}>
            <Stack.Screen
                name={ScreenNames.HOME_SCREEN}
                component={HomeScreen} />
            <Stack.Screen
                name={ScreenNames.CREATE_TASK_SCREEN}
                component={CreateTaskScreen} />
        </Stack.Navigator>
    );
};

export default HomeStack;
