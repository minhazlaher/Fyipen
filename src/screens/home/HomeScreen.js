import React, { useEffect, useState } from 'react';
import { Fonts } from '../../styles/Fonts';
import { Colors } from '../../styles/Colors';
import { axiosClient } from '../../config/Axios';
import RenderHtml from 'react-native-render-html';
import { FontSizes } from '../../styles/FontSizes';
import { ScreenNames } from '../../utils/Constant';
import { LineChart } from 'react-native-chart-kit';
import { ImagePaths } from '../../utils/ImagePaths';
import { AppStrings } from '../../utils/AppStrings';
import { AppAlert } from '../../components/AppAlert';
import { useDispatch, useSelector } from 'react-redux';
import { ApiConstants } from '../../config/ApiConstants';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { getAllTask } from '../../redux/slices/TaskSlice';
import PlaceHolderView from '../../components/PlaceHolderView';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import GradientWrapperView from '../../components/GradientWrapperView';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HomeScreen = () => {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const { userData } = useSelector((state) => state.AuthReducer);
    const { isLoading, allTaskList } = useSelector((state) => state.TaskReducer);

    const [bgColor, setBgColor] = useState(Colors.PRIMARY);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const activeListLength = allTaskList.filter((item) => item.status == "active").length;
        const completedListLength = allTaskList.filter((item) => item.status == "completed").length;
        if (allTaskList.length != 0) {
            if (allTaskList.length == completedListLength) {
                setBgColor(Colors.GREEN);
            } else if (allTaskList.length == activeListLength) {
                setBgColor(Colors.RED);
            } else if (completedListLength >= 1) {
                setBgColor(Colors.YELLOW);
            } else {
                setBgColor(Colors.PRIMARY);
            };
        } else {
            setBgColor(Colors.PRIMARY);
        }
    }, [allTaskList]);

    const getAllTaskList = () => {
        dispatch(getAllTask(`?phone=${userData.phone.replace('+', '%2B')}`));
    };

    useEffect(() => {
        if (isFocused) {
            getAllTaskList()
        }
    }, [isFocused]);

    const updateTask = async (params) => {
        try {
            const response = await axiosClient.put(ApiConstants.CREATE_OR_GET_OR_UPDATE_TASK, params);
            if (response.status == 200) {
                AppAlert(AppStrings.SUCCESS, AppStrings.TASK_UPDATED_MSG);
                setSelectedIndex(null);
                getAllTaskList();
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

    const onComplete = (uniqueLink) => {
        const params = {
            phone: userData.phone,
            uniquelink: uniqueLink,
            status: "completed"
        };
        updateTask(params);
    };

    const ListHeaderComponent = () => {
        return (
            <View style={{ marginHorizontal: wp(5) }}>
                <CustomButton
                    isPrimary={false}
                    btnText={AppStrings.CREATE}
                    isUpperCase
                    onPress={() => navigation.navigate(ScreenNames.CREATE_TASK_SCREEN)}
                />
                {allTaskList.length <= 0 ?
                    <PlaceHolderView style={{ height: hp(70) }} />
                    :
                    <View style={[styles.graphView, GlobalStyles.shadowView]}>
                        <Text style={styles.consistancyText}>{AppStrings.CONSISTANCY}</Text>
                        <LineChart
                            data={{
                                labels: ["1", "2", "3", "4", "5", "6"],
                                datasets: [
                                    {
                                        data: [25, 20, 30, 25, 35, 40],
                                        color: () => Colors.BLUE_TEXT
                                    },
                                    {
                                        data: [20, 30, 20, 40, 15, 20],
                                        color: () => Colors.YELLOW,
                                    }
                                ],
                            }}
                            width={wp(80)}
                            height={hp(30)}
                            yAxisInterval={1}
                            withVerticalLines={false}
                            chartConfig={{
                                propsForDots: {
                                    r: 0,
                                },
                                strokeWidth: 4,
                                decimalPlaces: 0,
                                color: () => Colors.BLUE_TEXT,
                                fillShadowGradientToOpacity: 0,
                                fillShadowGradientFromOpacity: 0,
                                labelColor: () => Colors.BLUE_TEXT,
                                backgroundGradientTo: Colors.PRIMARY_BG,
                                backgroundGradientFrom: Colors.PRIMARY_BG
                            }}
                            style={{
                                marginLeft: wp(-5),
                                marginVertical: hp(1)
                            }}
                        />
                        <View style={[GlobalStyles.rowCenterView, styles.indicatorView]}>
                            <View style={styles.dotView} />
                            <Text style={styles.indicatorText}>{AppStrings.COMPLETED}</Text>
                            <View style={[styles.dotView, { backgroundColor: Colors.YELLOW }]} />
                            <Text style={styles.indicatorText}>{AppStrings.PENDING}</Text>
                        </View>
                    </View>
                }
            </View>
        );
    };

    const ItemSeparatorComponent = () => {
        return (
            <View style={{ height: hp(2) }} />
        );
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedIndex(index == selectedIndex ? null : index)
            }}
                style={[styles.listItemView, GlobalStyles.shadowView, {
                    backgroundColor: item.status == "active" ?
                        bgColor == Colors.RED ?
                            Colors.RED_LIGHT
                            : bgColor
                        : Colors.PRIMARY_BG
                }]}>
                <View style={[GlobalStyles.rowCenterView, styles.listItemSubView]}>
                    <Text style={[styles.listItemText, {
                        color: item.status == "active" ? Colors.SECONDARY_TEXT : Colors.PRIMARY
                    }]}>{item.name}</Text>
                    <Image style={styles.notebookIcon} source={ImagePaths.NOTEBOOK_ICON} />
                </View>
                {index == selectedIndex ?
                    <RenderHtml source={{ html: item.details }} />
                    : null
                }
                <Text style={[styles.timeText, {
                    color: item.status == "active" ? Colors.SECONDARY_TEXT : Colors.GREY_TEXT
                }]}>{item?.expiry_date}</Text>
                {index == selectedIndex && item?.status != "completed" ?
                    <View style={[GlobalStyles.rowCenterView, { marginTop: hp(1), justifyContent: 'space-around' }]}>
                        <TouchableOpacity
                            onPress={() => setSelectedIndex(null)}
                            style={[styles.completeBtn, styles.ignoreBtn]}>
                            <Text style={styles.completeBtnText}>{AppStrings.IGNORE}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => onComplete(item.uniquelink)}
                            style={styles.completeBtn}>
                            <Text style={styles.completeBtnText}>{AppStrings.COMPLETE}</Text>
                        </TouchableOpacity>
                    </View>
                    : null
                }
            </TouchableOpacity>
        );
    };

    return (
        <GradientWrapperView
            bgColor={bgColor}
            isShowLoader={isLoading}>
            <CustomHeader title={userData.name ? userData.name : AppStrings.NEW_TASK} />
            <View style={[GlobalStyles.container, { paddingHorizontal: 0 }]}>
                <FlatList
                    data={allTaskList}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={ListHeaderComponent}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    contentContainerStyle={{ paddingBottom: hp(4) }}
                />
            </View>
        </GradientWrapperView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    graphView: {
        padding: wp(5),
        marginVertical: hp(2),
        borderRadius: wp(10)
    },
    consistancyText: {
        marginBottom: hp(1),
        color: Colors.BLUE_TEXT,
        fontSize: FontSizes.FONT_SIZE_26,
        fontFamily: Fonts.FONT_POP_SEMI_BOLD
    },
    indicatorView: {
        marginTop: hp(1),
        alignSelf: 'center'
    },
    dotView: {
        width: wp(5),
        height: wp(5),
        borderRadius: wp(5),
        backgroundColor: Colors.BLUE_TEXT
    },
    indicatorText: {
        marginHorizontal: wp(3),
        color: Colors.GREY_TEXT,
        fontSize: FontSizes.FONT_SIZE_16,
        fontFamily: Fonts.FONT_POP_REGULAR
    },
    listItemView: {
        padding: wp(5),
        borderRadius: wp(10),
        marginHorizontal: wp(5)
    },
    listItemSubView: {
        flex: 1
    },
    listItemText: {
        flex: 1,
        color: Colors.PRIMARY,
        fontSize: FontSizes.FONT_SIZE_24,
        fontFamily: Fonts.FONT_POP_SEMI_BOLD
    },
    timeText: {
        color: Colors.GREY_TEXT,
        fontSize: FontSizes.FONT_SIZE_16,
        fontFamily: Fonts.FONT_POP_SEMI_BOLD
    },
    notebookIcon: {
        width: wp(12),
        height: wp(12)
    },
    completeBtn: {
        width: wp(32),
        borderRadius: wp(5),
        alignItems: 'center',
        paddingVertical: wp(1.5),
        backgroundColor: Colors.GREEN_LIGHT
    },
    ignoreBtn: {
        backgroundColor: Colors.RED_LIGHT
    },
    completeBtnText: {
        color: Colors.SECONDARY_TEXT,
        fontSize: FontSizes.FONT_SIZE_16,
        fontFamily: Fonts.FONT_POP_SEMI_BOLD
    }
});
