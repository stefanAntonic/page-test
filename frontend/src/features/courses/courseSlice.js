import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from './courseService';

const initialState = {
  course: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Kreira novog studenta u bazi => crateStudent u studentService
export const createCourse = createAsyncThunk(
  "course/create",
  async (courseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await courseService.createCourse(courseData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Povlaci studente iz baze => getStudents u studentService
export const getCourses = createAsyncThunk(
  "course/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await courseService.getCourses(token);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);
// Edituje studenta iz baze na osnovu id
export const editCourse = createAsyncThunk(
  "course/edit",
  async (id, courseData, thunkAPI) => {

    try {
      const token = thunkAPI.getState().auth.user.token;
      return await courseService.editCourse(id,courseData, token);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);

// Brise studenta iz baze na osnovu id
export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await courseService.deleteCourse(id,token);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);



export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = state.course.filter(student => student._id !== action.payload.id)  
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.course = action.payload
      })
      .addCase(editCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
