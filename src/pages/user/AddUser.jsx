import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import countrycode from "../../components/data/Countrycode.json";
import Customadduser from "../../components/common/Customadduser";
import { getLocalGovAsync } from "../../apis/slices/teacherSlice";
import { useDispatch } from "react-redux";
import Validation from "../../components/validator/addUserValidator";
import { FaChevronLeft } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify"
import { addUserAsync } from "../../apis/slices/userSlice";
import { getCountriesAsync, getCategoriesAsync } from "../../apis/slices/categoriesSlice";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/common/SuccessModal";

const AddUser = ({ isOpen, togglesidebar }) => {
  const Navigate = useNavigate();
  const [showCustomAddUser, setShowCustomAddUser] = useState(false);
  const [errors, setError] = useState({});
  const [formData, setformData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    country_id: "",
    date_of_birth: "",
    gender: "",
    email: "",
    password: "",
    parent_name: "",
    parent_email: "",
    parent_phone: "",
    parent_address: "",
    parent_relationship: "",
    grade: location.state?.categoryData?.classes || '',
    course: location.state?.categoryData?.name || '',
    location: location.state?.categoryData?.country || '',
    status: "active"
  });


  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: 'success',
    title: '',
    message: '',
    buttonText: 'Close'
  });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const countries = useSelector((state) => state.categories.countries?.data || []);
  const category = useSelector((state) => state.categories.list?.data || []);
  const [selectedCategory, setSelectedCategory] = useState(formData.course || "");

  useEffect(() => {
    dispatch(getCountriesAsync());
    dispatch(getCategoriesAsync())
  }, []);

  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCategory(selectedId);
    onchangeHandler(event);
  };

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const image_type_data = file.type;
      const image_array = image_type_data.split("/");
      const image_types = image_array[1].split(" ");
      const img_type = image_types[0];
      var types = ["jpg", "png", "svg", "jpeg", "gif", "webp"];

      if (types.includes(img_type)) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        setModalConfig({
          type: 'caution',
          title: 'Invalid File Type',
          message: 'Please upload only image files (jpg, png, svg, jpeg, gif, webp).',
          buttonText: 'Try Again'
        });
        setShowModal(true);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalConfig.type === 'success') {
      Navigate('/users');
    }
  };

  const submitContactForm = async () => {
    const errorData = Validation(formData);
    setError(errorData);

    if (Object.keys(errorData).length === 0) {
      setLoading(true);

      const formDataToSend = new FormData();


      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("middle_name", formData.middle_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("country_id", formData.country_id || "81");
      formDataToSend.append("date_of_birth", formData.date_of_birth);
      formDataToSend.append("gender", formData.gender.toUpperCase());
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("parent_name", formData.parent_name);
      formDataToSend.append("parent_email", formData.parent_email);
      formDataToSend.append("parent_phone", formData.parent_phone);
      formDataToSend.append("parent_address", formData.parent_address);
      formDataToSend.append("parent_relationship", formData.parent_relationship);
      formDataToSend.append("grade", formData.grade || "");
      formDataToSend.append("course", formData.course || "");
      formDataToSend.append("location", formData.location || "");
      formDataToSend.append("status", "active");


      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      dispatch(addUserAsync({
        dispatch,
        data: formDataToSend,
        callbackFn: (res) => {
          setLoading(false);
          debugger
          if (res?.data?.status == 200) {
            setModalConfig({
              type: 'success',
              title: 'User Added Successfully',
              message: 'The user has been added to the system.',
              buttonText: 'Go to Users'
            });
            setformData({
              first_name: "",
              middle_name: "",
              last_name: "",
              phone: "",
              country_id: "",
              date_of_birth: "",
              gender: "",
              email: "",
              password: "",
              parent_name: "",
              parent_email: "",
              parent_phone: "",
              parent_address: "",
              parent_relationship: "",
              grade: location.state?.categoryData?.classes || '',
              course: location.state?.categoryData?.name || '',
              location: location.state?.categoryData?.country || '',
              status: "active"
            });
            setImageFile(null);
            setImagePreview(null);
          } else {

            setModalConfig({
              type: 'caution',
              title: 'Failed to Add User',
              message: res?.data?.message || 'There was an error adding the user.',
              buttonText: 'Try Again'
            });
          }

          setShowModal(true);
        }
      }));
    } else {

      setModalConfig({
        type: 'caution',
        title: 'Validation Error',
        message: 'Please fill all required fields correctly.',
        buttonText: 'OK'
      });
      setShowModal(true);
    }
  };

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}
    >

      <SuccessModal
        isOpen={showModal}
        onClose={handleModalClose}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        buttonText={modalConfig.buttonText}
      />

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
          <TailSpin color="green" radius={5} />
        </div>
      )}
      <div className="flex justify-start items-center lg:gap-3">
        <FaChevronLeft onClick={() => Navigate(-1)} className="cursor-pointer" />
        <div>
          <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home / Users/
            <span className="text-black font-medium"> AddUsers</span>
          </div>
        </div>
      </div>
      <div className="block lg:flex justify-center lg:gap-[17px] xl:gap-10 py-[2rem]">
        {showCustomAddUser ? (
          <Customadduser
            showCustomAddUser={showCustomAddUser}
            setShowCustomAddUser={setShowCustomAddUser}
            isOpen={isOpen}
            img=""
            text1="Drag and drop an image, or browse"
            text2="Upload .pdf, .doc or .doc, Max 6 MB "
            list1="Download Sample File"
            list2="Reupload List"
          />
        ) : (
          <>
            <div className="users bg-[#FFFFFF] rounded-xl lg:w-[80%]">
              <h2 className="text-[18px] leading-[20px] Border pb-[10px] text-[#000000] font-medium">
                Add Single User
              </h2>
              <div>
                <p className="font-medium text-[14px] leading-[18px] mt-5 text-[#3D3D3D] pb-[8px]">
                  Upload User Image
                </p>
                <div className="relative">
                  <div className="h-[48px] py-[10px] border border-dashed border-[#B9B9B9] text-[#B9B9B9] bg-[#EFF6F1] rounded-lg">
                    <p className="font-normal text-center cursor-pointer text-[16px] leading-[24px] translate-x-0 text-[#49454F]">
                      Click to upload Image
                    </p>
                    <input
                      onChange={handleImageChange}
                      type="file"
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      accept="image/*"
                    />
                  </div>
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <form>
                  {/* Full Name Fields */}
                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter First Name"
                        onChange={onchangeHandler}
                      />
                      {errors.first_name && <span className="text-red-500">Enter First Name *</span>}
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Middle Name</label>
                      <input
                        type="text"
                        name="middle_name"
                        value={formData.middle_name}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Middle Name"
                        onChange={onchangeHandler}
                      />
                    </div>
                  </div>

                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Last Name"
                        onChange={onchangeHandler}
                      />
                      {errors.last_name && <span className="text-red-500">Enter Last Name *</span>}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="font-medium text-[14px]">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={onchangeHandler}
                        className="w-full mt-1 border p-2 rounded-lg"
                      >
                        <option disabled value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                      {errors.gender && <span className="text-red-500">Select Gender *</span>}
                    </div>
                  </div>

                  {/* Date of Birth & Phone Number */}
                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Date of Birth</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        className="mt-1 w-full border p-2 rounded-lg"
                        onChange={onchangeHandler}
                      />
                      {errors.date_of_birth && <span className="text-red-500">Enter Date of Birth *</span>}
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Phone Number"
                        onChange={onchangeHandler}
                      />
                      {errors.phone && <span className="text-red-500">Enter Phone Number *</span>}
                    </div>
                  </div>

                  {/* Email & Password */}
                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Email"
                        onChange={onchangeHandler}
                      />
                      {errors.email && <span className="text-red-500">Enter Email *</span>}
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Password"
                        onChange={onchangeHandler}
                      />
                      {errors.password && <span className="text-red-500">Enter Password *</span>}
                    </div>
                  </div>

                  {/* Parent Details */}
                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Parent Name</label>
                      <input
                        type="text"
                        name="parent_name"
                        value={formData.parent_name}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Parent Name"
                        onChange={onchangeHandler}
                      />
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Parent Email</label>
                      <input
                        type="email"
                        name="parent_email"
                        value={formData.parent_email}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Parent Email"
                        onChange={onchangeHandler}
                      />
                    </div>
                  </div>

                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Parent Phone</label>
                      <input
                        type="text"
                        name="parent_phone"
                        value={formData.parent_phone}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Parent Phone"
                        onChange={onchangeHandler}
                      />
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Parent Address</label>
                      <input
                        type="text"
                        name="parent_address"
                        value={formData.parent_address}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Parent Address"
                        onChange={onchangeHandler}
                      />
                    </div>
                  </div>

                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Parent Relationship</label>
                      <input
                        type="text"
                        name="parent_relationship"
                        value={formData.parent_relationship}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Relationship"
                        onChange={onchangeHandler}
                      />
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Location"
                        onChange={onchangeHandler}
                      />
                    </div>
                  </div>

                  {/* Grade, Course, Country */}
                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Course</label>
                      <select
                        name="course"
                        value={formData.course}
                        className="mt-1 w-full border p-2 rounded-lg"
                        onChange={handleCategoryChange}
                      >
                        <option disabled value="">Select Course</option>
                        {category.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-medium text-[14px]">Grade</label>
                      <select
                        name="grade"
                        value={formData.grade}
                        className="mt-1 w-full border p-2 rounded-lg"
                        onChange={onchangeHandler}
                        disabled={!selectedCategory}
                      >
                        <option disabled value="">Select Grade</option>
                        {category
                          .find((cat) => cat.id == selectedCategory)
                          ?.classes?.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Country</label>
                      <select
                        name="country_id"
                        value={formData.country_id}
                        onChange={onchangeHandler}
                        className="w-full mt-1 border p-2 rounded-lg"
                      >
                        <option disabled value="">Select Country</option>
                        {countries.length > 0 ? (
                          countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading countries...</option>
                        )}
                      </select>
                      {errors.country_id && <span className="text-red-500">Select Country *</span>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="users bg-[#ffffff] lg:mt-0 mt-5 lg:w-[45%] rounded-lg h-[50%]">
              <h2 className="text-[18px] leading-[20px] pb-[10px] text-[#000000] font-medium">
                Summary
              </h2>
              <div className="rounded-2xl bg-[#EFF6F1] p-2">
                {Object.entries(formData)
                  .filter(([key]) => key !== 'password') // Don't show password in summary
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between mt-2">
                      <div className="font-light mt-3 text-[14px] leading-[16px] text-[#5A5B5C]">
                        {key.replace(/_/g, " ")}
                      </div>
                      <div className="text-[16px] mt-2 leading-[24px] text-[#000000]">
                        {value}
                      </div>
                    </div>
                  ))}
                {imagePreview && (
                  <div className="flex justify-between mt-2">
                    <div className="font-light mt-3 text-[14px] leading-[16px] text-[#5A5B5C]">
                      Image
                    </div>
                    <div className="text-[16px] mt-2 leading-[24px] text-[#000000]">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-10 w-10 object-cover rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[FFF9FD] m-auto my-10">
                <button
                  type="button"
                  className="h-[32px] rounded-lg text-center w-[200px] text-white bg-[#27AE60]"
                  onClick={submitContactForm}
                >
                  Add User
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddUser;
