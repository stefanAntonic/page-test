import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import statusService from "./statusService";
const initialState = {
  status: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Povlaci status iz baze 
export const getStatus = createAsyncThunk(
  "status/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await statusService.getStatus(token);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.status = action.payload;
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = statusSlice.actions;
export default statusSlice.reducer;
