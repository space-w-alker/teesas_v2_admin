import { loginAsync, loginResponse } from "../../apis/slices/authSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../../components/validator/signInValidator";
import Logo from "../../assets/svg/teesas_logo.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const userLoginResponse = useSelector(loginResponse);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear specific error when field is being edited
    if (error[e.target.name]) {
      setError({
        ...error,
        [e.target.name]: ""
      });
    }
  };

  // Add function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const SubmitSigninAction = () => {
    // Validate form inputs
    const validationErrors = Validation(formData);

    // Display validation errors if present
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});
    setLoading(true);

    const credentials = {
      email: formData.email,
      password: formData.password
    };

    try {
      loginAsync({
        dispatch,
        body: credentials,
        callbackFn: (response) => {
          setLoading(false);

          if (response?.data?.status === 200) {
            const token = response.data.data.token;
            const role = response.data.data.role;
            const userData = { token, role };

            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('authToken', token);

            toast.success("Login successful");
            navigate('/Dashboard');
          } else {
            // Handle error responses directly in the callback
            const errorMessage = response?.data?.message || "Login failed. Please check your credentials.";
            toast.error(errorMessage);

            if (response?.data?.status === 404) {
              setError(prev => ({ ...prev, email: "Account not found. Please check your email" }));
            } else if (response?.data?.status === 401) {
              setError(prev => ({ ...prev, password: "Invalid credentials" }));
            }
          }
        },
        errorFn: (error) => {
          console.error("Login error:", error);
          setLoading(false);

          let errorMessage = "An error occurred during login. Please try again.";

          // Extract error message from response if available
          if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;

            // Set specific field errors based on status code
            if (error.response.data.status === 404) {
              setError(prev => ({ ...prev, email: "Account not found. Please check your email" }));
            } else if (error.response.data.status === 401) {
              setError(prev => ({ ...prev, password: "Invalid credentials" }));
            }
          }

          toast.error(errorMessage);
        }
      });
    } catch (error) {
      setLoading(false);
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login exception:", error);
    }
  };

  return (
    <>
      <div className="p-8 flex justify-center items-center flex-col cursor-pointer ">
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
        <div className=" w-full h-full text-[20px] text-start font-[500]">
          Sign In
        </div>

        <div className="mt-5 flex justify-center items-center">
          <img src={Logo} className="w-[130px] h-[40px]" alt="Logo" />
        </div>

        <div className="mt-[100px] border-[#C3C3C3] border bg-[#FFFFFF] min-w-[350px] lg:min-w-[450px]  p-10 rounded-3xl">
          <div className="text-[30px] text-start font-bold ">Sign In</div>

          <div className="text-[12px] text-[#3D3D3D] mt-10">Email</div>{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            className={`w-full mt-1 bg-[#F8F8F8] text-[14px] border p-2 ${error.email ? 'border-red-500' : 'border-[#D9D9D9]'} h-[40px] rounded-lg`}
            placeholder="Enter Details"
            onChange={handlechange}
          />
          {error.email && <div className="text-red-500 text-[11px] mt-1">{error.email}</div>}

          <div className="text-[12px] text-[#3D3D3D] mt-5">Password</div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              className={`w-full mt-1 bg-[#F8F8F8] text-[14px] border p-2 ${error.password ? 'border-red-500' : 'border-[#D9D9D9]'} h-[40px] rounded-lg`}
              placeholder="Enter Details"
              onChange={handlechange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {error.password && (
            <div className="text-red-500 text-[11px] mt-1">{error.password}</div>
          )}

          <Link to="/forgot-password">
            <div className="flex items-center justify-end text-[12px] mt-2 cursor-pointer text-[#3D3D3D]">
              Forgot Password?
            </div>
          </Link>

          <button
            type="button"
            onClick={SubmitSigninAction}
            className={`mt-[20px] bg-[#27AE60] text-[14px] flex items-center justify-center text-[#FFFFFF] w-full p-2 rounded-lg`}
          >
            Sign In
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        ProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default Login;