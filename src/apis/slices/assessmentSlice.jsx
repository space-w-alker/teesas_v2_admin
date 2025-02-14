// import { createSlice } from "@reduxjs/toolkit";
// import { postAPICall, getAPICall } from "../client/methodCalls";
// import { toast } from "react-toastify";
// import { config } from "../client/config";

// mentResponse: { },
//   }, const { BASE_URL, LIVE_URL, CREATE_ASSESSMENT, GET_ASSESSMENT } = config;
// // const BASE_URL = "{{base_url1}}";
// // const LIVE_URL = "{{live_url}}";


// export const assessmentSlice = createSlice({
//   name: "assessment",
//   initialState: {
//     createAssessmentResponse: {},
//     getAssess
//   reducers: {
//       createAssessmentSuccess: (state, action) => {
//         state.createAssessmentResponse = action.payload;
//       },
//       getAssessmentSuccess: (state, action) => {
//         state.getAssessmentResponse = action.payload;
//       },
//       resetState: (state) => {
//         state.createAssessmentResponse = {};
//         state.getAssessmentResponse = {};
//       },
//     },
//   });

// // Thunk to create assessment
// export const createAssessmentAsync = ({ dispatch, data, token, callbackFn }) => {
//   return async () => {
//     try {
//       const URL = `${BASE_URL}${CREATE_ASSESSMENT}`;
//       const response = await postAPICall(URL, data, true, token);
//       if (response?.data?.status === 200) {
//         callbackFn && callbackFn(response.data);
//         dispatch(createAssessmentSuccess(response.data));
//       } else {
//         toast.error("Failed to create assessment.");
//       }
//     } catch (error) {
//       toast.error("Error creating assessment.");
//     }
//   };
// };

// // Thunk to get assessment by ID
// export const getAssessmentAsync = ({ dispatch, id, token, callbackFn }) => {
//   return async () => {
//     try {
//       const URL = `${LIVE_URL}${GET_ASSESSMENT}${id}`;
//       const response = await getAPICall(URL, {}, token);
//       if (response?.data?.status === 200) {
//         callbackFn && callbackFn(response.data);
//         dispatch(getAssessmentSuccess(response.data));
//       } else {
//         toast.error("Failed to fetch assessment.");
//       }
//     } catch (error) {
//       toast.error("Error fetching assessment.");
//     }
//   };
// };

// export const { createAssessmentSuccess, getAssessmentSuccess, resetState } =
//   assessmentSlice.actions;

// export const createAssessmentResponse = (state) => state.assessment.createAssessmentResponse;
// export const getAssessmentResponse = (state) => state.assessment.getAssessmentResponse;

// export default assessmentSlice.reducer;
