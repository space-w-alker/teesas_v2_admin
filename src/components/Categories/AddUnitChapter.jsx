import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2, FiPlus } from "react-icons/fi";
import Headers from "../common/Headers";
import {
  createChapterAsync,
  getChapterDetailsAsync,
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

  const chapterDetails = useSelector(
    (state) => state.categories.chapterDetails?.data
  );
  const isLoading = useSelector(
    (state) => state.categories.chapterDetails?.isLoading
  );

  useEffect(() => {
    if (chapterId) {
      setIsEdit(true);
      dispatch(getChapterDetailsAsync(chapterId));
    }
  }, [dispatch, chapterId]);

  useEffect(() => {
    if (isEdit && chapterDetails) {
      setChapterName(chapterDetails.name || "");
      if (chapterDetails.topics && chapterDetails.topics.length > 0) {
        setTopics(
          chapterDetails.topics.map((topic) => ({
            name: topic.name,
            active: topic.active,
          }))
        );
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

    if (topics.some((c) => !c.name.trim())) {
      errors.topics = "All Topic names are required";
    } else if (topics.some((c) => c.name.length < 3)) {
      errors.topics = "Each Topic name must be at least 3 characters long";
    } else if (topics.some((c) => c.name.length > 30)) {
      errors.topics = "Each Topic name must not exceed 30 characters";
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
      topics: topics.filter((topic) => topic.name.trim() !== ""),
    };

    let success;
    if (isEdit) {
      success = await dispatch(updateChapterAsync(chapterId, chapterData));
    } else {
      success = await dispatch(createChapterAsync(id, chapterData));
    }

    if (success) {
      navigate(`/subjects/${isEdit ? id : id}/chapters`);
    }
  };

  if (isEdit && isLoading) return <div>Loading...</div>;

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
      }`}
    >
      <div className="mb-8">
        <Headers
          value1="Chapters"
          value2={isEdit ? "Edit Chapter" : "Add Chapter"}
        />
      </div>

      <div className="flex gap-6">
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
                onClick={addTopic}
                className="flex items-center gap-2 text-[#27AE60] hover:text-[#219652] font-medium"
              >
                <FiPlus size={20} />
                Add Topic
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>

          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Chapter Name</p>
              <p className="font-medium">
                {chapterName.length > 20
                  ? chapterName.substring(0, 10) + "..."
                  : chapterName || "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Topics</p>
              <p className="font-medium">
                {topics.filter((t) => t.name.trim()).length} Topics
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!chapterName || topics.every((t) => !t.name.trim())}
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEdit ? "Update Chapter" : "Create Chapter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUnitChapter;
