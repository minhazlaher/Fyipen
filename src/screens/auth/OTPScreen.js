import React, { useEffect } from 'react';
import * as yup from 'yup';
import { ScreenNames } from '../../utils/Constant';
import { AppStrings } from '../../utils/AppStrings';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import GradientWrapperView from '../../components/GradientWrapperView';
import TermsAndConditionsText from '../../components/TermsAndConditionsText';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, verifyOTP } from '../../redux/slices/AuthSlice';

const OtpVerificationSchema = yup.object().shape({
    otp: yup.string().trim()
        .matches(/^\d{4}$/, AppStrings.ENTER_VALID_OTP)
        .required(AppStrings.OTP_REQUIRED)
});

const OTPScreen = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { isLoading, phoneNumber, token, isUserAlreadyCreated } = useSelector((state) => state.AuthReducer);

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        resetForm
    } = useFormik({
        initialValues: { otp: '' },
        enableReinitialize: true,
        validationSchema: OtpVerificationSchema,
        onSubmit: async (values) => {
            const params = {
                phone: phoneNumber,
                code: values.otp
            };
            dispatch(verifyOTP(params));
        },
    });

    useEffect(() => {
        if (!isLoading && token) {
            if (isUserAlreadyCreated) {
                resetForm();
                navigation.navigate(ScreenNames.HOME_STACK);
            } else {
                resetForm();
                navigation.navigate(ScreenNames.NAME_SCREEN);
            }
        }
    }, [isUserAlreadyCreated])

    useEffect(() => {
        if (!isLoading && token) {
            dispatch(getUser(`?phone=${phoneNumber.replace('+', '%2B')}`))
        };
    }, [token]);

    return (
        <GradientWrapperView isAuth isShowLoader={isLoading}>
            <CustomTextInput
                title={AppStrings.OTP}
                value={values.otp}
                onChangeText={handleChange('otp')}
                keyboardType="numeric"
                error={(touched.otp && errors.otp) ? errors.otp : null}
            />
            <CustomButton
                isPrimary
                btnText={AppStrings.VERIFY}
                onPress={handleSubmit}
            />
            <TermsAndConditionsText />
        </GradientWrapperView>
    );
};

export default OTPScreen;
