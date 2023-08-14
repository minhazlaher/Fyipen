import React from 'react';
import { Colors } from '../styles/Colors';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const CustomLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size={"large"}
                color={Colors.PRIMARY}
            />
        </View>
    );
};

export default CustomLoader;

const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: Colors.BLACK_LIGHT
    }
});
