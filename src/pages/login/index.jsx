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

  const handlechange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



   
  
  const SubmitSigninAction = () => {
    const credentials = {
      email: formData.email,
      password: formData.password
    };
  
    loginAsync({
      dispatch,
      body: credentials,
      callbackFn: (response) => {
        console.log('Before navigation:', response.data);
        if (response?.data?.status === 200) {
          const token = response.data.data.token;
          const role = response.data.data.role;
          const userData = { token, role };
          
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('authToken', token);
          console.log('Token stored:', token);
          navigate('/Dashboard');
          console.log('After navigation');
        }
      }
    });
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
            className="w-full mt-1 bg-[#F8F8F8] text-[14px] border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
            placeholder="Enter Details"
            onChange={handlechange}
          />
          {error.email && <div className=" text-red-500 text-[11px] mt-1" >{error.email}</div>}
          <div className="text-[12px] text-[#3D3D3D] mt-5">Password</div>
          <input
            type="text"
            name="password"
            value={formData.password}
            className="w-full mt-1 bg-[#F8F8F8] text-[14px] border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
            placeholder="Enter Details"
            onChange={handlechange}
          />
          {error.password && (
            <div className=" text-red-500 text-[11px] mt-1">{error.password}</div>
          )}
          <Link to="/forgot-password">
            <div className="flex items-center justify-end text-[12px] mt-2 cursor-pointer text-[#3D3D3D]">
              Forgot Password?
            </div>
          </Link>
          
          <button
            type="button"
            onClick={() => {
              SubmitSigninAction();
            }}
            className={`mt-[20px] bg-[#27AE60] text-[14px] flex items-center justify-center text-[#FFFFFF] w-full p-2 rounded-lg`}
          >
            Sign In
          </button>

          <button
  type="button"
  onClick={() => {
    navigate('/signup');  // Adjust the path based on your router configuration
  }}
  className={`mt-[20px] bg-[#27AE60] text-[14px] flex items-center justify-center text-[#FFFFFF] w-full p-2 rounded-lg`}
>
  Sign up
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
