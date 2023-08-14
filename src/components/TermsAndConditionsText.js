import React from 'react';
import { Fonts } from '../styles/Fonts';
import { Colors } from '../styles/Colors';
import { StyleSheet, Text } from 'react-native';
import { FontSizes } from '../styles/FontSizes';
import { AppStrings } from '../utils/AppStrings';

const TermsAndConditionsText = () => {
    return (
        <Text style={styles.textStyle}>{AppStrings.BY_SIGNIN}
            <Text style={styles.termsText}>
                {AppStrings.TERMS_AND_CONDITIONS}
            </Text>
            {AppStrings.OF_TASKOO}
        </Text>
    );
};

export default TermsAndConditionsText;

const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'center',
        color: Colors.SILVER_TEXT,
        fontSize: FontSizes.FONT_SIZE_16,
        fontFamily: Fonts.FONT_POP_SEMI_BOLD
    },
    termsText: {
        color: Colors.PURPLE_TEXT,
        fontFamily: Fonts.FONT_POP_BOLD
    }
});
