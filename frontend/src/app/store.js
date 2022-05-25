import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import studentReducer from "../features/students/studentsSlice";
import statusReducer from "../features/status/statusSlice";
import courseReducer from "../features/courses/courseSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    status: statusReducer,
    course: courseReducer,
  },
});
