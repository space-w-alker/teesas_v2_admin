import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, deleteAPICall, postFileAPICall, putAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL } = config;

export const questionBankSlice = createSlice({
    name: "questionBank",
    initialState: {
        universitySubjectsResponse: {
            response: {},
            isLoading: false
        },
        addSubjectResponse: {
            response: {},
            isLoading: false
        },
        updateUniversitySubjectResponse: {
            isLoading: false,
            response: {},
        },
        deleteUniversitySubjectResponse: {
            isLoading: false,
            response: {},
        },
        subjectPdfsResponse: {
            response: {},
            isLoading: false
        },
        universityStatisticsResponse: {
            isLoading: false,
            data: {
                totalUniversities: 0,
                totalSubjects: 0,
                totalPdfs: 0
            },
            error: null
        }
    },
    reducers: {
        getUniversitySubjects: (state, action) => {
            state.universitySubjectsResponse = action.payload;
        },
        addUniversitySubject: (state, action) => {
            state.addSubjectResponse = action.payload;
        },
        updateUniversitySubject: (state, action) => {
            state.updateUniversitySubjectResponse = action.payload;
        },
        deleteUniversitySubject: (state, action) => {
            state.deleteUniversitySubjectResponse = action.payload;
        },
        getSubjectPdfs: (state, action) => {
            state.subjectPdfsResponse = action.payload;
        },
        getUniversityStatistics: (state, action) => {
            state.universityStatisticsResponse = action.payload;
        }
    }
});

export const getUniversitySubjectsAsync = async ({ dispatch, callbackFn, universityId, page = 1, limit = 10, token }) => {
    try {
        const URL = `${BASEURL}admin-universities/${universityId}/subjects`;
        const result = getAPICall(URL, { page, limit }, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getUniversitySubjects({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getUniversitySubjects({ isLoading: false }));
    }
};

export const addUniversitySubjectAsync = async ({ dispatch, universityId, subjectData, token, callbackFn }) => {
    try {
        const URL = `${BASEURL}admin-universities/${universityId}/addsubject`;
        const result = postAPICall(URL, subjectData, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(addUniversitySubject({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(addUniversitySubject({ isLoading: false }));
    }
};

// Update an existing subject
export const updateUniversitySubjectAsync = async ({
    dispatch,
    universityId,
    subjectId,
    subjectData,
    token,
    callbackFn
}) => {
    try {
        // Using the URL pattern provided in your question
        const URL = `${BASEURL}admin-universities/subject/${subjectId}`;



        const result = await putAPICall(URL, subjectData, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });

        dispatch(updateUniversitySubject({ isLoading: false, response: result.data }));
    } catch (err) {
        console.error("Error updating subject:", err);
        dispatch(updateUniversitySubject({ isLoading: false }));
        callbackFn && callbackFn({ error: err });
    }
};

// Delete a subject
export const deleteUniversitySubjectAsync = async ({
    dispatch,
    subjectId,
    token,
    callbackFn
}) => {
    try {
        // Using the URL pattern provided in your question
        const URL = `${BASEURL}admin-universities/subject/${subjectId}`;



        const result = await deleteAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });

        dispatch(deleteUniversitySubject({ isLoading: false, response: result.data }));
    } catch (err) {
        console.error("Error deleting subject:", err);
        dispatch(deleteUniversitySubject({ isLoading: false }));
        callbackFn && callbackFn({ error: err });
    }
};


// Get all PDFs for a subject
export const getSubjectPdfsAsync = async ({ dispatch, callbackFn, subjectId, token }) => {
    try {
        const URL = `${BASEURL}admin-universities/subjects/${subjectId}/pdfs`;
        const result = getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getSubjectPdfs({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getSubjectPdfs({ isLoading: false }));
    }
};

export const addSubjectPdfAsync = async ({
    subjectId,
    pdfData,
    token,
    callbackFn
}) => {
    try {

        const URL = `${BASEURL}admin-universities/subject/${subjectId}/pdfs`;

        await postFileAPICall(URL, pdfData, token, true).then((res) => {
            callbackFn && callbackFn(res);
        });
    } catch (error) {
        console.error("PDF upload error:", error);
        callbackFn && callbackFn({ error });
    }
};


// Delete PDF from a subject
export const deleteSubjectPdfAsync = async ({ callbackFn, pdfId, token }) => {
    try {
        const URL = `${BASEURL}admin-universities/subjects/pdfs/${pdfId}`;
        deleteAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
        }).catch(err => {
            callbackFn && callbackFn({ error: err });
        });
    } catch (err) {
        callbackFn && callbackFn({ error: err });
    }
};
// Get university statistics
export const getUniversityStatisticsAsync = async ({ dispatch, token, callbackFn }) => {
    try {
        const URL = `${BASEURL}admin-universities/statistics`;

        getAPICall(URL, {}, token).then((res) => {
            // Extract the actual statistics data from the API response
            if (res?.data?.status === 200) {
                // This is the key fix - properly formatting the action payload
                dispatch(getUniversityStatistics({
                    isLoading: false,
                    data: res.data.data, // <-- The nested data object with the statistics
                    error: null
                }));
            } else {
                dispatch(getUniversityStatistics({
                    isLoading: false,
                    data: {
                        totalUniversities: 0,
                        totalSubjects: 0,
                        totalPdfs: 0
                    },
                    error: res?.data?.message || "Failed to fetch statistics"
                }));
            }

            callbackFn && callbackFn(res);
        }).catch(err => {
            dispatch(getUniversityStatistics({
                isLoading: false,
                data: {
                    totalUniversities: 0,
                    totalSubjects: 0,
                    totalPdfs: 0
                },
                error: err.message
            }));
        });
    } catch (err) {
        dispatch(getUniversityStatistics({ isLoading: false }));
    }
}; export const { getUniversitySubjects, addUniversitySubject, updateUniversitySubject,
    deleteUniversitySubject, getSubjectPdfs, getUniversityStatistics } = questionBankSlice.actions;

export const getUniversitySubjectsResponse = (state) => state.questionBank.universitySubjectsResponse;
export const getAddSubjectResponse = (state) => state.questionBank.addSubjectResponse;
export const getUpdateSubjectResponse = (state) => state.questionBank.updateUniversitySubjectResponse;
export const getUniversityStatisticsResponse = (state) => {
    return state?.questionBank?.universityStatisticsResponse || {
        isLoading: false,
        data: {
            totalUniversities: 0,
            totalSubjects: 0,
            totalPdfs: 0
        },
        error: null
    };
};
export const getDeleteSubjectResponse = (state) => state.questionBank.deleteUniversitySubjectResponse;
export const getSubjectPdfsResponse = (state) => state.questionBank.subjectPdfsResponse;

export default questionBankSlice.reducer;
