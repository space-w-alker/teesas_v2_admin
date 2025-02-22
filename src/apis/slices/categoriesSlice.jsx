import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, deleteAPICall, putAPICall, postFileAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL,
  LIST_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORY_DETAILS,
  ADD_CLASS,
  UPDATE_CLASS,
  DELETE_CLASS,
  GET_CLASS_DETAILS,
  CREATE_SUBJECT,
  UPDATE_SUBJECT
} = config;

const initialState = {
  list: {
    isLoading: false,
    data: null,
    stats: null,
    error: null
  },
  create: {
    isLoading: false,
    success: false,
    error: null
  },
  update: {
    isLoading: false,
    success: false,
    error: null
  },
  delete: {
    isLoading: false,
    success: false,
    error: null
  },
  details: {
    isLoading: false,
    data: null,
    error: null
  },
  addClass: {
    isLoading: false,
    success: false,
    error: null
  },
  updateClass: {
    isLoading: false,
    success: false,
    error: null
  },
  deleteClass: {
    isLoading: false,
    success: false,
    error: null
  },
  subjects: {
    isLoading: false,
    data: null,
    error: null
  },
  createSubject: {
    isLoading: false,
    success: false,
    error: null
  },
  updateSubject: {
    isLoading: false,
    success: false,
    error: null
  },
  deleteSubject: {
    isLoading: false,
    success: false,
    error: null
  },
  chapters: {
    isLoading: false,
    data: null,
    error: null
  },
  createChapter: {
    isLoading: false,
    success: false,
    error: null
  },
  topics: {
    isLoading: false,
    data: null,
    error: null
  },
  createTopic: {
    isLoading: false,
    success: false,
    error: null
  },
  deleteTopics: {
    isLoading: false,
    success: false,
    error: null
  },

  updateTopic: {
    isLoading: false,
    success: false,
    error: null
  },
  topicMedia: {
    isLoading: false,
    success: false,
    error: null
  },
  topicDetail: {
    isLoading: false,
    data: null,
    error: null
  },
  deleteTopicMedia: {
    isLoading: false,
    success: false,
    error: null
  },
  universities: {
    isLoading: false,
    data: null,
    error: null
  },

  countries: {
    isLoading: false,
    data: null,
    error: null
  }

};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoryList: (state, action) => {
      state.list = action.payload;
    },
    setCategoryCreate: (state, action) => {
      state.create = action.payload;
    },
    setCategoryDelete: (state, action) => {
      state.delete = action.payload;
    },
    setCategoryUpdate: (state, action) => {
      state.update = action.payload;
    },
    setCategoryDetails: (state, action) => {
      state.details = action.payload;
    },
    setAddClass: (state, action) => {
      state.addClass = action.payload;
    },
    setUpdateClass: (state, action) => {
      state.updateClass = action.payload;
    },
    setDeleteClass: (state, action) => {
      state.deleteClass = action.payload;
    },
    setSubjectDetails: (state, action) => {
      state.subjects = action.payload;
    },
    setCreateSubject: (state, action) => {
      state.createSubject = action.payload;
    },
    setUpdateSubject: (state, action) => {
      state.updateSubject = action.payload;
    },
    setDeleteSubject: (state, action) => {
      state.deleteSubject = action.payload;
    },
    setChapterDetails: (state, action) => {
      state.chapters = action.payload;
    },
    setCreateChapter: (state, action) => {
      state.createChapter = action.payload;
    },
    setTopicsList: (state, action) => {
      state.topics = action.payload;
    },
    setCreateTopic: (state, action) => {
      state.createTopic = action.payload;
    },
    setDeleteTopic: (state, action) => {
      state.deleteTopics = action.payload;
    },
    setUpdateTopic: (state, action) => {
      state.updateTopic = action.payload;
    },
    setTopicMedia: (state, action) => {
      state.topicMedia = action.payload;
    },
    setTopicDetail: (state, action) => {
      state.topicDetail = action.payload;
    },
    setDeleteTopicMedia: (state, action) => {
      state.deleteTopicMedia = action.payload;
    },
    setUniversities: (state, action) => {
      state.universities = action.payload;
    },
    setCountries: (state, action) => {
      state.countries = action.payload;
    }

  }
});


export const getCategoriesAsync = (page = 1, limit = 10, search = '') => async (dispatch) => {
  try {
    dispatch(setCategoryList({ isLoading: true, data: null, error: null }));
    let URL = `${BASEURL}${LIST_CATEGORIES}?page=${page}&limit=${limit}`;

    if (search.trim()) {
      URL += `&search=${encodeURIComponent(search.trim())}`;
    }

    const result = await getAPICall(URL);

    if (result?.data?.status === 200) {
      dispatch(setCategoryList({
        isLoading: false,
        data: result.data.data.categories,
        stats: result.data.data.stats,
        error: null
      }));
    }
  } catch (error) {
    console.log('Search error:', error);
    dispatch(setCategoryList({ isLoading: false, data: null, error: error.message }));
  }
};


export const createCategoryAsync = (categoryData) => async (dispatch) => {
  try {
    dispatch(setCategoryCreate({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}${CREATE_CATEGORY}`;

    const result = await postAPICall(URL, categoryData);

    if (result?.data?.status === 200) {
      dispatch(setCategoryCreate({ isLoading: false, success: true, error: null }));
      // Fetch updated categories list
      dispatch(getCategoriesAsync());
      return true;
    } else {
      throw new Error(result?.data?.message || 'Failed to create category');
    }
  } catch (error) {
    dispatch(setCategoryCreate({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};

export const deleteCategoryAsync = (categoryId) => async (dispatch) => {
  try {

    dispatch(setCategoryDelete({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}${DELETE_CATEGORY}/${categoryId}`;


    const result = await deleteAPICall(URL);


    if (result?.data?.status === 200) {
      dispatch(setCategoryDelete({ isLoading: false, success: true, error: null }));
      dispatch(getCategoriesAsync());
      return true;
    } else {
      throw new Error(result?.data?.message || 'Failed to delete category');
    }
  } catch (error) {
    console.log('Delete operation error:', error);
    dispatch(setCategoryDelete({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};

export const updateCategoryAsync = (categoryId, categoryData) => async (dispatch) => {
  try {
    dispatch(setCategoryUpdate({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}${UPDATE_CATEGORY}/${categoryId}`;

    const result = await putAPICall(URL, categoryData);

    if (result?.data?.status === 200) {
      dispatch(setCategoryUpdate({ isLoading: false, success: true, error: null }));
      dispatch(getCategoriesAsync());
      return true;
    } else {
      throw new Error(result?.data?.message || 'Failed to update category');
    }
  } catch (error) {
    dispatch(setCategoryUpdate({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};

export const getCategoryDetailsAsync = (id, page = 1, limit = 5, search = '') => async (dispatch) => {
  try {
    dispatch(setCategoryDetails({ isLoading: true, data: null, error: null }));
    let URL = `${BASEURL}${GET_CATEGORY_DETAILS}/${id}/details?page=${page}&limit=${limit}`;

    if (search.trim()) {
      URL += `&search=${encodeURIComponent(search.trim())}`;
    }

    const result = await getAPICall(URL);

    if (result?.data?.status === 200) {
      dispatch(setCategoryDetails({
        isLoading: false,
        data: result.data.data,
        error: null
      }));
    }
  } catch (error) {
    dispatch(setCategoryDetails({ isLoading: false, data: null, error: error.message }));
  }
};


export const addClassAsync = (categoryId, className) => async (dispatch) => {
  try {
    dispatch(setAddClass({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}${ADD_CLASS}/${categoryId}/class/create`;

    const result = await postAPICall(URL, { name: className });

    if (result?.data?.status === 200) {
      dispatch(setAddClass({ isLoading: false, success: true, error: null }));
      // Refresh category details
      dispatch(getCategoryDetailsAsync(categoryId));
      return true;
    } else {
      throw new Error(result?.data?.message || 'Failed to add class');
    }
  } catch (error) {
    dispatch(setAddClass({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};

export const updateClassAsync = ({ classId, categoryId, className }) => async (dispatch) => {
  try {
    dispatch(setUpdateClass({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}${UPDATE_CLASS}/class/${classId}`;

    const result = await putAPICall(URL, {
      id: classId,
      name: className
    });

    if (result?.data?.status === 200) {
      dispatch(setUpdateClass({ isLoading: false, success: true, error: null }));
      dispatch(getCategoryDetailsAsync(categoryId));
      return true;
    }
    throw new Error(result?.data?.message || 'Failed to update class');
  } catch (error) {
    dispatch(setUpdateClass({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};

export const deleteClassAsync = (classId) => async (dispatch) => {
  try {
    dispatch(setDeleteClass({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}${DELETE_CLASS}/class/${classId}`;

    const result = await deleteAPICall(URL);

    if (result?.data?.status === 200) {
      dispatch(setDeleteClass({ isLoading: false, success: true, error: null }));
      return true;
    }
    throw new Error(result?.data?.message || 'Failed to delete class');
  } catch (error) {
    dispatch(setDeleteClass({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};

export const getSubjectDetailsAsync = (classId, page = 1) => async (dispatch) => {
  try {
    dispatch(setSubjectDetails({ isLoading: true, data: null, error: null }));
    const URL = `${BASEURL}${GET_CLASS_DETAILS}/${classId}/details`;

    const result = await getAPICall(URL, { page, limit: 10 });

    if (result?.data?.status === 200) {
      dispatch(setSubjectDetails({
        isLoading: false,
        data: result.data.data,
        error: null
      }));
    } else {
      throw new Error(result?.data?.message || 'Failed to fetch subject details');
    }
  } catch (error) {
    dispatch(setSubjectDetails({ isLoading: false, data: null, error: error.message }));
  }
};




export const createSubjectAsync = (classId, formData) => async (dispatch) => {
  try {
    dispatch(setCreateSubject({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}admin/class/${classId}/subject/create`;

    const result = await postFileAPICall(URL, formData);

    if (result?.data?.status === 200) {
      dispatch(setCreateSubject({ isLoading: false, success: true, error: null }));
      dispatch(getSubjectDetailsAsync(classId)); // Refresh the subjects list
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error creating subject:', error);
    dispatch(setCreateSubject({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};



export const updateSubjectAsync = (classId, subjectId, formData) => async (dispatch) => {
  try {
    dispatch(setUpdateSubject({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}${UPDATE_SUBJECT}${classId}/subject/${subjectId}`;


    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const result = await putAPICall(URL, data);

    if (result?.data?.status === 200) {
      dispatch(setUpdateSubject({ isLoading: false, success: true, error: null }));
      dispatch(getSubjectDetailsAsync(classId)); // Refresh the subjects list
      return true;
    }
    throw new Error(result?.data?.message || 'Failed to update subject');
  } catch (error) {
    dispatch(setUpdateSubject({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};

export const deleteSubjectAsync = (classId, subjectId) => async (dispatch) => {
  try {
    dispatch(setDeleteSubject({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}admin/class/${classId}/subject/${subjectId}`;
    const result = await deleteAPICall(URL);

    if (result?.data?.status === 200) {
      dispatch(setDeleteSubject({ isLoading: false, success: true, error: null }));
      dispatch(getSubjectDetailsAsync(classId)); // Refresh the list after deletion
      return true;
    }
    throw new Error(result?.data?.message || 'Failed to delete subject');
  } catch (error) {
    dispatch(setDeleteSubject({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};

export const getChapterDetailsAsync = (subjectId) => async (dispatch) => {
  try {
    dispatch(setChapterDetails({ isLoading: true, data: null, error: null }));
    const URL = `${BASEURL}admin/chapter/${subjectId}/list`;

    const result = await getAPICall(URL);

    if (result?.data?.status === 200) {
      dispatch(setChapterDetails({
        isLoading: false,
        data: result.data.data,
        error: null
      }));
    } else {
      throw new Error(result?.data?.message || 'Failed to fetch chapter details');
    }
  } catch (error) {
    dispatch(setChapterDetails({ isLoading: false, data: null, error: error.message }));
  }
};


export const createChapterAsync = (subjectId, chapterData) => async (dispatch) => {
  try {
    dispatch(setCreateChapter({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}admin/chapter/${subjectId}/create`;

    const result = await postAPICall(URL, chapterData);

    if (result?.data?.status === 200) {
      dispatch(setCreateChapter({ isLoading: false, success: true, error: null }));
      return true;
    }
    throw new Error(result?.data?.message || 'Failed to create chapter');
  } catch (error) {
    dispatch(setCreateChapter({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};

export const getTopicsListAsync = (chapterId, page = 1) => async (dispatch) => {
  try {
    dispatch(setTopicsList({ isLoading: true, data: null, error: null }));
    const URL = `${BASEURL}admin/lesson/list/${chapterId}`;

    const result = await getAPICall(URL, { page, limit: 10 });

    if (result?.data?.status === 200) {
      dispatch(setTopicsList({
        isLoading: false,
        data: result.data.data,
        error: null
      }));
    } else {
      throw new Error(result?.data?.message || 'Failed to fetch topics');
    }
  } catch (error) {
    dispatch(setTopicsList({ isLoading: false, data: null, error: error.message }));
  }
};

export const createTopicAsync = (chapterId, topicData) => async (dispatch) => {
  try {
    dispatch(setCreateTopic({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}admin/lesson/${chapterId}/create`;

    const result = await postAPICall(URL, topicData);

    if (result?.data?.status === 200) {
      dispatch(setCreateTopic({ isLoading: false, success: true, error: null }));
      dispatch(getTopicsListAsync(chapterId));
      // Return the data object that contains id, active, etc.
      return result.data.data;
    }
    return null;
  } catch (error) {
    dispatch(setCreateTopic({ isLoading: false, success: false, error: error.message }));
    return null;
  }
};




export const deleteTopicAsync = (topicId) => async (dispatch) => {
  try {
    dispatch(setDeleteTopic({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}admin/lesson/${topicId}`;

    const result = await deleteAPICall(URL);

    if (result?.data?.status === 200) {
      dispatch(setDeleteTopic({ isLoading: false, success: true, error: null }));
      return true;
    }
    throw new Error(result?.data?.message || 'Failed to delete topic');
  } catch (error) {
    dispatch(setDeleteTopic({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};
export const updateTopicAsync = (topicId, topicData) => async (dispatch) => {
  try {
    dispatch(setUpdateTopic({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}admin/lesson/${topicId}`;

    const result = await putAPICall(URL, topicData);

    if (result?.data?.status === 200) {
      dispatch(setUpdateTopic({ isLoading: false, success: true, error: null }));
      return true;
    }
    throw new Error(result?.data?.message || 'Failed to update topic');
  } catch (error) {
    dispatch(setUpdateTopic({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};

export const uploadTopicMediaAsync = (lessonId, formData) => async (dispatch) => {
  const URL = `${BASEURL}admin/lessons/${lessonId}/media`;
  try {
    dispatch(setTopicMedia({ isLoading: true, success: false, error: null }));
    const result = await postFileAPICall(URL, formData);

    if (result?.data?.status === 200) {
      dispatch(setTopicMedia({ isLoading: false, success: true, error: null }));
      return true;
    }
    throw new Error(result?.data?.message || 'Failed to upload media');
  } catch (error) {
    dispatch(setTopicMedia({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};



export const getTopicDetailAsync = (lessonId) => async (dispatch) => {
  try {
    dispatch(setTopicDetail({ isLoading: true, data: null, error: null }));
    const URL = `${BASEURL}admin/lessons/${lessonId}/detail`;

    const result = await getAPICall(URL);


    if (result?.data?.status === 200) {
      dispatch(setTopicDetail({
        isLoading: false,
        data: result.data.data,
        error: null
      }));
    }
  } catch (error) {
    dispatch(setTopicDetail({ isLoading: false, data: null, error: error.message }));
  }
};

export const deleteTopicMediaAsync = (lessonId, mediaId) => async (dispatch) => {
  try {
    dispatch(setDeleteTopicMedia({ isLoading: true, success: false, error: null }));
    const URL = `${BASEURL}admin/lessons/${lessonId}/media/${mediaId}`;

    const result = await deleteAPICall(URL);

    if (result?.data?.status === 200) {
      dispatch(setDeleteTopicMedia({ isLoading: false, success: true, error: null }));
      return true;
    }
    throw new Error(result?.data?.message || 'Failed to delete media');
  } catch (error) {
    dispatch(setDeleteTopicMedia({ isLoading: false, success: false, error: error.message }));
    return false;
  }
};

export const getUniversitiesAsync = () => async (dispatch) => {
  try {
    dispatch(setUniversities({ isLoading: true, data: null, error: null }));
    const URL = `${BASEURL}admin-universities/list`;
    const result = await getAPICall(URL);

    if (result?.data?.data) {
      dispatch(setUniversities({
        isLoading: false,
        data: result.data.data.universities,
        error: null
      }));
    }
  } catch (error) {
    dispatch(setUniversities({ isLoading: false, data: null, error: error.message }));
  }
};

export const getCountriesAsync = () => async (dispatch) => {
  try {
    dispatch(setCountries({ isLoading: true, data: null, error: null }));
    const URL = `${BASEURL}utils/get-countries`;
    const result = await getAPICall(URL);

    if (result?.data?.status === 200) {
      dispatch(setCountries({
        isLoading: false,
        data: result.data.data.countries,
        error: null
      }));
    }
  } catch (error) {
    dispatch(setCountries({ isLoading: false, data: null, error: error.message }));
  }
};





export const { setCategoryList,
  setCategoryCreate,
  setCategoryDelete,
  setCategoryUpdate,
  setCategoryDetails,
  setAddClass,
  setUpdateClass,
  setDeleteClass,
  setSubjectDetails,
  setCreateSubject,
  setUpdateSubject,
  setDeleteSubject,
  setChapterDetails,
  setCreateChapter,
  setTopicsList,
  setCreateTopic,
  setDeleteTopic,
  setUpdateTopic,
  setTopicMedia,
  setTopicDetail,
  setDeleteTopicMedia,
  setUniversities,
  setCountries


} = categoriesSlice.actions;

export const selectCategories = (state) => state.categories.list;
export const selectCategoryCreate = (state) => state.categories.create;
export const selectCategoryDelete = (state) => state.categories.delete;
export const selectCategoryDetails = (state) => state.categories.details;
export const selectAddClass = (state) => state.categories.addClass;
export const selectUpdateClass = (state) => state.categories.updateClass;
export const selectDeleteClass = (state) => state.categories.deleteClass;
export const selectSubjectDetails = (state) => state.categories.subjects;
export const selectUpdateSubject = (state) => state.categories.updateSubject;
export const selectDeleteSubject = (state) => state.categories.deleteSubject;
export const selectTopicMedia = (state) => state.categories.topicMedia;
export const selectDeleteTopicMedia = (state) => state.categories.deleteTopicMedia;
export const selectUniversities = (state) => state.categories.universities;
export const selectCountries = (state) => state.categories.countries;




export default categoriesSlice.reducer;
