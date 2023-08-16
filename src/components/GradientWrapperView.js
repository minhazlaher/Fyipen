import React from 'react';
import { Colors } from '../styles/Colors';
import CustomLoader from './CustomLoader';
import { ImagePaths } from '../utils/ImagePaths';
import { AppStrings } from '../utils/AppStrings';
import { GlobalStyles } from '../styles/GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GradientWrapperView = ({ children, bgColor, style, isReverse, isAuth, isShowLoader }) => {
    return (
        <LinearGradient
            style={[
                styles.container,
                isAuth ? styles.authContainer : {},
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
    authContainer: {
        justifyContent: 'flex-end'
    },
    backgroundImage: {
        height: hp(80),
        width: wp(100),
        justifyContent: 'center',
        paddingHorizontal: wp(15)
    }
});
