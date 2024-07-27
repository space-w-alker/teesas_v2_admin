import React, { useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";

const ManageLiveClass = ({isOpen}) => {
    const [errors, setError] =  useState({});
    const[modalopen,setmodalopen]=useState(false)
    const [formData, setformData] = useState({
      Grade: "",
      category: "",
      subject: "",
      lesson: "",
      teacher: "",
      date: "",
      stime: "",
      ltime: "",
    });
    const onchangeHandler = (event) => {
      const { name, value } = event.target;
      setformData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  return (
    <div
    className={`py-[7rem] lg:px-[5rem]  flex flex-col gap-2 px-[10px] ${isOpen ? "lg:ml-[260px]" : ""}`}>
        <div className='flex justify-start  items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / Practice /<span className='text-black font-medium'>Manage Live Class</span></div>
        </div>
      </div>
    <div className="lg:flex gap-14 mt-3 ">
      <div className=" rounded-[24px] py-[20px] px-[16px] bg-[#FFFFFF] lg:w-[80%]">
        <div className="Border ">
          <h2 className=" font-medium text-[18px]  leading-[20px] text-[#000000] pb-[20px]">
           Manage Live Class
          </h2>
        </div>
        <div>
          <div className=" ">
            <form>
              {/* Grade */}
              <div className="block lg:grid grid-cols-2 gap-5 mt-5 pb-[18px]">
                <div className="">
                  <label
                    for="category"
                    className="font-medium  text-[14px] mt-5 block leading-[18px] text-[#3D3D3D] "
                  >
                    Category
                  </label>
                  <select
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={onchangeHandler}
                    className=" w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option value="0">1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                  </select>
                  {errors.category && (
                    <span className="text-red-500 block p-[8px]">
                      select Category *
                    </span>
                  )}
                </div>
                <div className="">
                  <label
                    for="Grade"
                    className="font-medium  text-[14px] mt-5 block leading-[18px] text-[#3D3D3D] "
                  >
                    Grade
                  </label>
                  <select
                    type="text"
                    name="Grade"
                    value={formData.Grade}
                    onChange={onchangeHandler}
                    className=" w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option value="0">1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                  </select>
                  {errors.Grade && (
                    <span className="text-red-500 block p-[8px]">
                      Enter Grade *
                    </span>
                  )}
                </div>
                <div className="">
                  <label
                    for="subject"
                    className="font-medium  text-[14px] mt-5 block leading-[18px] text-[#3D3D3D] "
                  >
                    Select Subject
                  </label>
                  <select
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={onchangeHandler}
                    className=" w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option value="0">English</option>
                    <option value="1">Math</option>
                    <option value="2">Science</option>
                  </select>
                  {errors.subject && (
                    <span className="text-red-500 block p-[8px]">
                      Enter subject *
                    </span>
                  )}
                </div>
                <div className="">
                  <label
                    for="lesson"
                    className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] "
                  >
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    name="lesson"
                    placeholder="Enter Details"
                    value={formData.lesson}
                    onChange={onchangeHandler}
                    className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  />
                  {errors.lesson && (
                    <span className="text-red-500 block p-[8px]">
                      Enter Lesson Title *
                    </span>
                  )}
                </div>
                <div className="">
                  <label
                    for="teacher"
                    className="font-medium  text-[14px] mt-5 block leading-[18px] text-[#3D3D3D] "
                  >
                    Select Teacher
                  </label>
                  <select
                    type="text"
                    name="teacher"
                    value={formData.teacher}
                    onChange={onchangeHandler}
                    className=" w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option value="0">English</option>
                    <option value="1">Math</option>
                    <option value="2">Science</option>
                  </select>
                  {errors.teacher && (
                    <span className="text-red-500 block p-[8px]">
                      Select Teacher *
                    </span>
                  )}
                </div>
                <div className="">
                  <label
                    for="date"
                    className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] "
                  >
                    Select Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    placeholder="Enter Details"
                    value={formData.date}
                    onChange={onchangeHandler}
                    className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  />
                  {errors.date && (
                    <span className="text-red-500 block p-[8px]">
                      Enter Date *
                    </span>
                  )}
                </div>
                <div className="">
                  <label
                    for="stime"
                    className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] "
                  >
                    Select Start Time
                  </label>
                  <input
                    type="text"
                    name="stime"
                    placeholder="Enter Details"
                    value={formData.stime}
                    onChange={onchangeHandler}
                    className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  />
                  {errors.stime && (
                    <span className="text-red-500 block p-[8px]">
                      Enter Start Time *
                    </span>
                  )}
                </div>
                <div className="">
                  <label
                    for="etime"
                    className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] "
                  >
                    Select End Time
                  </label>
                  <input
                    type="text"
                    name="etime"
                    placeholder="Enter Details"
                    value={formData.etime}
                    onChange={onchangeHandler}
                    className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  />
                  {errors.etime && (
                    <span className="text-red-500 block p-[8px]">
                      Enter End Time *
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <p className=" font-normal text-[14px] leading-[20px] text-[#101928]">
                  Activate Reoccurring Live Class
                </p>
              </div>
              <div className="mt-4">
                <label className=" font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                  Description
                </label>
                <textarea
                  placeholder="Enter Message Here"
                  className=" outline-none w-full border border-[#D9D9D9] py-[10px] px-[16px] rounded-lg h-[149px]"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="users bg-[#ffffff] lg:mt-0 mt-5 lg:w-[50%] rounded-lg h-[50%]">
        <h2 className="text-[18px]  leading-[20px]  pb-[10px] text-[#000000] font-medium">
          Summary
        </h2>
        <div className="rounded-2xl bg-[#FFF9ED] p-2">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex  justify-between mt-2">
          <div className="font-light mt-3 text-[14px] leading-[16px] text-[#5A5B5C]">
            {key.replace(/_/g, " ")}
          </div>
          <div className="text-[16px] leading-[24px] text-[#000000]">{value}</div>
        </div>
      ))}
    </div>

        <div className="bg-[FFF9FD] m-auto my-10">
          <button
            type="button"
            className=" h-[32px] rounded-lg text-center  w-[200px]  text-white bg-[#F2994A]"
            // onClick={() => {
            //   setmodalopen(!modalopen)
            // }}
          >
          Schedule Class
          </button>
        </div>
      </div>
    </div>
    {/* {modalopen && <SucessfullSchedule/>} */}
  </div>
  )
}

export default ManageLiveClass
