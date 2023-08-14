import { axiosClient } from "../../config/Axios";
import { AppStrings } from "../../utils/AppStrings";
import { AppAlert } from "../../components/AppAlert";
import { ApiConstants } from "../../config/ApiConstants";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const TASK = "TASK";

const initialState = {
    isLoading: false,
    allTaskList: []
};

export const getAllTask = createAsyncThunk(TASK + "/getAllTask",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get(ApiConstants.CREATE_OR_GET_OR_UPDATE_TASK + params);
            return response.data;
        } catch (e) {
            return rejectWithValue(e?.response)
        }
    });

export const TaskSlice = createSlice({
    name: TASK,
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // send OTP
        builder.addCase(getAllTask.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allTaskList = action.payload.data.task
        });
        builder.addCase(getAllTask.rejected, (state, action) => {
            state.isLoading = false
            if (action?.payload?.status != 500 && action?.payload?.data?.message) {
                AppAlert(AppStrings.ERROR, action.payload.data.message)
            } else {
                AppAlert(AppStrings.ERROR, AppStrings.SERVER_ERROR_MESSAGE)
            }
        });
    },
});

export const { } = TaskSlice.actions;
export default TaskSlice.reducer;
