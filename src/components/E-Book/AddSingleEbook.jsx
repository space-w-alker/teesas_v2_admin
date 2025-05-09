import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Headers from "../common/Headers";
import Custombutton from "../common/Custombutton";
import SuccessModal from "../common/SuccessModal";
import {
  addEbookAsync,
  updateEbookAsync,
  listEbooksAsync,
} from "../../apis/slices/ebookSlice";
import {
  listCategoriesAsync,
  getCategoryDetailsAsync,
  getClassDetailsAsync,
} from "../../apis/slices/categorySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddSingleEbook = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const categories = useSelector(
    (state) => state.category?.categoryList?.data?.categories
  );
  const grades = useSelector(
    (state) => state.category?.categoryDetails.data?.classes
  );
  const chapters = useSelector(
    (state) => state.category?.classDetails?.data?.subjects
  );

  // Initialize form data from location state if editing
  const [formData, setFormData] = useState({
    id: location.state?.ebookData?.id || "",
    category: location.state?.ebookData?.category || "",
    grade: location.state?.ebookData?.grade || "",
    chapter: location.state?.ebookData?.chapter || "",
    bookTitle: location.state?.ebookData?.bookTitle || "",
    price: location.state?.ebookData?.price || "",
    description: location.state?.ebookData?.description || "",
    pdf: location.state?.ebookData?.pdf || null,
    icon: location.state?.ebookData?.icon || null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEdit] = useState(!!location.state?.isEdit);

  const handlePdfChange = (e) => {
    if (e.target.files[0]) {
      setPdfFile(e.target.files[0]);
      setFormData({ ...formData, pdf: e.target.files[0].name });
    }
  };

  const handleIconChange = (e) => {
    if (e.target.files[0]) {
      setIconFile(e.target.files[0]);
      setFormData({ ...formData, icon: e.target.files[0].name });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      if (e.dataTransfer.files[0].type === "application/pdf") {
        setPdfFile(e.dataTransfer.files[0]);
        setFormData({ ...formData, pdf: e.dataTransfer.files[0].name });
      } else {
        toast.error("Please drop a PDF file");
      }
    }
  };

  const dispatch = useDispatch();

  // Fetch Categories on Mount
  useEffect(() => {
    dispatch(listCategoriesAsync({ dispatch }));
  }, [dispatch]);

  // Fetch Grades when Category Changes
  useEffect(() => {
    if (formData.category) {
      dispatch(getCategoryDetailsAsync({ dispatch, id: formData.category }));
      // Only reset grade and chapter if we're not in edit mode
      if (!isEdit) {
        setFormData((prev) => ({ ...prev, grade: "", chapter: "" }));
      }
    }
  }, [dispatch, formData.category, isEdit]);

  // Fetch Chapters when Grade Changes
  useEffect(() => {
    if (formData.grade) {
      dispatch(getClassDetailsAsync({ dispatch, id: formData.grade }));
      // Only reset chapter if we're not in edit mode
      if (!isEdit) {
        setFormData((prev) => ({ ...prev, chapter: "" }));
      }
    }
  }, [dispatch, formData.grade, isEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    // Create FormData object
    const formDataToSend = new FormData();

    // Add the ID if we're updating
    if (formData.id) {
      formDataToSend.append("id", formData.id);
    }

    // Add all the form fields
    formDataToSend.append("course_id", formData.category || "");
    formDataToSend.append("class_id", formData.grade || "");
    formDataToSend.append("subject_id", formData.chapter || "");
    formDataToSend.append("title", formData.bookTitle || "");
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append(
      "short_des",
      formData.description ? formData.description.substring(0, 100) : ""
    );
    formDataToSend.append("price", formData.price || "");

    // Only append files if they're actually new files
    if (pdfFile instanceof File) {
      formDataToSend.append("files", pdfFile);
    } else if (formData.pdf && typeof formData.pdf === "string" && isEdit) {
      // If it's a string (existing file path) and we're editing, tell the server to keep the existing file
      formDataToSend.append("keep_pdf", "true");
    }

    if (iconFile instanceof File) {
      formDataToSend.append("files", iconFile);
    } else if (formData.icon && typeof formData.icon === "string" && isEdit) {
      // If it's a string (existing file path) and we're editing, tell the server to keep the existing file
      formDataToSend.append("keep_icon", "true");
    }

    // Debug what's being sent
    console.log("FormData entries:");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Get token
    const token = localStorage.getItem("authToken");

    try {
      if (formData.id) {
        // Update existing ebook
        const action = updateEbookAsync({
          dispatch,
          id: formData.id,
          formData: formDataToSend,
          token,
          callbackFn: () => {
            setIsSubmitting(false);
            setShowSuccess(true);
          },
        });

        // Dispatch the action and wait for it to complete
        await dispatch(action);
      } else {
        // Create new ebook
        const action = addEbookAsync({
          dispatch,
          data: formDataToSend,
          token,
          callbackFn: () => {
            setIsSubmitting(false);
            setShowSuccess(true);
          },
        });

        // Dispatch the action and wait for it to complete
        await dispatch(action);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setIsSubmitting(false);
      // Error toast is already shown in the slice function
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    navigate("/e-book");
  };

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
      } transition-all duration-300`}
    >
      <Headers value1="Home" value2={isEdit ? "Update E-Book" : "Add E-Book"} />

      <div className=" mt-6 flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? "Update E-Book" : "Add E-Book"}
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Grade
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                    disabled={!formData.category} // Disable if no category is selected
                  >
                    <option value="">Select Grade</option>
                    {grades?.map((grade) => (
                      <option key={grade.id} value={grade.id}>
                        {grade.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Chapter
                  </label>
                  <select
                    value={formData.chapter}
                    onChange={(e) =>
                      setFormData({ ...formData, chapter: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                    disabled={!formData.grade} // Disable if no grade is selected
                  >
                    <option value="">Select Chapter</option>
                    {chapters?.map((chapter) => (
                      <option key={chapter.id} value={chapter.id}>
                        {chapter.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Book Title
                  </label>
                  <input
                    type="text"
                    value={formData.bookTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, bookTitle: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Book Price
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60] h-32"
                  required
                />
              </div>
              {/* upload icon */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Upload Icon{" "}
                  {isEdit &&
                    formData.icon &&
                    "(Current: " + formData.icon + ")"}
                </label>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center bg-[#E9FDEE] border-[#27AE60]"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag and drop your Icon here, or
                    <label className="text-[#27AE60] cursor-pointer ml-1">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleIconChange(e)}
                        required={!formData.icon && !isEdit}
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Supported formats: jpg, jpeg, png
                  </p>
                  <p className="text-sm text-gray-500">
                    Maximum file size: 10MB
                  </p>
                  {(iconFile || formData.icon) && (
                    <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Selected file:</p>
                      <p className="text-gray-600">
                        {iconFile ? iconFile.name : formData.icon}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* upload ebook */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Upload Ebook{" "}
                  {isEdit && formData.pdf && "(Current: " + formData.pdf + ")"}
                </label>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center bg-[#E9FDEE] border-[#27AE60]"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag and drop your PDF here, or
                    <label className="text-[#27AE60] cursor-pointer ml-1">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.epub"
                        onChange={(e) => handlePdfChange(e)}
                        required={!formData.pdf && !isEdit}
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Supported format: PDF
                  </p>
                  <p className="text-sm text-gray-500">
                    Maximum file size: 10MB
                  </p>
                  {(pdfFile || formData.pdf) && (
                    <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Selected file:</p>
                      <p className="text-gray-600">
                        {pdfFile ? pdfFile.name : formData.pdf}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <Custombutton
                  value={
                    isSubmitting
                      ? "Processing..."
                      : isEdit
                      ? "Update E-Book"
                      : "Add E-Book"
                  }
                  type="submit"
                  disabled={isSubmitting}
                  backgroundcolor="bg-[#27AE60]"
                  textcolor="text-white"
                  width="w-[200px]"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">
                    {categories?.find(
                      (c) => c.id === parseInt(formData.category)
                    )?.name || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-medium">
                    {grades?.find((g) => g.id === parseInt(formData.grade))
                      ?.name || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chapter:</span>
                  <span className="font-medium">
                    {chapters?.find((c) => c.id === parseInt(formData.chapter))
                      ?.name || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Book Title:</span>
                  <span className="font-medium">
                    {formData.bookTitle || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Book Price:</span>
                  <span className="font-medium">{formData.price || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Icon:</span>
                  <span className="font-medium">
                    {formData.icon || (iconFile ? iconFile.name : "-")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PDF:</span>
                  <span className="font-medium">
                    {formData.pdf || (pdfFile ? pdfFile.name : "-")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <SuccessModal
          isOpen={showSuccess}
          onClose={handleClose}
          type="success"
          title="SUCCESS!"
          message={
            isEdit
              ? "E-Book Updated Successfully"
              : "E-Book Created Successfully"
          }
          buttonText="Close"
          onConfirm={handleClose}
        />
      )}
    </div>
  );
};

export default AddSingleEbook;
