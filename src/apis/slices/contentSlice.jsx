import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL } = config;

const cleanParams = (params) => {
	const cleaned = {};
	Object.keys(params || {}).forEach((key) => {
		const value = params[key];
		const isEmptyString = typeof value === "string" && value.trim() === "";
		if (value !== undefined && value !== null && !isEmptyString) {
			cleaned[key] = value;
		}
	});
	return cleaned;
};

const initialState = {
	lessonsPaginated: {
		isLoading: false,
		data: null,
		error: null,
	},
	mediaManager: {
		isLoading: false,
		data: null,
		error: null,
	},
	createLessonMedia: {
		isLoading: false,
		success: false,
		error: null,
	},
};

const contentSlice = createSlice({
	name: "content",
	initialState,
	reducers: {
		setLessonsPaginated(state, action) {
			state.lessonsPaginated = {
				...state.lessonsPaginated,
				...action.payload,
			};
		},
		setMediaManager(state, action) {
			state.mediaManager = {
				...state.mediaManager,
				...action.payload,
			};
		},
		setCreateLessonMedia(state, action) {
			state.createLessonMedia = {
				...state.createLessonMedia,
				...action.payload,
			};
		},
		resetCreateLessonMedia(state) {
			state.createLessonMedia = {
				isLoading: false,
				success: false,
				error: null,
			};
		},
	},
});

export const { setLessonsPaginated, setMediaManager, setCreateLessonMedia, resetCreateLessonMedia } =
	contentSlice.actions;

export const fetchLessonsPaginatedAsync =
	({
		page = 1,
		limit = 5,
		sort_by = "",
		sort_order = "",
		search = "",
		chapter_id = "",
		term_id = "",
		active = "",
		is_lock = "",
		is_premium = "",
		take_assesment = "",
	} = {}) =>
	async (dispatch) => {
		try {
			dispatch(setLessonsPaginated({ isLoading: true, data: null, error: null }));
			const URL = `${BASEURL}content/list-lessons-paginated`;
			const params = cleanParams({
				page,
				limit,
				sort_by,
				sort_order,
				search,
				chapter_id,
				term_id,
				active,
				is_lock,
				is_premium,
				take_assesment,
			});
			const result = await getAPICall(URL, params);
			if (result?.data?.status === 200) {
				dispatch(
					setLessonsPaginated({
						isLoading: false,
						data: result.data.data,
						error: null,
					})
				);
				return result.data.data;
			}
			throw new Error(result?.data?.message || "Failed to fetch lessons");
		} catch (error) {
			dispatch(
				setLessonsPaginated({
					isLoading: false,
					data: null,
					error: error.message || "Failed to fetch lessons",
				})
			);
			throw error;
		}
	};

export const fetchMediaManagerAsync =
	({
		search = "",
		is_folder = "",
		parent_id = "",
		created_from = "",
		created_to = "",
		page = 1,
		limit = 10,
		sort_by = "",
		sort_order = "",
		get_all = "",
	} = {}) =>
	async (dispatch) => {
		try {
			dispatch(setMediaManager({ isLoading: true, data: null, error: null }));
			const URL = `${BASEURL}media-manager`;
			const params = cleanParams({
				search,
				is_folder,
				parent_id,
				created_from,
				created_to,
				page,
				limit,
				sort_by,
				sort_order,
				get_all,
			});
			const result = await getAPICall(URL, params);
			if (result?.data?.status === 200) {
				dispatch(
					setMediaManager({
						isLoading: false,
						data: result.data.data,
						error: null,
					})
				);
				return result.data.data;
			}
			throw new Error(result?.data?.message || "Failed to fetch media");
		} catch (error) {
			dispatch(
				setMediaManager({
					isLoading: false,
					data: null,
					error: error.message || "Failed to fetch media",
				})
			);
			throw error;
		}
	};

export const createLessonMediaAsync = (body) => async (dispatch) => {
	try {
		dispatch(setCreateLessonMedia({ isLoading: true, success: false, error: null }));
		const URL = `${BASEURL}content/create-lesson-media`;
		// Remove empty-string fields before sending
		const cleanedBody = cleanParams(body);
		const result = await postAPICall(URL, cleanedBody);
		if (result?.data?.status === 200) {
			dispatch(setCreateLessonMedia({ isLoading: false, success: true, error: null }));
			return true;
		}
		throw new Error(result?.data?.message || "Failed to create lesson media");
	} catch (error) {
		dispatch(
			setCreateLessonMedia({
				isLoading: false,
				success: false,
				error: error.message || "Failed to create lesson media",
			})
		);
		return false;
	}
};

export const selectLessonsPaginated = (state) => state.content.lessonsPaginated;
export const selectMediaManager = (state) => state.content.mediaManager;
export const selectCreateLessonMedia = (state) => state.content.createLessonMedia;

export default contentSlice.reducer;


