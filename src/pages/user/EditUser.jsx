import React, { useState, useEffect } from "react";
import countrycode from "../../components/data/Countrycode.json";
import Customadduser from "../../components/common/Customadduser";
import { getCoursesAsync } from "../../apis/slices/authSlice";
import { getLocalGovAsync } from "../../apis/slices/teacherSlice";
import { useDispatch } from "react-redux";
import Validation from "../../components/validator/addUserValidator";
import { FaChevronLeft } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify"
import { useSelector } from "react-redux";
import { fetchUserDetailsAsync, updateUserAsync } from "../../apis/slices/userSlice";
import { useLocation, useNavigation, useParams } from "react-router-dom";
import { addUserAsync } from "../../apis/slices/userSlice";
import { getCountriesAsync, getCategoriesAsync } from "../../apis/slices/categoriesSlice";
import { useNavigate } from "react-router-dom";


const EditUser = ({ isOpen, togglesidebar }) => {
  const location = useLocation();
  const { isEdit, userData } = location.state || {};
  const [showCustomAddUser, setShowCustomAddUser] = useState(false);
  const [errors, setError] = useState({});
  const data = useSelector((state) => state.users?.userDetails?.usersList || {});
  const addData = useSelector((state) => state?.users?.userDetails || {});
  const [formData, setFormData] = useState({
    first_name: userData?.first_name,
    middle_name: userData?.middle_name,
    last_name: userData?.last_name,
    phone: userData?.phone || "",
    country_id: userData?.country_id || "",
    date_of_birth: userData?.date_of_birth || "",
    gender: userData?.gender || "",
    email: userData?.email || "",
    password: userData?.password || "",
    parent_name: userData?.parent_name || "",
    parent_email: userData?.parent_email || "",
    parent_address: userData?.parent_address || "",
    parent_relationship: userData?.parent_relationship || "",
    grade: userData?.grade || '',
    course: userData?.course || '',
    location: userData?.location || '',
    status: "active"
  });
  console.log('thi', formData?.location);

  const countries = useSelector((state) => state.categories.countries?.data || []);
  const category = useSelector((state) => state.categories.list?.data || []);
  const [selectedCategory, setSelectedCategory] = useState(formData?.course || "");

  useEffect(() => {
    dispatch(getCountriesAsync());
    dispatch(getCategoriesAsync())
  }, []);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  console.log('t', addData);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        dispatch(fetchUserDetailsAsync({ dispatch, userId: id }));
      } finally {
        setLoading(false);
      }
    };
    fetchUser();

  }, [dispatch, id]);

  // console.log('test', userData)
  // useEffect(() => {
  //   if (isEdit && userData) {
  //     setFormData(userData);
  //   }
  // }, [isEdit, userData]);

  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCategory(selectedId);
    onchangeHandler(event);
  };

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitContactForm = () => {
    const errorData = Validation(formData);
    setError(errorData);

    if (Object.keys(errorData).length === 0) {
      const finaldata = {
        first_name: formData?.first_name,
        middle_name: formData?.middle_name,
        last_name: formData?.last_name,
        phone: formData?.phone,
        country_id: formData?.country_id || 81, // Default value if not provided
        date_of_birth: formData?.date_of_birth,
        gender: formData?.gender.toUpperCase(),
        email: formData?.email,
        password: formData?.password,
        parent_name: formData?.parent_name,
        parent_email: formData?.parent_email,
        parent_address: formData?.parent_address,
        parent_relationship: formData?.parent_relationship,
        grade: parseInt(formData?.grade, 10) || 21, // Convert to integer
        course: parseInt(formData?.course, 10) || 153, // Convert to integer
        location: formData?.location,
        status: "active",
      };

      dispatch(updateUserAsync({
        dispatch, userId: userData?.id, data: finaldata, callbackFn: (res) => {
          console.log('callback', res)
          setFormData({
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
            parent_address: "",
            parent_relationship: "",
            grade: location.state?.categoryData?.classes || '',
            course: location.state?.categoryData?.name || '',
            location: location.state?.categoryData?.country || '',
            status: "active"

          });
          navigate(`/userdetails/${userData?.id}`);
        }
      }))
      // .then((response) => {
      //   console.log('tt', response);
      //   if (response?.payload?.success) {
      //     toast.success('User added successfully');
      //   } else {
      //     toast.error(response?.payload?.message || "Failed to add user.");
      //   }
      // })
      // .catch((error) => {
      //   toast.error(error.message || "An error occurred.");
      // });
    } else {
      toast.error("Please fill all required fields.");
    }
  };
  return (
    <div
      className={`  py-[7rem] lg:px-[5rem]  px-[10px] ${isOpen ? "xl:ml-[260px]" : ""
        }`}
    >
      {/* {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }} */}
      {/* >
          <TailSpin color="green" radius={5} />
        </div>
      )} */}
      <div className="flex justify-start  items-center lg:gap-3">
        <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <div>
          <div className=" font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home / Users/
            <span className="text-black font-medium"> EditUsers</span>
          </div>
        </div>
      </div>
      <div className=" block lg:flex justify-center lg:gap-[17px] xl:gap-10 py-[2rem]">
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
            <div className="users bg-[#FFFFFF] rounded-xl lg:w-[80%]">
              <h2 className="text-[18px]  leading-[20px] Border  pb-[10px] text-[#000000] font-medium">
                Edit User Details
              </h2>
              <div>
                <p className=" font-medium text-[14px] leading-[18px] mt-5 text-[#3D3D3D] pb-[8px]">
                  Upload User Image
                </p>
                <div className="h-[48px] py-[10px] border border-dashed border-[#B9B9B9]  text-[#B9B9B9] bg-[#EFF6F1] rounded-lg">
                  <p className=" font-normal text-center cursor-pointer text-[16px] leading-[24px]  translate-x-0 text-[#49454F]">
                    <div className="text-center relative ">
                      {" "}
                      Click to upload Image
                    </div>
                    <input
                      onChange={(e) => {
                        if (
                          e.target.files[0] !== null &&
                          e.target.files[0] !== undefined
                        ) {
                          const image_type_data = e.target.files[0].type;
                          const image_array = image_type_data?.split("/");
                          const image_types = image_array[1].split(" ");
                          const img_type = image_types[0];
                          var types = [
                            "jpg",
                            "png",
                            "svg",
                            "jpeg",
                            "gif",
                            "webp",
                          ];
                          if (types.includes(img_type)) {
                            setImageFile(e.target.files[0])
                          } else {
                            toast.error("Please Upload Only Images.");
                          }
                        }
                      }}
                      type="file"
                      className="text-[#EFF6F1]   opacity-0 absolute top-0 left-[45%] max-sm:left-0 "
                      placeholder=""
                    />
                  </p>
                </div>
              </div>

              <div className=" ">
                <form>

                  {/* Full Name Fields */}
                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData?.first_name}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter First Name"
                        onChange={onchangeHandler}
                      />
                      {errors?.first_name && <span className="text-red-500">Enter First Name *</span>}
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Middle Name</label>
                      <input
                        type="text"
                        name="middle_name"
                        value={formData?.middle_name}
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
                        value={formData?.last_name}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Last Name"
                        onChange={onchangeHandler}
                      />
                      {errors?.last_name && <span className="text-red-500">Enter Last Name *</span>}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="font-medium text-[14px]">Gender</label>
                      <select
                        name="gender"
                        value={formData?.gender}
                        onChange={onchangeHandler}
                        className="w-full mt-1 border p-2 rounded-lg"
                      >
                        <option disabled value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                      {errors?.gender && <span className="text-red-500">Select Gender *</span>}
                    </div>
                  </div>

                  {/* Date of Birth & Phone Number */}
                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Date of Birth</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData?.date_of_birth}
                        className="mt-1 w-full border p-2 rounded-lg"
                        onChange={onchangeHandler}
                      />
                      {errors?.date_of_birth && <span className="text-red-500">Enter Date of Birth *</span>}
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData?.phone}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Phone Number"
                        onChange={onchangeHandler}
                      />{console.log(formData?.phone)}
                      {errors?.phone && <span className="text-red-500">Enter Phone Number *</span>}
                    </div>
                  </div>

                  {/* Email & Password */}
                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData?.email}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Email"
                        onChange={onchangeHandler}
                      />
                      {errors?.email && <span className="text-red-500">Enter Email *</span>}
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData?.password}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Password"
                        onChange={onchangeHandler}
                      />
                      {errors?.password && <span className="text-red-500">Enter Password *</span>}
                    </div>
                  </div>

                  {/* Parent Details */}
                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Parent Name</label>
                      <input
                        type="text"
                        name="parent_name"
                        value={formData?.parent_name}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Parent Name"
                        onChange={onchangeHandler}
                      />
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Parent Email</label>
                      <input
                        type="text"
                        name="parent_email"
                        value={formData?.parent_email}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Parent Email"
                        onChange={onchangeHandler}
                      />
                    </div>
                  </div>

                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Parent Address</label>
                      <input
                        type="text"
                        name="parent_address"
                        value={formData?.parent_address}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Parent Address"
                        onChange={onchangeHandler}
                      />
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Parent Relationship</label>
                      <input
                        type="text"
                        name="parent_relationship"
                        value={formData?.parent_relationship}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Relationship"
                        onChange={onchangeHandler}
                      />
                    </div>
                  </div>

                  {/* Grade, Course, Country, Location, Status */}
                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="font-medium text-[14px]">Course</label>
                      <select
                        name="course"
                        value={formData?.course}
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

                    {/* Grade (Class) Dropdown - Depends on Selected Course */}
                    <div>
                      <label className="font-medium text-[14px]">Grade</label>
                      <select
                        name="grade"
                        value={formData?.grade}
                        className="mt-1 w-full border p-2 rounded-lg"
                        onChange={onchangeHandler}
                        disabled={!selectedCategory} // Disable if no course is selected
                      >
                        <option disabled value="">Select Grade</option>
                        {category
                          .find((cat) => cat.id == selectedCategory)
                          ?.classes.map((cls) => (
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
                        value={formData?.country_id}
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
                      {errors?.country_id && <span className="text-red-500">Select Country *</span>}
                    </div>
                    <div>
                      <label className="font-medium text-[14px]">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData?.location}
                        className="mt-1 w-full border p-2 rounded-lg"
                        placeholder="Enter Location"
                        onChange={onchangeHandler}
                      />
                    </div>
                  </div>

                </form>



              </div>
            </div>
            <div className="users bg-[#ffffff] lg:mt-0 mt-5 lg:w-[35%] rounded-lg h-[50%]">
              <h2 className="text-[18px]  leading-[20px]  pb-[10px] text-[#000000] font-medium">
                Summary
              </h2>
              <div className="rounded-2xl bg-[#EFF6F1] p-2">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="flex  justify-between mt-2">
                    <div className="font-light mt-3 text-[14px] leading-[16px] text-[#5A5B5C]">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div className="text-[16px] leading-[24px] text-[#000000]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[FFF9FD] m-auto my-10">
                <button
                  type="button"
                  className=" h-[32px] rounded-lg text-center  w-[200px]  text-white bg-[#27AE60]"
                  onClick={() => {
                    submitContactForm();
                  }}
                >
                  {" "}
                  Update User
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditUser;
