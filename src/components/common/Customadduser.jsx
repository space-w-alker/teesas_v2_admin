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

const Customadduser = ({ isOpen }) => {

  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [show, setshow] = useState(false);
  const [File, setFile] = useState({});
  const [loading, setLoading] = useState(false)
  const handleclick = () => {
    if (File != "") {
      setLoading(true);
      var form_data = new FormData();

      form_data.append("file", File);

      uploadUsersAsync({
        dispatch: dispatch,
        body: form_data,
        token: token,
        callbackFn: (res) => {

          if (res?.data?.status === 200) {
            setFile("")
            setshow(!show)
            setLoading(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        },
      });
    }

  }

  return (
    <div className={`py-[8rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <TailSpin color="orange" radius={5} />
        </div>
      )}
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
                <div className="bg-[#EFF6F1] py-[8px] px-[24px] rounded-lg  border-dashed border border-[#B9B9B9] flex flex-col justify-center mx-5">
                  <div className="flex flex-col justify-center items-center gap-1 text-center text-[#98A2B3]">
                    <img src={uploadstates} alt="Rectangle" className=" w-[69px] h-[73px] mb-[20px]" />
                    <p className=" font-medium text-[16px] leading-[24px] ">Upload Successful</p>
                    <p className=" font-normal text-[12px] leading-[20px]">File Title.pdf | 313 KB . 31 Aug, 2022  </p>
                    <div className=" flex items-center  gap-4 justify-center">
                      <p className=" font-medium text-[12px] leading-[12px] text-[#27AE60]">View List</p>
                      <p className=" font-medium text-[12px] leading-[12px] text-[#27AE60]">Reupload List</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="users bg-[#ffffff]  rounded-2xl " onClick={handleclick}>
              <h2 className="text-[18px]  leading-[20px]  pb-[10px] text-[#000000] font-medium">
                Summary
              </h2>
              <div className="bg-[#EFF6F1] lg:w-[400px]  px-[10px] py-[20px]  h-[80px]  rounded-2xl">
                <div className="addborder flex justify-between items-center py-[10px] ">
                  <div className=" font-light text-[14px] leading-[16px] text-[#5A5B5C] w-full ">
                    Total Number
                  </div>

                  <div>24</div>
                </div>
              </div>
              <div className="bg-[FFF9FD] mt-5 flex justify-center">
                <button className=" h-[32px] rounded-lg text-center  w-[200px]  text-white bg-[#27AE60]">
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
                  <div className="bg-[#EFF6F1] py-[8px] px-[24px] rounded-lg  border-dashed border border-[#B9B9B9] flex flex-col justify-center mx-5">
                    <div className="flex flex-col relative justify-center items-center gap-1 text-center text-[#98A2B3]">
                      <img src={Rectangle} alt="Rectangle" className=" w-[69px] h-[73px] mb-[20px] " />
                      <input type="file" onChange={(e) => {

                        if (
                          e.target.files[0] !== null &&
                          e.target.files[0] !== undefined
                        ) {
                          const image_type_data = e.target.files[0].type;
                          const image_array = image_type_data.split("/");
                          const image_types = image_array[1].split(" ");
                          const img_type = image_types[0];
                          var types = [
                            "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                          ];

                          if (types.includes(img_type)) {

                            setFile(e.target.files[0])
                          } else {
                            toast.error("Please Upload File.");
                          }
                        }
                      }} className="text-[#EFF6F1]   opacity-0 absolute top-10 left-[40%]  max-sm:left-0 " placeholder="" />
                      <p className=" font-medium text-[16px] leading-[24px] ">Drag and drop an image, or browse</p>
                      <p className=" font-normal text-[12px] leading-[20px]">Upload .pdf, .doc or .doc, Max 6 MB</p>
                      <p className=" font-medium text-[12px] leading-[12px] text-[#27AE60]">Download Sample File</p>

                    </div>
                  </div>
                </div>
              </div>
              <div className="users bg-[#ffffff] mt-5 lg:mt-0 rounded-2xl " onClick={handleclick}>
                <h2 className="text-[18px]  leading-[20px]  pb-[10px] text-[#000000] font-medium">
                  Summary
                </h2>
                <div className="bg-[#EFF6F1] w-auto lg:w-[400px]  px-[10px] py-[20px]  h-[80px]  rounded-2xl">
                  <div className="addborder flex justify-between items-center py-[10px] ">
                    <div className=" font-light text-[14px] leading-[16px] text-[#5A5B5C] w-full ">
                      Total Number
                    </div>

                    <div>24</div>
                  </div>
                </div>
                <div className="bg-[FFF9FD] mt-5 flex justify-center">
                  <button className=" h-[32px] rounded-lg text-center  w-[200px]  text-white bg-[#27AE60]">
                    Add User
                  </button>
                </div>
              </div>
            </>
          )
        }

      </div>
    </div>
  );
};

export default Customadduser;
