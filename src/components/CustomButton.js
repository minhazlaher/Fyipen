import React from 'react';
import { Fonts } from '../styles/Fonts';
import { Colors } from '../styles/Colors';
import { FontSizes } from '../styles/FontSizes';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomButton = ({ isPrimary, btnText, isUpperCase, ...props }) => {
    return (
        <TouchableOpacity
            {...props}
            style={[isPrimary ? styles.primaryBtnView
                : styles.btnView, props.style]}>
            <Text style={[styles.primaryBtnText,
            isPrimary ? {} : styles.btnText,
            isUpperCase ? { textTransform: 'uppercase' } : {}
            ]}>{btnText}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    primaryBtnView: {
        marginTop: hp(2),
        marginBottom: hp(4),
        alignItems: 'center',
        borderRadius: wp(10),
        paddingVertical: wp(2),
        backgroundColor: Colors.PRIMARY
    },
    btnView: {
        alignItems: 'center',
        borderRadius: wp(10),
        paddingVertical: wp(2),
        backgroundColor: Colors.RED_LIGHT
    },
    primaryBtnText: {
        color: Colors.SECONDARY_TEXT,
        fontFamily: Fonts.FONT_POP_BOLD,
        fontSize: FontSizes.FONT_SIZE_28,
    },
    btnText: {
        fontFamily: Fonts.FONT_POP_SEMI_BOLD
    }
});
