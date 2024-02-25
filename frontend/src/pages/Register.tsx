import React, { useEffect, useState } from "react";
import Logo from "../common/Logo";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../Constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorBox from "../common/ErrorBox";
import { registerUser } from "../services/authServices";
import MessageModal from "../modals/MessageModal";
import APIResponseStatus from "../common/APIResponseStatus";
import Loader from "../common/Loader";
import MagicLoader from "../common/MagicLoader";

function Register() {
  document.title = "TMS • Sign Up";
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [registerStatus, setRegisterStatus] = useState<any>("not-registered");

  const retryRegister =()=>{
    setRegisterFormData(emptyState)
    setRegisterStatus("not-registered")
  }

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    // Clear the timeout if the component unmounts or if there's a new error
    return () => clearTimeout(timer);
  }, [error]);

  const emptyState = {
    firstName: "",
    lastName: "",
    username: "",
    role: "",
    dateOfBirth: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const [registerFormData, setRegisterFormData]: any = useState<any>({
    firstName: "",
    lastName: "",
    username: "",
    role: "",
    dateOfBirth: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleInputChange = (e: any) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const validateBeforeSubmit = () => {
    console.log(registerFormData);

    if (
      !registerFormData.firstName ||
      !registerFormData.lastName ||
      !registerFormData.username ||
      !registerFormData.role ||
      !registerFormData.dateOfBirth ||
      !registerFormData.email ||
      !registerFormData.password ||
      !registerFormData.cpassword
    ) {
      setError("All fields are required");
      return false;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerFormData.email)) {
      setError("Invalid email format");
      return false;
    }

    if (registerFormData.password !== registerFormData.cpassword) {
      setError("Passwords do not match");
      return false;
    }

    const currentDate = new Date();
    const birthDate = new Date(registerFormData.dateOfBirth);
    const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the person is above 18
    if (ageDifference < 18) {
      setError("Age must be 18 or above");
      return false;
    }
    // Add more validation logic based on your requirements

    setError(null); // Reset error if validation passes
    return true;
  };

  const handleSubmit = async () => {

    // Add your validation logic here
    if (validateBeforeSubmit()) {
      setRegisterStatus("register-loading");
      // Perform registration logic here call API
      console.log("Perform registration logic");
      await registerUser(registerFormData)
        .then((res: any) => {
          console.log("Response : ", res);
          setRegisterStatus("register-success");
          navigate("/login");
        })
        .catch((err: any) => {
          console.log("Error : ", err);
          setRegisterStatus("register-failure");
        });
      setRegisterFormData(emptyState);
    } else {
      // Display error message
      console.error("Validation failed. Display error message.");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center py-1   mx-auto  w-[500px] ">
        <div className="flex justify-center h-[180px] ">
          <Logo size={"0.6"} color={colors.C11} />
        </div>

        {registerStatus === "not-registered" ? (
          <>
            <div className="flex flex-col gap-2 p-2 py-5 ">
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  className="flex-1
              bg-C44 rounded-[8px] p-2 h-[46px] text-[14px]"
                  placeholder="First Name"
                  name="firstName"
                  id="firstName"
                  value={registerFormData.firstName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="flex-1 bg-C44 rounded-[8px] p-2 h-[46px] text-[14px]"
                  placeholder="Last Name"
                  name="lastName"
                  id="lastName"
                  value={registerFormData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <input
                type="text"
                className="bg-C44 rounded-[8px] p-2 h-[46px] text-[14px]"
                placeholder="Username"
                name="username"
                id="username"
                value={registerFormData.username}
                onChange={handleInputChange}
              />
              <div className="flex flex-row justify-between gap-2">
                <input
                  type="text"
                  className="bg-C44 rounded-[8px] p-2 h-[46px] text-[14px]"
                  placeholder="Role"
                  name="role"
                  id="role"
                  value={registerFormData.role}
                  onChange={handleInputChange}
                />

                <input
                  className="flex-1 bg-C44 rounded-[8px] p-2 h-[46px] text-[14px] cursor-pointer"
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={registerFormData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <input
                type="text"
                className="bg-C44 rounded-[8px] p-2 h-[46px] text-[14px]"
                placeholder="Email"
                name="email"
                id="email"
                value={registerFormData.email}
                onChange={handleInputChange}
              />

              <div className="bg-C44 rounded-[8px]  h-[46px] flex flex-row items-center justify-between focus-within:outline focus-within:outline-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className=" text-[14px] flex-1 bg-C44 focus:outline-none rounded-[8px] p-2 h-[46px]"
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={registerFormData.password}
                  onChange={handleInputChange}
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-2 cursor-pointer rounded-full p-1 transition hover:bg-[#00000011]"
                >
                  {showPassword ? (
                    <VisibilityOff
                      fontSize="small"
                      sx={{ color: colors.C11 }}
                    />
                  ) : (
                    <Visibility fontSize="small" sx={{ color: colors.C11 }} />
                  )}
                </div>
              </div>
              <input
                type="password"
                className="bg-C44 rounded-[8px] p-2 h-[46px] text-[14px] focus:outline-none"
                placeholder="Confirm Password"
                name="cpassword"
                id="cpassword"
                value={registerFormData.cpassword}
                onChange={handleInputChange}
              />

              {error ? (
                // Section to implement the logic for validation
                <ErrorBox message={error} />
              ) : null}
            </div>
            <div className="flex justify-center w-full ">
              <button
                onClick={handleSubmit}
                className={`bg-C11 hover:bg-[#012B39] rounded-[8px] text-C55 font-bold text-[14px] py-4 px-10 `}
              >
                Sign Up
              </button>
            </div>
            <Link to={"/login"}>
              <div
                className={`text-[11px] text-C22 cursor-pointer  text-center py-2`}
              >
                Already Have an Account? Login
              </div>
            </Link>
          </>
        ) : registerStatus === "register-success" ? (
          <div className="mt-20">
            <APIResponseStatus
              status={true}
              message={"User Registered Successfully"}
            />
             <div className="flex justify-center gap-4 mt-10">
              <button
                className={` hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}
                onClick={retryRegister}
              >
                Register Again
              </button>
              <button
                onClick={() => navigate("/login")}
                className={`hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}
              >
                Go To Login
              </button>
            </div>
          </div>
        ) : registerStatus === "register-failure" ? (
          <div className="mt-20">
            <APIResponseStatus
              status={false}
              message={"User Registration Failed"}
            />
             <div className="flex justify-center gap-4 mt-10">
              <button
                className={` hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}
                onClick={retryRegister}
              >
                Try Again ?
              </button>
            </div>
          </div>
        ) : registerStatus === "register-loading" ? (
          <div className="flex justify-center ">
            <MagicLoader message={"Registering..."}/>
          </div>
         
        ) : null}
      </div>
    </>
  );
}

export default Register;
