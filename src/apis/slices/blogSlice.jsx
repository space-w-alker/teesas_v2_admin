import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, patchAPICall, deleteAPICall, postFileAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, GET_BLOGS, GET_BLOG_BY_ID, CREATE_BLOG, UPDATE_BLOG, DELETE_BLOG } = config;

export const blogSlice = createSlice({
    name: "blog",
    initialState: {
        getBlogsResponse: {
            response: {},
            isLoading: false,
        },
        getBlogByIdResponse: {
            response: {},
            isLoading: false,
        },
        createBlogResponse: {
            response: {},
            isLoading: false,
        },
        updateBlogResponse: {
            response: {},
            isLoading: false,
        },
        deleteBlogResponse: {
            response: {},
            isLoading: false,
        },
    },
    reducers: {
        getBlogs: (state, action) => {
            state.getBlogsResponse = action.payload;
        },
        getBlogById: (state, action) => {
            state.getBlogByIdResponse = action.payload;
        },
        createBlog: (state, action) => {
            state.createBlogResponse = action.payload;
        },
        updateBlog: (state, action) => {
            state.updateBlogResponse = action.payload;
        },
        deleteBlog: (state, action) => {
            state.deleteBlogResponse = action.payload;
        },
        reset: (state) => {
            state.getBlogsResponse = {
                response: {},
                isLoading: false,
            };
        }
    }
});

// Get all blogs with pagination
export const getBlogsAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        dispatch(getBlogs({ isLoading: true }));
        const URL = `${BASEURL}${GET_BLOGS}`;
        const result = await getAPICall(URL, data, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getBlogs({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getBlogs({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

// Get single blog by ID
export const getBlogByIdAsync = async ({ dispatch, callbackFn, blogId, token }) => {
    try {
        dispatch(getBlogById({ isLoading: true }));
        const URL = `${BASEURL}${GET_BLOG_BY_ID}/${blogId}`;
        const result = await getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getBlogById({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getBlogById({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

// Create new blog
export const createBlogAsync = async ({ dispatch, callbackFn, formData, token }) => {
    try {
        dispatch(createBlog({ isLoading: true }));
        const URL = `${BASEURL}${CREATE_BLOG}`;
        
        // Check if formData is FormData (for file upload) or regular object
        let result;
        if (formData instanceof FormData) {
            result = await postFileAPICall(URL, formData, token).then((res) => {
                callbackFn && callbackFn(res);
                return res;
            });
        } else {
            result = await postAPICall(URL, formData, token).then((res) => {
                callbackFn && callbackFn(res);
                return res;
            });
        }
        dispatch(createBlog({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(createBlog({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

// Update blog
export const updateBlogAsync = async ({ dispatch, callbackFn, formData, blogId, token }) => {
    try {
        dispatch(updateBlog({ isLoading: true }));
        const URL = `${BASEURL}${UPDATE_BLOG}/${blogId}`;
        
        // Check if formData is FormData (for file upload) or regular object
        let result;
        if (formData instanceof FormData) {
            // For FormData, we'll use PATCH with FormData
            const accessToken = localStorage.getItem("authToken") || token;
            const API_KEY = "V9dlnpPotY4NzJWB9cwhdLeAba1Zc4UyFlmwq9df2PrH0KquXBu9e7hJuAa5jxPR";
            const requestOptions = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "api-key": API_KEY,
                },
                body: formData,
            };
            const response = await fetch(URL, requestOptions);
            result = { data: await response.json() };
            callbackFn && callbackFn(result);
        } else {
            result = await patchAPICall(URL, formData, false, token).then((res) => {
                callbackFn && callbackFn(res);
                return res;
            });
        }
        dispatch(updateBlog({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(updateBlog({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

// Delete blog
export const deleteBlogAsync = async ({ dispatch, callbackFn, blogId, token }) => {
    try {
        dispatch(deleteBlog({ isLoading: true }));
        const URL = `${BASEURL}${DELETE_BLOG}/${blogId}`;
        const result = await deleteAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(deleteBlog({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(deleteBlog({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

export const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, reset } = blogSlice.actions;

export const getBlogsResponse = (state) => state.blog.getBlogsResponse;
export const getBlogByIdResponse = (state) => state.blog.getBlogByIdResponse;
export const createBlogResponse = (state) => state.blog.createBlogResponse;
export const updateBlogResponse = (state) => state.blog.updateBlogResponse;
export const deleteBlogResponse = (state) => state.blog.deleteBlogResponse;

export default blogSlice.reducer;

