import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ScreenNames } from '../../utils/Constant';
import { AppStrings } from '../../utils/AppStrings';
import { sendOTP } from '../../redux/slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import GradientWrapperView from '../../components/GradientWrapperView';
import TermsAndConditionsText from '../../components/TermsAndConditionsText';

const PhoneValidationSchema = yup.object().shape({
    phone: yup.string().trim()
        .max(12, AppStrings.ENTER_VALID_PH_NO)
        .min(12, AppStrings.ENTER_VALID_PH_NO)
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "")
        .required(AppStrings.PH_NO_REQUIRED)
});

const PhoneNumberScreen = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { isLoading, phoneNumber } = useSelector((state) => state.AuthReducer);

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        resetForm
    } = useFormik({
        initialValues: { phone: '' },
        enableReinitialize: true,
        validationSchema: PhoneValidationSchema,
        onSubmit: async (values) => {
            dispatch(sendOTP(`?phone=%2B${values.phone}&signature=xyz`))
        },
    });

    useEffect(() => {
        if (!isLoading && phoneNumber) {
            resetForm();
            navigation.navigate(ScreenNames.OTP_SCREEN);
        };
    }, [isLoading, phoneNumber]);

    return (
        <GradientWrapperView isAuth isShowLoader={isLoading}>
            <CustomTextInput
                title={AppStrings.PHONE}
                value={values.phone}
                onChangeText={handleChange("phone")}
                keyboardType="numeric"
                error={(touched.phone && errors.phone) ? errors.phone : null}
            />
            <CustomButton
                isPrimary
                btnText={AppStrings.GET + ' ' + AppStrings.OTP}
                onPress={handleSubmit}
            />
            <TermsAndConditionsText />
        </GradientWrapperView>
    );
};

export default PhoneNumberScreen;
