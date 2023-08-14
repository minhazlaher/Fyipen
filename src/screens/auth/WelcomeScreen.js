import React from 'react';
import { Fonts } from '../../styles/Fonts';
import { Colors } from '../../styles/Colors';
import { ScreenNames } from '../../utils/Constant';
import { FontSizes } from '../../styles/FontSizes';
import { ImagePaths } from '../../utils/ImagePaths';
import { AppStrings } from '../../utils/AppStrings';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientWrapperView from '../../components/GradientWrapperView';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const WelcomeScreen = () => {

    const navigation = useNavigation();

    const onNext = () => {
        navigation.navigate(ScreenNames.PHONE_NUMBER_SCREEN);
    };

    return (
        <GradientWrapperView isReverse>
            <ImageBackground
                source={ImagePaths.WELCOME_SCREEN_BACKGROUND}
                style={styles.backgroundImage}
                resizeMode={'stretch'}>
                <SafeAreaView>
                    <View style={styles.tasktooView}>
                        <Text style={styles.taskooText}>{AppStrings.TASKOO}</Text>
                    </View>
                </SafeAreaView>
                <Image source={ImagePaths.WELCOME_SCREEN_IMAGE}
                    style={styles.placeholderImage} />
                <View style={styles.textView}>
                    <Text style={styles.manageText}>{AppStrings.MANAGE_EVERY_TASK}</Text>
                    <Text style={styles.detailsText}>{AppStrings.WELCOME_SCREEN_DETAILS}</Text>
                </View>
                <TouchableOpacity onPress={onNext} style={styles.nextBtn}>
                    <Image style={styles.nextImage} source={ImagePaths.NEXT_BUTTON_IMAGE} />
                </TouchableOpacity>
            </ImageBackground>
        </GradientWrapperView>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    backgroundImage: {
        height: hp(85),
        width: wp(100),
        justifyContent: 'space-around'
    },
    tasktooView: {
        marginLeft: wp(5),
        borderRadius: wp(5),
        paddingVertical: wp(1),
        alignSelf: 'flex-start',
        paddingHorizontal: wp(5),
        backgroundColor: Colors.PRIMARY_LIGHT
    },
    taskooText: {
        color: Colors.PRIMARY_TEXT,
        fontSize: FontSizes.FONT_SIZE_16,
        fontFamily: Fonts.FONT_POP_SEMI_BOLD
    },
    placeholderImage: {
        width: wp(100),
        height: hp(35)
    },
    textView: {
        marginBottom: hp(7),
        alignItems: 'center'
    },
    manageText: {
        color: Colors.NAVY_BLUE_TEXT,
        fontFamily: Fonts.FONT_POP_BOLD,
        fontSize: FontSizes.FONT_SIZE_28
    },
    detailsText: {
        marginTop: hp(1),
        textAlign: 'center',
        color: Colors.BLUE_TEXT,
        fontSize: FontSizes.FONT_SIZE_16,
        fontFamily: Fonts.FONT_POP_SEMI_BOLD
    },
    nextBtn: {
        width: wp(15),
        height: wp(15),
        borderRadius: wp(8),
        alignSelf: 'center'
    },
    nextImage: {
        width: '100%',
        height: '100%'
    }
});
