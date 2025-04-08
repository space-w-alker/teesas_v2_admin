import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2, FiPlus } from "react-icons/fi";
import Headers from "../common/Headers";
import SuccessModal from "../common/SuccessModal";
import {
  createChapterAsync,
  getSingleChapterDetailsAsync,
  updateChapterAsync,
} from "../../apis/slices/categoriesSlice";

const AddUnitChapter = ({ isOpen }) => {
  const { id, chapterId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chapterName, setChapterName] = useState("");
  const [topics, setTopics] = useState([{ name: "", active: true }]);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Get chapter details from Redux store
  const chapterDetails = useSelector(
    (state) => state.categories.singleChapterDetails?.data
  );

  const isLoading = useSelector(
    (state) => state.categories.singleChapterDetails?.isLoading
  );

  // Fetch chapter details when in edit mode
  useEffect(() => {
    if (chapterId) {
      setIsEdit(true);
      console.log("Fetching chapter details for ID:", chapterId);
      dispatch(getSingleChapterDetailsAsync(chapterId));
    }
  }, [dispatch, chapterId]);

  // Update form when chapter details are loaded
  useEffect(() => {
    if (isEdit && chapterDetails) {
      console.log("Chapter details loaded:", chapterDetails);

      // Set chapter name
      setChapterName(chapterDetails.name || "");

      // Set topics if available (we'll keep this for data preservation even if not displayed)
      if (chapterDetails.topics && Array.isArray(chapterDetails.topics) && chapterDetails.topics.length > 0) {
        setTopics(
          chapterDetails.topics.map((topic) => ({
            name: topic.name || "",
            active: topic.active !== undefined ? topic.active : true,
          }))
        );
      } else {
        // Ensure at least one empty topic field
        setTopics([{ name: "", active: true }]);
      }
    }
  }, [chapterDetails, isEdit]);

  const addTopic = () => {
    setTopics([...topics, { name: "", active: true }]);
  };

  const removeTopic = (index) => {
    const newTopics = topics.filter((_, i) => i !== index);
    setTopics(newTopics);
  };

  const updateTopic = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = { ...newTopics[index], name: value };
    setTopics(newTopics);
  };

  const validateForm = () => {
    const errors = {};
    if (!chapterName.trim()) {
      errors.chapterName = "Chapter Name is required";
    } else if (chapterName.length < 3) {
      errors.chapterName = "Chapter name must be at least 3 characters long";
    } else if (chapterName.length > 30) {
      errors.chapterName = "Chapter name must not exceed 30 characters";
    }

    // Only validate topics if not in edit mode
    if (!isEdit) {
      if (topics.some((c) => !c.name.trim())) {
        errors.topics = "All Topic names are required";
      } else if (topics.some((c) => c.name.length < 3)) {
        errors.topics = "Each Topic name must be at least 3 characters long";
      } else if (topics.some((c) => c.name.length > 30)) {
        errors.topics = "Each Topic name must not exceed 30 characters";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const chapterData = {
      name: chapterName,
      active: true,
      // If editing, keep the existing topics, otherwise filter out empty ones
      topics: isEdit ? topics : topics.filter((topic) => topic.name.trim() !== ""),
    };

    let success;
    if (isEdit) {
      success = await dispatch(updateChapterAsync(chapterId, chapterData));
      if (success) {
        setSuccessMessage("Chapter updated successfully");
        setShowSuccessModal(true);
      }
    } else {
      success = await dispatch(createChapterAsync(id, chapterData));
      if (success) {
        setSuccessMessage("Chapter created successfully");
        setShowSuccessModal(true);
      }
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Navigate back to the subject's chapters page after closing the modal
    navigate(`/subjects/${id}/chapters`);
  };

  // Show loading state
  if (isEdit && isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading chapter details...</div>;
  }

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""
        }`}
    >
      <div className="mb-8">
        <Headers
          value1="Chapters"
          value2={isEdit ? "Edit Chapter" : "Add Chapter"}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-[2] bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            {isEdit ? "Edit Chapter" : "Add Chapter"}
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Chapter Name
              </label>
              <input
                type="text"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                placeholder="Enter chapter name"
              />
            </div>
            {errors.chapterName && (
              <p className="text-red-500 text-sm mt-1">{errors.chapterName}</p>
            )}

            {/* Only show topics section if not in edit mode */}
            {!isEdit && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Topics
                </label>
                {topics.map((topic, index) => (
                  <div key={index} className="flex gap-4 mb-4">
                    <input
                      type="text"
                      value={topic.name}
                      onChange={(e) => updateTopic(index, e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                      placeholder="Enter topic name"
                    />
                    {topics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTopic(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
                {errors.topics && (
                  <p className="text-red-500 text-sm mt-1 col-span-2">
                    {errors.topics}
                  </p>
                )}
                <button
                  type="button"
                  onClick={addTopic}
                  className="flex items-center gap-2 text-[#27AE60] hover:text-[#219652] font-medium"
                >
                  <FiPlus size={20} />
                  Add Topic
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>

          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Chapter Name</p>
              <p className="font-medium">
                {chapterName.length > 20
                  ? chapterName.substring(0, 20) + "..."
                  : chapterName || "Not specified"}
              </p>
            </div>

            {/* Only show topics count if not in edit mode */}
            {!isEdit && (
              <div>
                <p className="text-gray-600 mb-1">Topics</p>
                <p className="font-medium">
                  {topics.filter((t) => t.name.trim()).length} Topics
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!chapterName || (!isEdit && topics.every((t) => !t.name.trim()))}
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEdit ? "Update Chapter" : "Create Chapter"}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        type="success"
        title="Success"
        message={successMessage}
        buttonText="Continue"
      />
    </div>
  );
};

export default AddUnitChapter;
