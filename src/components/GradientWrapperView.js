import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import { Colors } from '../styles/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ImagePaths } from '../utils/ImagePaths';
import { GlobalStyles } from '../styles/GlobalStyles';
import { AppStrings } from '../utils/AppStrings';
import CustomLoader from './CustomLoader';

const GradientWrapperView = ({ children, bgColor, style, isReverse, isAuth, isShowLoader }) => {

    return (
        <LinearGradient
            style={[
                styles.container,
                isAuth ? { justifyContent: 'flex-end' } : {},
                style]
            }
            colors={isReverse ?
                [Colors.WHITE, Colors.PRIMARY]
                : [bgColor ? bgColor : Colors.PRIMARY, Colors.WHITE]
            }>
            {isShowLoader ? <CustomLoader /> : null}
            {isAuth ?
                <>
                    <Text style={[GlobalStyles.titleText, GlobalStyles.authTitle]}>{AppStrings.SIGN_UP}</Text>
                    <ImageBackground
                        source={ImagePaths.CROSS_BACKGROUND_IMAGE}
                        style={styles.backgroundImage}
                        resizeMode={'stretch'}>
                        {children}
                    </ImageBackground>
                </>
                :
                children
            }
        </LinearGradient>
    );
};

export default GradientWrapperView;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        height: hp(80),
        width: wp(100),
        justifyContent: 'center',
        paddingHorizontal: wp(15)
    }
});
