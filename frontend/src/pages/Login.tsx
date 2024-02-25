import React, { useEffect, useState } from "react";
import Logo from "../common/Logo";
import { colors } from "../Constants";
import { Link, useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../modals/ForgotPasswordModal";
import { Error, Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorBox from "../common/ErrorBox";
import { loginUser } from "../services/authServices";
import { log } from "console";
import APIResponseStatus from "../common/APIResponseStatus";
import MagicLoader from "../common/MagicLoader";

function Login() {
  document.title = "TMS • Login";
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState<Boolean>(false);
  const [loginStatus,setLoginStatus] = useState<any>("not-loggedin")
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const retryLogin=()=>{
    setLoginFormData(emptyState)
    setLoginStatus("not-loggedin")
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);
    // Clear the timeout if the component unmounts or if there's a new error
    return () => clearTimeout(timer);
  }, [error]);

  const emptyState = {
    username: "",
    password: "",
  };

  const [loginFormData, setLoginFormData]: any = useState<any>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const validateBeforeSubmit = () => {
    // Check if username and password are not empty
    if (!loginFormData.username.trim()) {
      setError("Username cannot be empty");
      return false;
    } else if (!loginFormData.password.trim()) {
      setError("Password cannot be empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async() => {
    // Add your validation logic here
    if (validateBeforeSubmit()) {
      setLoginStatus("login-loading")
      // Perform registration logic here call API
      console.log("Perform registration logic");
      await loginUser(loginFormData).then((res:any)=>{
        setLoginStatus("login-success")
        console.log("Login Response : ",res);

      }).catch((err:any)=>{
        setLoginStatus("login-failure")
        console.log("Error : ",err);
      })
      setLoginFormData(emptyState);
    } else {
      // Display error message
      console.error("Validation failed. Display error message.");
    }
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center py-4 mx-auto  w-[450px] ">
          <div className="flex justify-center p-2 ">
            <Logo size={"0.4"} color={colors.C11} />
          </div>
          {
          loginStatus==="not-loggedin"?( 
          <>
          <div className="flex flex-col gap-2 p-2 py-8 ">
            <input
              type="text"
              className="bg-C44 rounded-[8px] p-2 h-[46px] text-[14px]"
              placeholder="Username"
              name="username"
              id="username"
              value={loginFormData.firstName}
              onChange={handleInputChange}
            />

            <div className="bg-C44 rounded-[8px]  h-[46px] flex flex-row items-center justify-between focus-within:outline focus-within:outline-2">
              <input
                type={showPassword ? "text" : "password"}
                className=" text-[14px] flex-1 bg-C44 focus:outline-none rounded-[8px] p-2 h-[46px]"
                placeholder="Password"
                name="password"
                id="password"
                value={loginFormData.password}
                onChange={handleInputChange}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="mr-2 cursor-pointer rounded-full p-1 transition hover:bg-[#00000011]"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" sx={{ color: colors.C11 }} />
                ) : (
                  <Visibility fontSize="small" sx={{ color: colors.C11 }} />
                )}
              </div>
            </div>
            <Link to={"/forgot-password"}>
              <div
                className={`text-[11px] text-[#1F7A8C] cursor-pointer text-right`}
                onClick={() => setForgotPasswordModal(true)}
              >
                Forgot Password ?
              </div>
            </Link>

            {error ? <ErrorBox message={error} /> : null}
          </div>

          <div className="flex justify-center w-full ">
            <button
              onClick={handleSubmit}
              className={`bg-[#012b39f2] hover:bg-[#012B39] rounded-[8px] text-white font-bold text-[14px] py-4 px-10 `}
            >
              Log In
            </button>
          </div>
          <Link to={"/register"}>
            <div
              className={`text-[11px] text-[#1F7A8C] cursor-pointer  text-center py-2`}
            >
              New to TMS ? Sign Up!
            </div>
          </Link>
          </>): 
          loginStatus === "login-success" ? (
          <div className="mt-20">
            <APIResponseStatus
              status={true}
              message={"User Successfully Logged In"}
            />
             <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={() => navigate("/dashboard")}
                className={`hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}
              >
                Go To Dashboard
              </button>
            </div>
          </div>
        ) : loginStatus === "login-failure" ? (
          <div className="mt-20">
            <APIResponseStatus
              status={false}
              message={"User Login Failed"}
            />
             <div className="flex justify-center gap-4 mt-10">
              <button
                className={` hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}
                onClick={retryLogin}
              >
                Try Again ?
              </button>
            </div>
          </div>
        ) : loginStatus === "login-loading" ? (
          <div className="flex justify-center mt-[-80px] ">
            <MagicLoader message={"Logging In..."}/>
          </div>
         
        ) : null
          
          }
        </div>
        {/*Forgot Password Modal  */}
        {forgotPasswordModal && <ForgotPasswordModal />}
      </div>
    </>
  );
}

export default Login;
