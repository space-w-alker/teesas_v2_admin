import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./apis/slices/authSlice";
import feedBackSlice from "./apis/slices/feedBackSlice";
import adminSlice from "./apis/slices/adminSlice";
import teacherSlice from "./apis/slices/teacherSlice";
import liveClassSlice from "./apis/slices/liveClassSlice";
// import assessmentSlice from "./apis/slices/assessmentSlice";
import ebookSlice from "./apis/slices/ebookSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    feedback: feedBackSlice,
    admin: adminSlice,
    teacher: teacherSlice,
    liveClass: liveClassSlice,
    // assessment: assessmentSlice,
    ebook: ebookSlice
  },
});