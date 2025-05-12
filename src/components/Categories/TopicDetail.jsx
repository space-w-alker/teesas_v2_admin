import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaVideo } from "react-icons/fa";
import Headers from "../common/Headers";
import Headcomponent from "../common/Headcomponent";
import Custombutton from "../common/Custombutton";
import {
  getTopicDetailAsync,
  deleteTopicMediaAsync,
} from "../../apis/slices/categoriesSlice";
import { config } from "../../apis/client/config";

const TopicDetail = ({ isOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(
    (state) => state.categories.topicDetail
  );
  console.log("Component Data:", data); // Add this to verify the data

  useEffect(() => {
    dispatch(getTopicDetailAsync(id));
  }, [dispatch, id]);

  const handleDeleteMedia = async (mediaId) => {
    const success = await dispatch(deleteTopicMediaAsync(id, mediaId));
    if (success) {
      // Refresh the topic details
      dispatch(getTopicDetailAsync(id));
    }
  };

  if (isLoading) {
    return (
      <div
        className={`py-[7rem] lg:px-[5rem] px-[10px] ${
          isOpen ? "xl:ml-[260px]" : ""
        }`}
      >
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading topic details...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className={`py-[7rem] lg:px-[5rem] px-[10px] ${
          isOpen ? "xl:ml-[260px]" : ""
        }`}
      >
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">No topic data found</p>
        </div>
      </div>
    );
  }

  // For the new response structure
  const lessonData = data; // Direct access to the lesson data
  const mediaData =
    data.uploadedMedia && data.uploadedMedia.length > 0
      ? data.uploadedMedia[0]
      : null;

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
      }`}
    >
      <Headers value1="Home" value2="Topics" value3={data?.name || ""} />

      <div className="mt-6 bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <FaVideo className="w-5 h-5 text-[#27AE60]" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{data?.name || ""}</h2>
            <Custombutton
              value={data?.active ? "Active" : "Inactive"}
              textcolor="text-[#27AE60]"
              backgroundcolor="bg-[#E9FDEE]"
              extraStyle="mt-2 w-fit"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Details" showSearch={false} />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Chapter:</p>
                <p className="font-medium">{data?.chapter || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Subject:</p>
                <p className="font-medium">{data?.subject || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Class:</p>
                <p className="font-medium">{data?.class || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Course:</p>
                <p className="font-medium">{data?.category || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Lesson Content" showSearch={false} />
        </div>
        <div className="space-y-4">
          {mediaData ? (
            <div className="p-4 border border-gray-200 rounded-lg">
              {mediaData.media_path && (
                <video
                  src={`${
                    mediaData.media_source_type == "v1"
                      ? config.mediaUrl
                      : config.mediaUrl
                  }${mediaData.media_path}`}
                  alt={mediaData.title || "Media thumbnail"}
                  className="w-full h-[600px] object-cover rounded"
                  controls
                />
              )}

              <div className="mt-4 space-y-2">
                <p className="font-medium">{mediaData.title || "Untitled"}</p>
                <p className="text-sm text-gray-500">
                  Duration: {mediaData.duration || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  Type: {mediaData.content_type || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  Created:{" "}
                  {mediaData.created_at
                    ? new Date(mediaData.created_at).toLocaleDateString()
                    : "N/A"}
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleDeleteMedia(mediaData.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete Media
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No media content available for this topic.
              </p>
              <button
                onClick={() => navigate(`/add-media/${id}`)}
                className="mt-4 px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652]"
              >
                Add Media
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
