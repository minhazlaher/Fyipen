import { StyleSheet, Text, TextInput, View, TextInputProps } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '../styles/Colors';
import { Fonts } from '../styles/Fonts';
import { FontSizes } from '../styles/FontSizes';

const CustomTextInput = ({ title, error, ...props }) => {
    return (
        <>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                {...props}
                style={[styles.textInput, props.style]}
            />
            <Text style={styles.errorText}>{error}</Text>
        </>
    );
};

export default CustomTextInput

const styles = StyleSheet.create({
    title: {
        marginBottom: hp(1),
        color: Colors.PRIMARY_TEXT,
        fontFamily: Fonts.FONT_POP_BOLD,
        fontSize: FontSizes.FONT_SIZE_20
    },
    textInput: {
        borderRadius: wp(10),
        paddingVertical: wp(4),
        paddingHorizontal: wp(3),
        fontSize: FontSizes.FONT_SIZE_16,
        backgroundColor: Colors.TEXT_INPUT_BG
    },
    errorText: {
        marginTop: hp(1),
        color: Colors.RED,
        fontFamily: Fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.FONT_SIZE_16
    }
})
