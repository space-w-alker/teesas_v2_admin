import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { FaChevronLeft } from "react-icons/fa";
import { addSalesTeamAsync } from "../../apis/slices/salesSlice";
import validateSalesTeamForm from "../../components/validator/addSalesTeamValidator";

const AddSalesTeam = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({});

  const [formData, setFormData] = useState({
    Full_Name: "",
    Gender: "",
    Phone_Number: "",
    Email: "",
    Region: "",
    Team_Code: "",
    Team_Name: "",
    Location: "",
    Territory: "",
    Role: "",
    Description: "",
    WhatsApp: "",
  });

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = () => {
    const errorData = validateSalesTeamForm(formData);
    setError(errorData);
    if (Object.keys(errorData).length < 1) {
      setLoading(true);
      const form_data = {
        name: formData?.Full_Name,
        gender: formData?.Gender,
        email: formData?.Email,
        phone: formData?.Phone_Number,
        team_code: formData?.Team_Code,
        description: formData?.Description,
        region: formData?.Region,
        team_name: formData?.Team_Name,
        location: formData?.Location,
        territory: formData?.Territory,
        role: formData?.Role,
        whatsapp: formData?.WhatsApp, // Added WhatsApp field
      };

      // Dispatch the Redux action
      dispatch(
        addSalesTeamAsync({
          dispatch,
          data: form_data,
          token: "",
          callbackFn: () => {
            setLoading(false);
            navigate("/sales-team");
          },
        })
      );
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div
      className={`py-[8rem] lg:px-[9rem] px-[10px] ${
        isOpen ? "ml-[240px]" : ""
      }`}
    >
      <div className="flex justify-start items-center lg:gap-3 mb-6">
        <FaChevronLeft
          onClick={() => navigate("/sales-team")}
          className="cursor-pointer"
        />
        <div>
          <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home / <span className="text-black font-medium">Sales Team</span>
          </div>
        </div>
      </div>

      <div className="block lg:flex justify-center gap-10">
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

        <div className="users bg-[#FFFFFF] rounded-xl lg:w-[80%]">
          <div className="Border">
            <h2 className="font-medium text-[18px] leading-[20px] text-[#000000] pb-[20px]">
              Add Sales Team Member
            </h2>
          </div>

          <div>
            <form>
              <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                <div>
                  <label className="font-medium text-[14px] mt-2 leading-[18px] text-[#3D3D3D] block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="Full_Name"
                    value={formData.Full_Name}
                    className="mt-1 w-full text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Details"
                    onChange={onchangeHandler}
                  />
                </div>

                <div>
                  <label className="font-medium text-[14px] pt-4 leading-[18px] text-[#3D3D3D]">
                    Gender
                  </label>
                  <select
                    name="Gender"
                    value={formData.Gender}
                    onChange={onchangeHandler}
                    className="w-full mt-1 text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option value="">Please Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="Phone_Number"
                    value={formData.Phone_Number}
                    className="mt-1 w-full text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Phone Number"
                    onChange={onchangeHandler}
                  />
                </div>

                <div>
                  <label className="font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    className="mt-1 w-full text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Email"
                    onChange={onchangeHandler}
                  />
                </div>

                <div>
                  <label className="font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                    Region
                  </label>
                  <input
                    type="text"
                    name="Region"
                    value={formData.Region}
                    className="mt-1 w-full text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Region"
                    onChange={onchangeHandler}
                  />
                </div>

                <div>
                  <label className="font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                    Team Code
                  </label>
                  <input
                    type="text"
                    name="Team_Code"
                    value={formData.Team_Code}
                    className="mt-1 w-full text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Team Code"
                    onChange={onchangeHandler}
                  />
                </div>

                <div>
                  <label className="font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                    Team Name
                  </label>
                  <input
                    type="text"
                    name="Team_Name"
                    value={formData.Team_Name}
                    className="mt-1 w-full text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Team Name"
                    onChange={onchangeHandler}
                  />
                </div>

                <div>
                  <label className="font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                    Location
                  </label>
                  <input
                    type="text"
                    name="Location"
                    value={formData.Location}
                    className="mt-1 w-full text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Location"
                    onChange={onchangeHandler}
                  />
                </div>

                <div>
                  <label className="font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                    Territory
                  </label>
                  <input
                    type="text"
                    name="Territory"
                    value={formData.Territory}
                    className="mt-1 w-full text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Territory"
                    onChange={onchangeHandler}
                  />
                </div>

                <div>
                  <label className="font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                    Role
                  </label>
                  <input
                    type="text"
                    name="Role"
                    value={formData.Role}
                    className="mt-1 w-full text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Role"
                    onChange={onchangeHandler}
                  />
                </div>

                <div>
                  <label className="font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    name="WhatsApp"
                    value={formData.WhatsApp}
                    className="mt-1 w-full text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter WhatsApp Number"
                    onChange={onchangeHandler}
                  />
                </div>
              </div>

              <div className="mt-4 Border">
                <label className="font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                  Description
                </label>
                <textarea
                  value={formData.Description}
                  onChange={onchangeHandler}
                  name="Description"
                  className="outline-none w-full border border-[#D9D9D9] py-[10px] px-[16px] rounded-lg h-[149px]"
                  placeholder="Enter Description"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="users bg-[#ffffff] lg:mt-0 mt-5 lg:w-[45%] rounded-lg h-[50%]">
          <h2 className="text-[18px] leading-[20px] pb-[10px] text-[#000000] font-medium">
            Summary
          </h2>
          <div className="rounded-2xl bg-[#EFF6F1] p-2">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="flex justify-between mt-2">
                <div className="font-light mt-3 text-[14px] leading-[16px] text-[#5A5B5C]">
                  {key.replace(/_/g, " ")}
                </div>
                <div className="text-[16px] mt-2 leading-[24px] text-[#000000]">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[FFF9FD] m-auto my-10">
            <button
              type="button"
              className="h-[32px] rounded-lg text-center w-[200px] text-white bg-[#27AE60]"
              onClick={submitForm}
            >
              Add Team Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalesTeam;
