import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, deleteAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";

import { config } from "../client/config";

const { GET_PROMOCODES, ADD_PROMOCODE, UPDATE_PROMOCODE, DELETE_PROMOCODE, GET_PROMOCODE_DETAILS, BASEURL } = config;

export const promocodeSlice = createSlice({
    name: "promocode",
    initialState: {
        getPromocodesResponse: {
            response: {},
        },
        addPromocodeResponse: {
            response: {},
        },
        updatePromocodeResponse: {
            response: {},
        },
        deletePromocodeResponse: {
            response: {},
        },
        getPromocodeDetailsResponse: {
            response: {},
        },
    },
    reducers: {
        getPromocodes: (state, action) => {
            state.getPromocodesResponse = action.payload;
        },
        addPromocode: (state, action) => {
            state.addPromocodeResponse = action.payload;
        },
        updatePromocode: (state, action) => {
            state.updatePromocodeResponse = action.payload;
        },
        deletePromocode: (state, action) => {
            state.deletePromocodeResponse = action.payload;
        },
        getPromocodeDetails: (state, action) => {
            state.getPromocodeDetailsResponse = action.payload;
        },
        reset: (state) => {
            state.getPromocodesResponse = { response: {} };
            state.addPromocodeResponse = { response: {} };
            state.updatePromocodeResponse = { response: {} };
            state.deletePromocodeResponse = { response: {} };
            state.getPromocodeDetailsResponse = { response: {} };
        },
    },
});

export const getPromocodesAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        const URL = `${BASEURL}${GET_PROMOCODES}`;
        const result = await getAPICall(URL, data, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getPromocodes({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getPromocodes({ isLoading: false }));
    }
};

export const addPromocodeAsync = async ({ dispatch, body, callbackFn, token }) => {
    try {
        const URL = `${BASEURL}${ADD_PROMOCODE}`;
        const result = await postAPICall(URL, body, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(addPromocode({ isLoading: false, response: result.data }));
    } catch (error) {
        console.error("Error adding promo code:", error);
        dispatch(addPromocode({ isLoading: false }));
        callbackFn && callbackFn({ data: { status: 400, message: error.message || "Failed to add promo code" } });
    }
};


export const updatePromocodeAsync = async ({ dispatch, body, callbackFn, token }) => {
    try {
        const URL = `${BASEURL}${UPDATE_PROMOCODE}`;
        const result = await postAPICall(URL, body, true, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(updatePromocode({ isLoading: false, response: result.data }));
    } catch (error) {
        dispatch(updatePromocode({ isLoading: false }));
    }
};

export const deletePromocodeAsync = async ({ dispatch, callbackFn, id, token }) => {
    try {
        const URL = `${BASEURL}${DELETE_PROMOCODE}/${id}`;
        await deleteAPICall(URL, {}, token).then((res) => {
            if (res?.data?.status === 200) {
                callbackFn && callbackFn(res.data);
                dispatch(deletePromocode({ isLoading: false, response: res.data }));
            } else {
                toast.error(res?.data?.message || "Failed to delete promocode");
            }
        });
    } catch (err) {
        dispatch(deletePromocode({ isLoading: false }));
    }
};

export const getPromocodeDetailsAsync = async ({ dispatch, callbackFn, id, token }) => {
    try {
        const URL = `${BASEURL}${GET_PROMOCODE_DETAILS}/${id}`;
        const result = await getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getPromocodeDetails({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getPromocodeDetails({ isLoading: false }));
    }
};

export const resetAsync = () => async (dispatch) => {
    dispatch(reset());
};

export const { getPromocodes, addPromocode, updatePromocode, deletePromocode, getPromocodeDetails, reset } =
    promocodeSlice.actions;

export const getPromocodesResponse = (state) => state.promocode.getPromocodesResponse;
export const getPromocodeDetailsResponse = (state) => state.promocode.getPromocodeDetailsResponse;

export default promocodeSlice.reducer;
