import React from 'react';
import { Fonts } from '../styles/Fonts';
import { Colors } from '../styles/Colors';
import { FontSizes } from '../styles/FontSizes';
import { AppStrings } from '../utils/AppStrings';
import { ImagePaths } from '../utils/ImagePaths';
import { StyleSheet, Text, View, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const PlaceHolderView = ({ ...props }) => {
    return (
        <View {...props} style={[styles.container, props.style]}>
            <Image
                source={ImagePaths.PLACE_HOLDER_IMAGE}
                style={styles.placeHolderImage}
                resizeMode={"contain"}
            />
            <Text style={styles.placeHolderText}>{AppStrings.CREATE_A_TASK}</Text>
        </View>
    );
};

export default PlaceHolderView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    placeHolderImage: {
        width: wp(90),
        height: hp(30),
        marginBottom: hp(4)
    },
    placeHolderText: {
        textAlign: 'center',
        color: Colors.GREY_TEXT,
        fontSize: FontSizes.FONT_SIZE_24,
        fontFamily: Fonts.FONT_POP_SEMI_BOLD
    }
});
