import { Platform, StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { FontSizes } from "./FontSizes";
import { Fonts } from "./Fonts";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const GlobalStyles = StyleSheet.create({
    authBackgroundImage: {
        height: hp(75),
        width: wp(100),
    },
    titleText: {
        fontSize: FontSizes.FONT_SIZE_36,
        fontFamily: Fonts.FONT_POP_BOLD,
        color: Colors.SECONDARY_TEXT
    },
    authTitle: {
        marginLeft: wp(6),
        marginBottom: hp(2)
    },
    container: {
        flex: 1,
        paddingTop: hp(4),
        paddingHorizontal: wp(5),
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        backgroundColor: Colors.PRIMARY_BG
    },
    rowCenterView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    shadowView: {
        elevation: 5,
        shadowRadius: 5,
        shadowOpacity: 1,
        backgroundColor: Colors.PRIMARY_BG,
        shadowOffset: { width: 0, height: 0.5 },
        shadowColor: Platform.OS == "ios" ? Colors.SHADOW : Colors.BLACK,
    }
});
