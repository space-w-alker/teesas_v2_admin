import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, deleteAPICall } from "../client/methodCalls";
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
        subjectPdfsResponse: {
            response: {},
            isLoading: false
        }
    },
    reducers: {
        getUniversitySubjects: (state, action) => {
            state.universitySubjectsResponse = action.payload;
        },
        addUniversitySubject: (state, action) => {
            state.addSubjectResponse = action.payload;
        },
        getSubjectPdfs: (state, action) => {
            state.subjectPdfsResponse = action.payload;
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

// Add PDF to a subject
export const addSubjectPdfAsync = async ({ callbackFn, subjectId, pdfData, token }) => {
    try {
        const URL = `${BASEURL}admin-universities/subject/${subjectId}/pdfs`;
        postAPICall(URL, pdfData, token).then((res) => {
            callbackFn && callbackFn(res);
        }).catch(err => {
            callbackFn && callbackFn({ error: err });
        });
    } catch (err) {
        callbackFn && callbackFn({ error: err });
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


export const { getUniversitySubjects, addUniversitySubject, getSubjectPdfs } = questionBankSlice.actions;

export const getUniversitySubjectsResponse = (state) => state.questionBank.universitySubjectsResponse;
export const getAddSubjectResponse = (state) => state.questionBank.addSubjectResponse;
export const getSubjectPdfsResponse = (state) => state.questionBank.subjectPdfsResponse;

export default questionBankSlice.reducer;
