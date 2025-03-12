import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, deleteAPICall, putAPICall, postFileAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL } = config;

export const bankSlice = createSlice({
    name: "bank",
    initialState: {
        bankListResponse: {
            response: {},
            isLoading: false
        },
        addBankResponse: {
            response: {},
            isLoading: false
        },
        updateBankResponse: {
            isLoading: false,
            response: {},
        },
        deleteBankResponse: {
            isLoading: false,
            response: {},
        },
        singleBankResponse: {
            response: {},
            isLoading: false
        },
        countriesResponse: {
            response: {},
            isLoading: false
        },
    },
    reducers: {
        getBankList: (state, action) => {
            state.bankListResponse = action.payload;
        },
        addBank: (state, action) => {
            state.addBankResponse = action.payload;
        },
        updateBank: (state, action) => {
            state.updateBankResponse = action.payload;
        },
        deleteBank: (state, action) => {
            state.deleteBankResponse = action.payload;
        },
        getSingleBank: (state, action) => {
            state.singleBankResponse = action.payload;
        },
        getCountries: (state, action) => {
            state.countriesResponse = action.payload;
        },
    }
});

export const getBankListAsync = async ({ dispatch, callbackFn, page = 1, limit = 10, token }) => {
    try {
        const URL = `${BASEURL}subscriptions/admin-bank-list`;
        const result = postAPICall(URL, { page, limit }, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getBankList({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getBankList({ isLoading: false }));
    }
};

export const addBankAsync = async ({ dispatch, bankData, token, callbackFn }) => {
    try {
        const URL = `${BASEURL}subscriptions/admin-add-bank`;
        let result;

        if (bankData.icon instanceof File) {
            result = postFileAPICall(URL, bankData, token, true).then((res) => {
                callbackFn && callbackFn(res);
                return res;
            });
        } else {
            result = postFileAPICall(URL, bankData, token).then((res) => {
                callbackFn && callbackFn(res);
                return res;
            });
        }

        dispatch(addBank({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(addBank({ isLoading: false }));
        callbackFn && callbackFn({ error: err });
    }
};

export const updateBankAsync = async ({ dispatch, bankId, bankData, token, callbackFn }) => {
    try {
        const URL = `${BASEURL}subscriptions/admin-edit-bank?id=${bankId}`;

        if (bankData.icon instanceof File) {
            postFileAPICall(URL, bankData, token, true, 'PUT').then((res) => {
                dispatch(updateBank({ isLoading: false, response: res.data }));
                callbackFn && callbackFn(res);
            }).catch(err => {
                dispatch(updateBank({ isLoading: false }));
                callbackFn && callbackFn({ error: err });
            });
        } else {
            postFileAPICall(URL, bankData, token).then((res) => {
                dispatch(updateBank({ isLoading: false, response: res.data }));
                callbackFn && callbackFn(res);
            }).catch(err => {
                dispatch(updateBank({ isLoading: false }));
                callbackFn && callbackFn({ error: err });
            });
        }
    } catch (err) {
        dispatch(updateBank({ isLoading: false }));
        callbackFn && callbackFn({ error: err });
    }
};


export const deleteBankAsync = async ({ dispatch, bankId, token, callbackFn }) => {
    try {

        const URL = `${BASEURL}subscriptions/admin-delete-bank?id=${bankId}`;
        const result = deleteAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(deleteBank({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(deleteBank({ isLoading: false }));
        callbackFn && callbackFn({ error: err });
    }
};

export const getSingleBankAsync = async ({ dispatch, callbackFn, bankId, token }) => {
    try {
        const URL = `${BASEURL}subscriptions/admin-bank-detail/${bankId}`;
        const result = getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getSingleBank({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getSingleBank({ isLoading: false }));
    }
};
export const getCountriesAsync = async ({ dispatch, token, callbackFn }) => {
    try {
        const URL = `${BASEURL}utils/get-countries`;
        const result = getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getCountries({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getCountries({ isLoading: false }));
        callbackFn && callbackFn({ error: err });
    }
};

export const { getBankList, addBank, updateBank, deleteBank, getSingleBank, getCountries } = bankSlice.actions;

export const getBankListResponse = (state) => state.bank.bankListResponse;
export const getAddBankResponse = (state) => state.bank.addBankResponse;
export const getUpdateBankResponse = (state) => state.bank.updateBankResponse;
export const getDeleteBankResponse = (state) => state.bank.deleteBankResponse;
export const getSingleBankResponse = (state) => state.bank.singleBankResponse;


export default bankSlice.reducer;
