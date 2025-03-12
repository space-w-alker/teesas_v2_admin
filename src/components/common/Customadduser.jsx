import React, { useState } from "react";
import uploadstates from '../../assets/images/uploadstates.png'
import Rectangle from "../../assets/images/Rectangle.png";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { uploadUsersAsync } from "../../apis/slices/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { bulkUploadUsersAsync } from "../../apis/slices/userSlice";
import { FaCloudUploadAlt } from "react-icons/fa";

const Customadduser = ({ isOpen }) => {

  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [show, setshow] = useState(false);
  const [File, setFile] = useState({});
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false);

  const [formData, setFormData] = useState({
    files: null
  });

  const handleFileUpload = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      setFormData({ ...formData, files: e.dataTransfer.files });
    }
  };

  const handleclick = () => {
    if (formData.files && formData.files.length > 0) { // Ensure files exist
      setLoading(true);
      const form_data = new FormData();

      // Append each file separately
      Array.from(formData.files).forEach((file, index) => {
        form_data.append(`file`, file);
      });

      dispatch(bulkUploadUsersAsync({
        dispatch,
        formData: form_data,
        token,
      }));
    } else {
      toast.error("Please select a file before uploading.");
    }
  };


  return (
    <div className={`py-[8rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>

      <div className='flex justify-start  items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / Users/<span className='text-black font-medium'> AddUsers</span></div>
        </div>
      </div>
      <div className={`   lg:flex justify-center gap-10 mt-10 `}>

        {
          show ? (<>

            <div className=" bg-[#ffffff]   lg:w-[800px]  pt-[8px] pb-[30px] px-[16px] rounded-3xl ">
              <h2 className="text-[18px] users  leading-[20px]  pb-[10px] text-[#000000] font-medium">
                Add Multiple User
              </h2>
              <div className="">
                <p className=" font-medium text-[14px] leading-[18px] text-[#3D3D3D] py-[10px] px-[17px]">
                  Upload User List CSV
                </p>
                <div
                  className={` bg-green-50 border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'bg-[#E9FDEE] border-[#27AE60]' : 'border-gray-300'
                    }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag and drop your PDFs here, or
                    <label className="text-[#27AE60] cursor-pointer ml-1">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        multiple
                        onChange={handleFileUpload}
                        required
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 mb-2">Supported format: PDF</p>
                  <p className="text-sm text-gray-500">Maximum file size: 10MB per file</p>
                  {formData.files && (
                    <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Selected files:</p>
                      <ul className="list-disc list-inside text-gray-600">
                        {Array.from(formData.files).map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="users bg-[#ffffff]  rounded-2xl " onClick={handleclick}>

              <div className="bg-[FFF9FD] mt-5 flex justify-center">
                <button className=" h-[32px] rounded-lg text-center  w-[200px]  text-white bg-[#F2994A]">
                  Add User
                </button>
              </div>
            </div>
          </>) : (
            <>
              <div className=" bg-[#ffffff] lg:w-[800px]  pt-[8px] pb-[30px] px-[16px] rounded-3xl ">
                <h2 className="text-[18px] users  leading-[20px]  pb-[10px] text-[#000000] font-medium">
                  Add Multiple User
                </h2>
                <div className="">
                  <p className=" font-medium text-[14px] leading-[18px] text-[#3D3D3D] py-[10px] px-[17px]">
                    Upload User List CSV
                  </p>
                  <div
                    className={` bg-green-50 border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'bg-[#E9FDEE] border-[#27AE60]' : 'border-gray-300'
                      }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">
                      Drag and drop your Xlsx file here, or
                      <label className="text-[#27AE60] cursor-pointer ml-1">
                        browse
                        <input
                          type="file"
                          className="hidden"
                          accept=".csv,.xlsx"
                          // multiple
                          onChange={handleFileUpload}
                          required
                        />
                      </label>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">Supported format: PDF</p>
                    <p className="text-sm text-gray-500">Maximum file size: 10MB per file</p>

                  </div>
                </div>
              </div>

              <div className="bg-[#FFF9FD] mt-5 flex flex-col items-center p-4 rounded-xl shadow-md" onClick={handleclick}>
                {/* Add User Button */}
                <button className="h-10 w-[200px] rounded-lg text-center text-white bg-[#F2994A] hover:bg-[#e0873d] transition duration-300">
                  Add User
                </button>

                {/* Selected Files List */}
                {formData.files && formData.files.length > 0 && (
                  <div className="mt-4 w-full max-w-[400px] bg-white shadow-lg rounded-xl p-3">
                    <p className="font-medium text-gray-700 mb-2">Selected files:</p>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      {Array.from(formData.files).map((file, index) => (
                        <li key={index} className="border-b py-1 last:border-none">
                          📄 {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </>
          )
        }

      </div>
    </div >
  );
};

export default Customadduser;
