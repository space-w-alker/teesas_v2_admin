import { createSlice } from "@reduxjs/toolkit";
import { postAPICall, getAPICall, putAPICall, deleteAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";
import { config } from "../client/config";

const { BASEURL } = config;

export const cornerSlice = createSlice({
    name: "corner",
    initialState: {
        // About Us
        aboutUsDetails: {},
        aboutUsList: [],
        addAboutUsResponse: {},
        updateAboutUsResponse: {},
        deleteAboutUsResponse: {},

        // Privacy Policy
        privacyPolicyDetails: {},
        privacyPolicyList: [],
        addPrivacyPolicyResponse: {},
        updatePrivacyPolicyResponse: {},
        deletePrivacyPolicyResponse: {},

        // Terms and Conditions
        termsConditionsDetails: {},
        termsConditionsList: [],
        addTermsConditionsResponse: {},
        updateTermsConditionsResponse: {},
        deleteTermsConditionsResponse: {},

        // Testimonial
        testimonialDetails: {},
        testimonialList: [],
        addTestimonialResponse: {},
        updateTestimonialResponse: {},
        deleteTestimonialResponse: {},

        // Contact Info
        contactInfoDetails: {},
        contactInfoList: [],
        addContactInfoResponse: {},
        updateContactInfoResponse: {},
        deleteContactInfoResponse: {},
    },
    reducers: {
        // About Us reducers
        getAboutUsDetailsSuccess: (state, action) => {
            state.aboutUsDetails = action.payload;
        },
        listAboutUsSuccess: (state, action) => {
            state.aboutUsList = action.payload;
        },
        addAboutUsSuccess: (state, action) => {
            state.addAboutUsResponse = action.payload;
        },
        updateAboutUsSuccess: (state, action) => {
            state.updateAboutUsResponse = action.payload;
        },
        deleteAboutUsSuccess: (state, action) => {
            state.deleteAboutUsResponse = action.payload;
        },

        // Privacy Policy reducers
        getPrivacyPolicyDetailsSuccess: (state, action) => {
            state.privacyPolicyDetails = action.payload;
        },
        listPrivacyPolicySuccess: (state, action) => {
            state.privacyPolicyList = action.payload;
        },
        addPrivacyPolicySuccess: (state, action) => {
            state.addPrivacyPolicyResponse = action.payload;
        },
        updatePrivacyPolicySuccess: (state, action) => {
            state.updatePrivacyPolicyResponse = action.payload;
        },
        deletePrivacyPolicySuccess: (state, action) => {
            state.deletePrivacyPolicyResponse = action.payload;
        },

        // Terms and Conditions reducers
        getTermsConditionsDetailsSuccess: (state, action) => {
            state.termsConditionsDetails = action.payload;
        },
        listTermsConditionsSuccess: (state, action) => {
            state.termsConditionsList = action.payload;
        },
        addTermsConditionsSuccess: (state, action) => {
            state.addTermsConditionsResponse = action.payload;
        },
        updateTermsConditionsSuccess: (state, action) => {
            state.updateTermsConditionsResponse = action.payload;
        },
        deleteTermsConditionsSuccess: (state, action) => {
            state.deleteTermsConditionsResponse = action.payload;
        },

        // Testimonial reducers
        getTestimonialDetailsSuccess: (state, action) => {
            state.testimonialDetails = action.payload;
        },
        listTestimonialSuccess: (state, action) => {
            state.testimonialList = action.payload;
        },
        addTestimonialSuccess: (state, action) => {
            state.addTestimonialResponse = action.payload;
        },
        updateTestimonialSuccess: (state, action) => {
            state.updateTestimonialResponse = action.payload;
        },
        deleteTestimonialSuccess: (state, action) => {
            state.deleteTestimonialResponse = action.payload;
        },

        // Contact Info reducers
        getContactInfoDetailsSuccess: (state, action) => {
            state.contactInfoDetails = action.payload;
        },
        listContactInfoSuccess: (state, action) => {
            state.contactInfoList = action.payload;
        },
        addContactInfoSuccess: (state, action) => {
            state.addContactInfoResponse = action.payload;
        },
        updateContactInfoSuccess: (state, action) => {
            state.updateContactInfoResponse = action.payload;
        },
        deleteContactInfoSuccess: (state, action) => {
            state.deleteContactInfoResponse = action.payload;
        },

        // Reset state
        resetState: (state) => {
            // About Us
            state.aboutUsDetails = {};
            state.aboutUsList = [];
            state.addAboutUsResponse = {};
            state.updateAboutUsResponse = {};
            state.deleteAboutUsResponse = {};

            // Privacy Policy
            state.privacyPolicyDetails = {};
            state.privacyPolicyList = [];
            state.addPrivacyPolicyResponse = {};
            state.updatePrivacyPolicyResponse = {};
            state.deletePrivacyPolicyResponse = {};

            // Terms and Conditions
            state.termsConditionsDetails = {};
            state.termsConditionsList = [];
            state.addTermsConditionsResponse = {};
            state.updateTermsConditionsResponse = {};
            state.deleteTermsConditionsResponse = {};

            // Testimonial
            state.testimonialDetails = {};
            state.testimonialList = [];
            state.addTestimonialResponse = {};
            state.updateTestimonialResponse = {};
            state.deleteTestimonialResponse = {};

            // Contact Info
            state.contactInfoDetails = {};
            state.contactInfoList = [];
            state.addContactInfoResponse = {};
            state.updateContactInfoResponse = {};
            state.deleteContactInfoResponse = {};
        },
    },
});

// ==================== ABOUT US THUNKS ====================

// Get About Us Details
export const getAboutUsDetailsAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/about-us/details?id=${id}`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(getAboutUsDetailsSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch About Us details.");
            }
        } catch (error) {
            toast.error("Error fetching About Us details: " + error);
        }
    };
};

// Add About Us
export const addAboutUsAsync = ({ dispatch, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/about-us/add`;
            const response = await postAPICall(URL, data, token);
            console.log(response);
            if (response.data?.status === 200) {
                dispatch(addAboutUsSuccess(response.data));
                toast.success("About Us added successfully");
                callbackFn && callbackFn(response.data.da);
            } else {
                toast.error("Failed to add About Us.");
            }
        } catch (error) {
            toast.error("Error adding About Us: " + error);
        }
    };
};

// List About Us
export const listAboutUsAsync = ({ dispatch, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/about-us/list`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(listAboutUsSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch About Us list.");
            }
        } catch (error) {
            toast.error("Error fetching About Us list: " + error);
        }
    };
};

// Update About Us
export const updateAboutUsAsync = ({ dispatch, id, formData, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/about-us/update/${id}`;
            const response = await putAPICall(URL, formData, true, token);
            if (response?.data?.status === 200) {
                dispatch(updateAboutUsSuccess(response.data));
                toast.success("About Us updated successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to update About Us.");
            }
        } catch (error) {
            toast.error("Error updating About Us: " + error);
        }
    };
};

// Delete About Us
export const deleteAboutUsAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/about-us/delete/${id}`;
            const response = await deleteAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(deleteAboutUsSuccess(response.data));
                toast.success("About Us deleted successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to delete About Us.");
            }
        } catch (error) {
            toast.error("Error deleting About Us: " + error);
        }
    };
};

// ==================== PRIVACY POLICY THUNKS ====================

// Get Privacy Policy Details
export const getPrivacyPolicyDetailsAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/privacy-policy/details?id=${id}`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(getPrivacyPolicyDetailsSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch Privacy Policy details.");
            }
        } catch (error) {
            toast.error("Error fetching Privacy Policy details: " + error);
        }
    };
};

// Add Privacy Policy
export const addPrivacyPolicyAsync = ({ dispatch, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/privacy-policy/add`;
            const response = await postAPICall(URL, data, token);
            if (response?.data?.status === 200) {
                dispatch(addPrivacyPolicySuccess(response.data));
                toast.success("Privacy Policy added successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to add Privacy Policy.");
            }
        } catch (error) {
            toast.error("Error adding Privacy Policy: " + error);
        }
    };
};

// List Privacy Policy
export const listPrivacyPolicyAsync = ({ dispatch, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/privacy-policy/list`;
            const response = await getAPICall(URL, {}, token);
            console.log('response', response);
            if (response?.data?.status === 200) {
                dispatch(listPrivacyPolicySuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch Privacy Policy list.");
            }
        } catch (error) {
            toast.error("Error fetching Privacy Policy list: " + error);
        }
    };
};

// Update Privacy Policy
export const updatePrivacyPolicyAsync = ({ dispatch, id, formData, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/privacy-policy/update/${id}`;
            const response = await putAPICall(URL, formData, true, token);
            if (response?.data?.status === 200) {
                dispatch(updatePrivacyPolicySuccess(response.data));
                toast.success("Privacy Policy updated successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to update Privacy Policy.");
            }
        } catch (error) {
            toast.error("Error updating Privacy Policy: " + error);
        }
    };
};

// Delete Privacy Policy
export const deletePrivacyPolicyAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/privacy-policy/delete/${id}`;
            const response = await deleteAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(deletePrivacyPolicySuccess(response.data));
                toast.success("Privacy Policy deleted successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to delete Privacy Policy.");
            }
        } catch (error) {
            toast.error("Error deleting Privacy Policy: " + error);
        }
    };
};

// ==================== TERMS AND CONDITIONS THUNKS ====================

// Get Terms and Conditions Details
export const getTermsConditionsDetailsAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/terms-conditions/details?id=${id}`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(getTermsConditionsDetailsSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch Terms and Conditions details.");
            }
        } catch (error) {
            toast.error("Error fetching Terms and Conditions details: " + error);
        }
    };
};

// Add Terms and Conditions
export const addTermsConditionsAsync = ({ dispatch, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/terms-conditions/add`;
            const response = await postAPICall(URL, data, token);
            if (response.status === 200) {
                dispatch(addTermsConditionsSuccess(response.data));
                toast.success("Terms and Conditions added successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to add Terms and Conditions.");
            }
        } catch (error) {
            toast.error("Error adding Terms and Conditions: " + error);
        }
    };
};

// List Terms and Conditions
export const listTermsConditionsAsync = ({ dispatch, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/terms-conditions/list`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(listTermsConditionsSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch Terms and Conditions list.");
            }
        } catch (error) {
            toast.error("Error fetching Terms and Conditions list: " + error);
        }
    };
};

// Update Terms and Conditions
export const updateTermsConditionsAsync = ({ dispatch, id, formData, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/terms-conditions/update/${id}`;
            const response = await putAPICall(URL, formData, true, token);
            if (response?.data?.status === 200) {
                dispatch(updateTermsConditionsSuccess(response.data));
                toast.success("Terms and Conditions updated successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to update Terms and Conditions.");
            }
        } catch (error) {
            toast.error("Error updating Terms and Conditions: " + error);
        }
    };
};

// Delete Terms and Conditions
export const deleteTermsConditionsAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/terms-conditions/delete/${id}`;
            const response = await deleteAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(deleteTermsConditionsSuccess(response.data));
                toast.success("Terms and Conditions deleted successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to delete Terms and Conditions.");
            }
        } catch (error) {
            toast.error("Error deleting Terms and Conditions: " + error);
        }
    };
};

// ==================== TESTIMONIAL THUNKS ====================

// Get Testimonial Details
export const getTestimonialDetailsAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/testimonial/details?id=${id}`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(getTestimonialDetailsSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch Testimonial details.");
            }
        } catch (error) {
            toast.error("Error fetching Testimonial details: " + error);
        }
    };
};

// Add Testimonial
export const addTestimonialAsync = ({ dispatch, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/testimonial/add`;
            const response = await postAPICall(URL, data, token);
            if (response?.data?.status === 200) {
                dispatch(addTestimonialSuccess(response.data));
                toast.success("Testimonial added successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to add Testimonial.");
            }
        } catch (error) {
            toast.error("Error adding Testimonial: " + error);
        }
    };
};

// List Testimonial
export const listTestimonialAsync = ({ dispatch, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/testimonial/list`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(listTestimonialSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch Testimonial list.");
            }
        } catch (error) {
            toast.error("Error fetching Testimonial list: " + error);
        }
    };
};

// Update Testimonial
export const updateTestimonialAsync = ({ dispatch, id, formData, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/testimonial/update/${id}`;
            const response = await putAPICall(URL, formData, true, token);
            if (response?.data?.status === 200) {
                dispatch(updateTestimonialSuccess(response.data));
                toast.success("Testimonial updated successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to update Testimonial.");
            }
        } catch (error) {
            toast.error("Error updating Testimonial: " + error);
        }
    };
};

// Delete Testimonial
export const deleteTestimonialAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/testimonial/delete/${id}`;
            const response = await deleteAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(deleteTestimonialSuccess(response.data));
                toast.success("Testimonial deleted successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to delete Testimonial.");
            }
        } catch (error) {
            toast.error("Error deleting Testimonial: " + error);
        }
    };
};

// ==================== CONTACT INFO THUNKS ====================

// Get Contact Info Details
export const getContactInfoDetailsAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/contact-info/details?id=${id}`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(getContactInfoDetailsSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch Contact Info details.");
            }
        } catch (error) {
            toast.error("Error fetching Contact Info details: " + error);
        }
    };
};

// Add Contact Info
export const addContactInfoAsync = ({ dispatch, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/contact-info/add`;
            const response = await postAPICall(URL, data, token);
            if (response?.data?.status === 200) {
                dispatch(addContactInfoSuccess(response.data));
                toast.success("Contact Info added successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to add Contact Info.");
            }
        } catch (error) {
            toast.error("Error adding Contact Info: " + error);
        }
    };
};

// List Contact Info
export const listContactInfoAsync = ({ dispatch, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/contact-info/list`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(listContactInfoSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch Contact Info list.");
            }
        } catch (error) {
            toast.error("Error fetching Contact Info list: " + error);
        }
    };
};

// Update Contact Info
export const updateContactInfoAsync = ({ dispatch, id, formData, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/contact-info/update/${id}`;
            const response = await putAPICall(URL, formData, true, token);
            if (response?.data?.status === 200) {
                dispatch(updateContactInfoSuccess(response.data));
                toast.success("Contact Info updated successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to update Contact Info.");
            }
        } catch (error) {
            toast.error("Error updating Contact Info: " + error);
        }
    };
};

// Delete Contact Info
export const deleteContactInfoAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}corner/contact-info/delete/${id}`;
            const response = await deleteAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(deleteContactInfoSuccess(response.data));
                toast.success("Contact Info deleted successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to delete Contact Info.");
            }
        } catch (error) {
            toast.error("Error deleting Contact Info: " + error);
        }
    };
};

// Export all actions
export const {
    // About Us
    getAboutUsDetailsSuccess,
    listAboutUsSuccess,
    addAboutUsSuccess,
    updateAboutUsSuccess,
    deleteAboutUsSuccess,

    // Privacy Policy
    getPrivacyPolicyDetailsSuccess,
    listPrivacyPolicySuccess,
    addPrivacyPolicySuccess,
    updatePrivacyPolicySuccess,
    deletePrivacyPolicySuccess,

    // Terms and Conditions
    getTermsConditionsDetailsSuccess,
    listTermsConditionsSuccess,
    addTermsConditionsSuccess,
    updateTermsConditionsSuccess,
    deleteTermsConditionsSuccess,

    // Testimonial
    getTestimonialDetailsSuccess,
    listTestimonialSuccess,
    addTestimonialSuccess,
    updateTestimonialSuccess,
    deleteTestimonialSuccess,

    // Contact Info
    getContactInfoDetailsSuccess,
    listContactInfoSuccess,
    addContactInfoSuccess,
    updateContactInfoSuccess,
    deleteContactInfoSuccess,

    // Reset
    resetState
} = cornerSlice.actions;

// Export selectors
// About Us
export const aboutUsDetails = (state) => state.corner.aboutUsDetails;
export const aboutUsList = (state) => state.corner.aboutUsList;
export const addAboutUsResponse = (state) => state.corner.addAboutUsResponse;

// Privacy Policy
export const privacyPolicyDetails = (state) => state.corner.privacyPolicyDetails;
export const privacyPolicyList = (state) => state.corner.privacyPolicyList;
export const addPrivacyPolicyResponse = (state) => state.corner.addPrivacyPolicyResponse;

// Terms and Conditions
export const termsConditionsDetails = (state) => state.corner.termsConditionsDetails;
export const termsConditionsList = (state) => state.corner.termsConditionsList;
export const addTermsConditionsResponse = (state) => state.corner.addTermsConditionsResponse;

// Testimonial
export const testimonialDetails = (state) => state.corner.testimonialDetails;
export const testimonialList = (state) => state.corner.testimonialList;
export const addTestimonialResponse = (state) => state.corner.addTestimonialResponse;

// Contact Info
export const contactInfoDetails = (state) => state.corner.contactInfoDetails;
export const contactInfoList = (state) => state.corner.contactInfoList;
export const addContactInfoResponse = (state) => state.corner.addContactInfoResponse;

export default cornerSlice.reducer;