import React from 'react';
import { Fonts } from '../styles/Fonts';
import { Colors } from '../styles/Colors';
import { FontSizes } from '../styles/FontSizes';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomHeader = ({ title }) => {
    return (
        <SafeAreaView edges={['top']} style={styles.containerView}>
            <View style={styles.imageView}>
                <Image style={styles.image}></Image>
            </View>
            <Text style={styles.title}>{title}</Text>
        </SafeAreaView>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    containerView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(3),
        paddingHorizontal: wp(5),
    },
    title: {
        flex: 1,
        marginLeft: wp(3),
        color: Colors.SECONDARY_TEXT,
        fontFamily: Fonts.FONT_POP_BOLD,
        fontSize: FontSizes.FONT_SIZE_32
    },
    imageView: {
        width: wp(16),
        height: wp(16),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.WHITE
    },
    image: {
        width: wp(13),
        height: wp(13),
        borderRadius: wp(10),
        backgroundColor: Colors.SILVER_TEXT
    }
});
