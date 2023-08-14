import { Alert } from "react-native";
import { AppStrings } from "../utils/AppStrings";

export const AppAlert = (title, message, onPositivePress, onNegativePress) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: AppStrings.CANCEL,
                onPress: () => onNegativePress?.()
            },
            {
                text: AppStrings.OK,
                onPress: () => onPositivePress?.()
            }
        ])
};
