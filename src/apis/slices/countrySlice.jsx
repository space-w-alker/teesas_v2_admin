import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, postFileAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";

import { config } from "../client/config";

const { BASEURL } = config;

export const countrySlice = createSlice({
    name: "country",
    initialState: {
        getCountriesResponse: {
            response: {},
        },
        addCountryResponse: {
            response: {},
        },
        getCountryDetailsResponse: {
            response: {},
        },
    },
    reducers: {
        getCountries: (state, action) => {
            state.getCountriesResponse = action.payload;
        },
        addCountry: (state, action) => {
            state.addCountryResponse = action.payload;
        },
        getCountryDetails: (state, action) => {
            state.getCountryDetailsResponse = action.payload;
        },
    },
});

export const getCountriesAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        const URL = `${BASEURL}utils/get-countries`;
        const result = getAPICall(URL, data, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getCountries({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getCountries({ isLoading: false }));
    }
};

export const addCountryAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        const URL = `${BASEURL}utils/add-country`;
        const result = await postFileAPICall(URL, data, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(addCountry({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(addCountry({ isLoading: false }));
    }
};

export const getCountryDetailsAsync = async ({ dispatch, callbackFn, id, token }) => {
    try {
        const URL = `${BASEURL}utils/get-country?id=${id}`;
        const result = getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getCountryDetails({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getCountryDetails({ isLoading: false }));
    }
};

export const { getCountries, addCountry, getCountryDetails } = countrySlice.actions;

export const getCountriesResponse = (state) => state.country.getCountriesResponse;
export const addCountryResponse = (state) => state.country.addCountryResponse;
export const getCountryDetailsResponse = (state) => state.country.getCountryDetailsResponse;

export default countrySlice.reducer;
