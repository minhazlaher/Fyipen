import { axiosClient } from "../../config/Axios";
import { AppStrings } from "../../utils/AppStrings";
import { AppAlert } from "../../components/AppAlert";
import { ApiConstants } from "../../config/ApiConstants";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const AUTH = "AUTH";

const initialState = {
    isLoading: false,
    phoneNumber: null,
    token: null,
    userData: null,
    isUserAlreadyCreated: null
};

export const sendOTP = createAsyncThunk(AUTH + "/sendOTP",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ApiConstants.SEND_OR_VERIFY_OTP + params);
            return response.data;
        } catch (e) {
            return rejectWithValue(e?.response)
        }
    });

export const verifyOTP = createAsyncThunk(AUTH + "/verifyOTP",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(ApiConstants.SEND_OR_VERIFY_OTP, params);
            return response.data;
        } catch (e) {
            return rejectWithValue(e?.response)
        }
    });

export const createUser = createAsyncThunk(AUTH + "/createUser",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post(ApiConstants.CREATE_OR_GET_USER, params);
            return response.data;
        } catch (e) {
            return rejectWithValue(e?.response)
        }
    });

export const getUser = createAsyncThunk(AUTH + "/getUser",
    async (params, { rejectWithValue }) => {
        try {
            const URL = ApiConstants.CREATE_OR_GET_USER + params
            const response = await axiosClient.get(URL);
            return response.data;
        } catch (e) {
            return rejectWithValue(e?.response)
        }
    });

export const AuthSlice = createSlice({
    name: AUTH,
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // send OTP
        builder.addCase(sendOTP.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(sendOTP.fulfilled, (state, action) => {
            state.isLoading = false
            state.phoneNumber = "+" + action.meta.arg.substring(10, 22)
        });
        builder.addCase(sendOTP.rejected, (state, action) => {
            state.isLoading = false
            if (action?.payload?.status != 500 && action?.payload?.data?.message) {
                AppAlert(AppStrings.ERROR, action.payload.data.message)
            } else {
                AppAlert(AppStrings.ERROR, AppStrings.SERVER_ERROR_MESSAGE)
            }
        });

        // verify OTP
        builder.addCase(verifyOTP.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(verifyOTP.fulfilled, (state, action) => {
            state.isLoading = false
            state.token = action.payload.data.token
        });
        builder.addCase(verifyOTP.rejected, (state, action) => {
            state.isLoading = false
            if (action?.payload?.status != 500 && action?.payload?.data?.message) {
                AppAlert(AppStrings.ERROR, action.payload.data.message)
            } else {
                AppAlert(AppStrings.ERROR, AppStrings.SERVER_ERROR_MESSAGE)
            }
        });

        // Create User
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.userData = action.payload.data
            state.phoneNumber = null
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.isLoading = false
            if (action?.payload?.status != 500 && action?.payload?.data?.message) {
                AppAlert(AppStrings.ERROR, action.payload.data.message)
            } else {
                AppAlert(AppStrings.ERROR, AppStrings.SERVER_ERROR_MESSAGE)
            }
        });

        // Get User
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isUserAlreadyCreated = true
            state.userData = action.payload.data.user
            state.phoneNumber = null
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false
            if (action?.payload?.status == 404 && action?.payload?.data?.message == "User not found") {
                state.isUserAlreadyCreated = false
            } else if (action?.payload?.status != 500 && action?.payload?.data?.message) {
                AppAlert(AppStrings.ERROR, action.payload.data.message)
            } else {
                AppAlert(AppStrings.ERROR, AppStrings.SERVER_ERROR_MESSAGE)
            }
        });
    },
});

export const { } = AuthSlice.actions;
export default AuthSlice.reducer;
