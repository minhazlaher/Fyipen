import { ImagePaths } from "./ImagePaths";

const ScreenNames = {
    AUTH_STACK: "AUTH_STACK",
    WELCOME_SCREEN: "WELCOME_SCREEN",
    PHONE_NUMBER_SCREEN: "PHONE_NUMBER_SCREEN",
    OTP_SCREEN: "OTP_SCREEN",
    NAME_SCREEN: "NAME_SCREEN",

    HOME_STACK: "HOME_STACK",
    HOME_SCREEN: "HOME_SCREEN",
    CREATE_TASK_SCREEN: "CREATE_TASK_SCREEN",
};

const AsyncKey = {
    ROOT_REDUCER: "ROOT_REDUCER"
};

const IconList = [
    { icon: ImagePaths.BOLD_ICON },
    { icon: ImagePaths.ITALIC_ICON },
    { icon: ImagePaths.UNDERLINE_ICON },
    { icon: ImagePaths.MORE_ICON }
];

const BottomIconList = [
    {
        id: 1,
        icon: ImagePaths.TIMER_ICON,
        selectedIcon: ImagePaths.SELECTED_TIMER_ICON
    },
    {
        id: 2,
        icon: ImagePaths.SUITCASE_ICON,
        selectedIcon: ImagePaths.SELECTED_SUITCASE_ICON
    },
    {
        id: 3,
        icon: ImagePaths.PERSON_ICON,
        selectedIcon: ImagePaths.SELECTED_PERSON_ICON
    },
];

export { ScreenNames, AsyncKey, IconList, BottomIconList };
