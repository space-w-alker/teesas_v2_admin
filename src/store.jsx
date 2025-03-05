import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./apis/slices/authSlice";
import feedBackSlice from "./apis/slices/feedBackSlice";
import adminSlice from "./apis/slices/adminSlice";
import teacherSlice from "./apis/slices/teacherSlice";
import liveClassSlice from "./apis/slices/liveClassSlice";
import categoriesReducer from "./apis/slices/categoriesSlice";
// import assessmentSlice from "./apis/slices/assessmentSlice";
import ebookSlice from "./apis/slices/ebookSlice";
import omotabSlice from "./apis/slices/omotabSlice";
import categorySlice from "./apis/slices/categorySlice";
import paymentReducer from "./apis/slices/paymentSlice";
import universityReducer from "./apis/slices/universitySlice";
import subscriptionsReducer from "./apis/slices/subscriptionsSlice";
import resellersReducer from "./apis/slices/resellersSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    feedback: feedBackSlice,
    admin: adminSlice,
    teacher: teacherSlice,
    liveClass: liveClassSlice,
    categories: categoriesReducer,
    // assessment: assessmentSlice,
    ebook: ebookSlice,
    omotab: omotabSlice,
    category: categorySlice,
    payments: paymentReducer,
    university: universityReducer,
    subscriptions: subscriptionsReducer,
    resellers: resellersReducer,
  },
});