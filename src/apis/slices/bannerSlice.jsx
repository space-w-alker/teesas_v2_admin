import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, postFileAPICall, deleteAPICall, putAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";
import { config } from "../client/config";

const { BASEURL, GET_BANNERS, CREATE_BANNER, DELETE_BANNER, UPDATE_BANNER } = config;

export const bannerSlice = createSlice({
    name: "banner",
    initialState: {
        getBannersResponse: {
            response: {},
        },
        createBannerResponse: {
            response: {},
        },
        updateBannerResponse: {
            response: {},
        },
        deleteBannerResponse: {
            response: {},
            isLoading: false,
        },
        getBannerByIdResponse: {
            response: {},
            isLoading: false,
        }
    },
    reducers: {
        getBanners: (state, action) => {
            state.getBannersResponse = action.payload;
        },
        createBanner: (state, action) => {
            state.createBannerResponse = action.payload;
        },
        updateBanner: (state, action) => {
            state.updateBannerResponse = action.payload;
        },
        deleteBanner: (state, action) => {
            state.deleteBannerResponse = action.payload;
        },
        getBannerById: (state, action) => {
            state.getBannerByIdResponse = action.payload;
        },
        reset: (state) => {
            state.getBannersResponse = {
                response: {},
            };
        }
    }
});

export const getBannersAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        const URL = `${BASEURL}${GET_BANNERS}`;
        const result = getAPICall(URL, data, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getBanners({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getBanners({ isLoading: false }));
    }
};

export const getBannerByIdAsync = async ({ dispatch, callbackFn, bannerId, token }) => {
    try {
        dispatch(getBannerById({ isLoading: true }));
        const URL = `${BASEURL}${GET_BANNERS}?id=${bannerId}`;
        const result = await getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getBannerById({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getBannerById({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

export const createBannerAsync = async ({ dispatch, callbackFn, formData, token }) => {
    try {
        dispatch(createBanner({ isLoading: true }));
        const URL = `${BASEURL}${CREATE_BANNER}`;
        const result = await postFileAPICall(URL, formData, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(createBanner({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(createBanner({ isLoading: false }));
    }
};

export const updateBannerAsync = async ({ dispatch, callbackFn, formData, bannerId, token }) => {
    try {
        dispatch(updateBanner({ isLoading: true }));
        const URL = `${BASEURL}${UPDATE_BANNER}?id=${bannerId}`;
        const result = await postFileAPICall(URL, formData, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(updateBanner({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(updateBanner({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

export const deleteBannerAsync = async ({ dispatch, callbackFn, bannerId, token }) => {
    try {
        dispatch(deleteBanner({ isLoading: true }));
        const URL = `${BASEURL}${DELETE_BANNER}?id=${bannerId}`;
        const result = await deleteAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(deleteBanner({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(deleteBanner({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

export const { getBanners, createBanner, updateBanner, deleteBanner, getBannerById, reset } = bannerSlice.actions;

export const getBannersResponse = (state) => state.banner.getBannersResponse;
export const createBannerResponse = (state) => state.banner.createBannerResponse;
export const updateBannerResponse = (state) => state.banner.updateBannerResponse;
export const deleteBannerResponse = (state) => state.banner.deleteBannerResponse;
export const getBannerByIdResponse = (state) => state.banner.getBannerByIdResponse;

export default bannerSlice.reducer;
