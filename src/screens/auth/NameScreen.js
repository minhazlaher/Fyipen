import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ScreenNames } from '../../utils/Constant';
import { AppStrings } from '../../utils/AppStrings';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { createUser } from '../../redux/slices/AuthSlice';
import CustomTextInput from '../../components/CustomTextInput';
import GradientWrapperView from '../../components/GradientWrapperView';
import TermsAndConditionsText from '../../components/TermsAndConditionsText';

const NameSchema = yup.object().shape({
    name: yup.string().trim()
        .min(3, AppStrings.ENTER_VALID_NAME)
        .required(AppStrings.NAME_REQUIRED)
});

const NameScreen = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { isLoading, phoneNumber, userData } = useSelector((state) => state.AuthReducer);

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        resetForm
    } = useFormik({
        initialValues: { name: '' },
        enableReinitialize: true,
        validationSchema: NameSchema,
        onSubmit: async (values) => {
            const params = {
                phone: phoneNumber,
                name: values.name
            };
            dispatch(createUser(params));
        },
    });

    useEffect(() => {
        if (!isLoading && userData) {
            resetForm();
            navigation.navigate(ScreenNames.HOME_STACK);
        }
    }, [isLoading, userData])

    return (
        <GradientWrapperView isAuth isShowLoader={isLoading}>
            <CustomTextInput
                title={AppStrings.WHAT_IS_YOUR_NAME}
                value={values.name}
                onChangeText={handleChange('name')}
                error={(errors.name && touched.name) ? errors.name : null}
            />
            <CustomButton
                isPrimary
                btnText={AppStrings.LETS_GO}
                onPress={handleSubmit}
            />
            <TermsAndConditionsText />
        </GradientWrapperView>
    )
}

export default NameScreen;
