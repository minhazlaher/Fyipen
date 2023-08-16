import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Fonts } from '../../styles/Fonts';
import { Colors } from '../../styles/Colors';
import { axiosClient } from '../../config/Axios';
import DatePicker from 'react-native-date-picker';
import { FontSizes } from '../../styles/FontSizes';
import { AppStrings } from '../../utils/AppStrings';
import { AppAlert } from '../../components/AppAlert';
import { formatDate } from '../../utils/HelperFunction';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { ApiConstants } from '../../config/ApiConstants';
import { useNavigation } from '@react-navigation/native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import { BottomIconList, ScreenNames } from '../../utils/Constant';
import GradientWrapperView from '../../components/GradientWrapperView';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CreateTaskScreen = () => {

    const editorRef = useRef();
    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [date, setDate] = useState(null);
    const [details, setDetails] = useState('');
    const [isWork, setIsWork] = useState(false);
    const [isPersonal, setIsPersonal] = useState(false);
    const [openDateModal, setOpenDateModal] = useState(false);

    const { userData } = useSelector((state) => state.AuthReducer);

    const IconImage = ({ id, icon }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (id == 1) {
                        setOpenDateModal(true);
                    } else if (id == 2) {
                        setIsWork(!isWork);
                        setIsPersonal(false);
                    } else {
                        setIsWork(false);
                        setIsPersonal(!isPersonal);
                    }
                }}>
                <Image
                    source={icon}
                    style={styles.iconImage}
                    resizeMode={"contain"}
                />
            </TouchableOpacity>
        );
    };

    const createNewTask = async (params) => {
        try {
            const response = await axiosClient.post(ApiConstants.CREATE_OR_GET_OR_UPDATE_TASK, params);
            if (response.status == 201) {
                AppAlert(AppStrings.SUCCESS, AppStrings.TASK_CREATED_MSG);
                navigation.navigate(ScreenNames.HOME_SCREEN);
            } else {
                if (response.status != 500 && response.data?.message) {
                    AppAlert(AppStrings.ERROR, response.data?.message);
                } else {
                    AppAlert(AppStrings.ERROR, AppStrings.SERVER_ERROR_MESSAGE);
                };
            };
        } catch (e) {
            if (e?.response?.status != 500 && e?.response?.data?.message) {
                AppAlert(AppStrings.ERROR, e.response.data.message);
            } else {
                AppAlert(AppStrings.ERROR, AppStrings.SERVER_ERROR_MESSAGE);
            };
        };
    };

    const onCreate = () => {
        if (title) {
            if (details && details != "<p><br></p>") {
                if (date) {
                    if (isWork || isPersonal) {
                        const params = {
                            phone: userData.phone,
                            name: title,
                            details: details,
                            category: isWork ? "work" : "personal",
                            expiry_date: formatDate(date)
                        };
                        createNewTask(params);
                    } else {
                        AppAlert(AppStrings.Warning, AppStrings.SELECT_CATEGORY);
                    };
                } else {
                    AppAlert(AppStrings.Warning, AppStrings.SELECT_EXPIRY_DATE_TIME);
                };
            } else {
                AppAlert(AppStrings.Warning, AppStrings.ENTER_TASK_DETAILS);
            };
        } else {
            AppAlert(AppStrings.Warning, AppStrings.ENTER_TITLE);
        };
    };

    return (
        <GradientWrapperView>
            <KeyboardAwareScrollView enableOnAndroid contentContainerStyle={{ flex: 1 }}>
                <CustomHeader title={AppStrings.NEW_TASK} />
                <View style={[GlobalStyles.container, { justifyContent: 'space-evenly' }]}>
                    <TextInput
                        value={title}
                        placeholder={AppStrings.TITLE}
                        onChangeText={(text) => setTitle(text)}
                        style={[styles.titleTextInput, GlobalStyles.shadowView]}>
                    </TextInput>

                    <View style={[styles.toolbarView, GlobalStyles.shadowView]}>
                        <QuillToolbar
                            editor={editorRef}
                            theme="light"
                            options={[
                                ['bold', 'italic', 'underline', { 'list': 'bullet' }]
                            ]}
                            styles={{
                                toolbar: {
                                    provider: (provided) => ({
                                        // ...provided,
                                        backgroundColor: Colors.PRIMARY_BG
                                    }),
                                    root: (provided) => ({
                                        // ...provided,
                                        backgroundColor: Colors.PRIMARY_BG
                                    }),
                                },
                                // separator: (provided) => ({
                                //     ...provided,
                                //     color: Colors.PRIMARY_BG,
                                //     backgroundColor: Colors.PRIMARY_BG
                                // }),
                            }}
                        />
                    </View>
                    <View style={[styles.editorContainer, GlobalStyles.shadowView]}>
                        <QuillEditor
                            container
                            ref={editorRef}
                            style={styles.editorView}
                            onHtmlChange={(details) => setDetails(details.html)}
                        />
                    </View>
                    <View style={[styles.iconView, styles.bottomIconView, GlobalStyles.shadowView]}>
                        {BottomIconList.map((item) => {
                            return (
                                <IconImage
                                    id={item.id}
                                    icon={
                                        item.id == 1 && date ? item.selectedIcon
                                            : item.id == 2 && isWork ? item.selectedIcon
                                                : item.id == 3 && isPersonal ? item.selectedIcon
                                                    : item.icon
                                    }
                                />
                            )
                        })}
                    </View>
                    <DatePicker
                        modal
                        locale="en_GB"
                        is24hourSource="locale"
                        open={openDateModal}
                        androidVariant="iosClone"
                        minimumDate={new Date()}
                        date={date ? new Date(date) : new Date()}
                        onConfirm={(date) => {
                            setDate(date);
                            setOpenDateModal(false);
                        }}
                        onCancel={() => {
                            setOpenDateModal(false);
                        }}
                    />
                    <CustomButton
                        isPrimary={false}
                        btnText={AppStrings.CREATE}
                        style={styles.createBtn}
                        onPress={onCreate}
                    />
                </View>
            </KeyboardAwareScrollView>
        </GradientWrapperView>
    );
};

export default CreateTaskScreen;

const styles = StyleSheet.create({
    titleTextInput: {
        borderRadius: wp(10),
        paddingVertical: wp(4),
        paddingHorizontal: wp(8),
        fontSize: FontSizes.FONT_SIZE_24,
        fontFamily: Fonts.FONT_POP_SEMI_BOLD
    },
    iconView: {
        flexDirection: 'row',
        borderRadius: wp(10),
        paddingVertical: wp(5),
        paddingHorizontal: wp(8),
        marginHorizontal: wp(10),
        justifyContent: 'space-between',
    },
    bottomIconView: {
        marginHorizontal: 0,
        paddingHorizontal: wp(20),
    },
    iconImage: {
        width: wp(10),
        height: wp(10),
    },
    toolbarView: {
        zIndex: 1,
        padding: wp(3),
        alignSelf: 'center',
        borderRadius: wp(10),
        marginBottom: wp(-15),
        backgroundColor: Colors.PRIMARY_BG,
    },
    editorContainer: {
        width: wp(90),
        height: hp(35),
        padding: wp(10),
        borderRadius: wp(10),
    },
    editorView: {
        width: '100%',
        height: '100%',
    },
    createBtn: {
        marginHorizontal: wp(12)
    }
});