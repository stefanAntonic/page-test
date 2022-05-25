import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentsService from "./studentsService";

const initialState = {
  students: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Kreira novog studenta u bazi => crateStudent u studentService
export const createStudent = createAsyncThunk(
  "student/create",
  async (studentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studentsService.createStudent(studentData, token);
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
export const getStudents = createAsyncThunk(
  "students/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studentsService.getStudents(token);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);
// Edituje studenta iz baze na osnovu id
export const editStudent = createAsyncThunk(
  "student/edit",
  async (studentData, thunkAPI) => {
    console.log(studentData);

    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studentsService.editStudent(studentData, token);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);

// Brise studenta iz baze na osnovu id
export const deleteStudent = createAsyncThunk(
  "student/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studentsService.deleteStudent(id,token);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
    }
  }
);



export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = state.students.filter(student => student._id !== action.payload.id)  
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students.push(action.payload)
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = studentSlice.actions;
export default studentSlice.reducer;
