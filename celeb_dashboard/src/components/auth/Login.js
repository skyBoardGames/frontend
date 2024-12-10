import "./css/auth.css";
import logo from "../../assets/images/logo1.png";
import carouselImg1 from "../../assets/images/registerCarouselImg1.png";
import CustomSvg from "../svgs/CustomSvg";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Carousel } from "react-bootstrap";
import SuccessModal from "./auxiliary/SuccessModal";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/hooks";
import { loginFunc } from "../apiRequests";
import { formatDateString } from "../../utils";


const carouselItems = [
  {
    img: carouselImg1,
    caption:
      "Play classics like Scrabble, WHOT, Chess, and Snooker with friends and family while betting to win big.",
  },
];

export default function Login({}) {
  const { setUserDetails } = useUser();
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const goToForgotPassword = () => navigateTo("/forgot-password");
  const goToDashboard = () => navigateTo("/");
  const goToRegister = () => navigateTo("/register");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successModal, setSuccessModal] = useState({
    visible: false,
    onHide: null,
    size: "md",
  });

  const submit = async () => {
    try {
      // const details = {
      //   email,
      //   password,
      // };

      // console.log(details);

      // const response = await loginFunc(details);
      // console.log(response);

      // if (!response.data.user.isCelebrity) {
      //   throw new Error("Is not a Celebrity");
      // }
      // setUserDetails({
      //   ...response?.data?.user,
      //   password: null,
      //   dob: formatDateString(response.data.user.dob, "short"),
      // });

      // sessionStorage.setItem("token", JSON.stringify(response?.data?.tokens));

      openSuccessModal();
    } catch (error) {
      const notCelebreityMessage = {
        message: "Invalid Credentials User is not a celebrity",
        success: false,
      };
      console.error(error?.message || notCelebreityMessage);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const openSuccessModal = () =>
    setSuccessModal({ visible: true, onHide: hideSuccessModal, size: "md" });
  const hideSuccessModal = () =>
    setSuccessModal({ visible: false, onHide: null, size: "md" });

  const displayCarouselItems = carouselItems.map((item, i) => {
    const { img, caption } = item;

    return (
      <div
        key={i}
        className="d-flex align-items-center justify-content-center flex-column py-5"
      >
        <div className="col-lg-6 d-flex align-items-center justify-content-center mb-5">
          <img src={img} className="col-lg-12" alt="" />
        </div>

        <p className="small-txt txt-F7FAFF font-weight-400 line-height-30 m-0 p-0 font-family-poppins text-center">
          {caption}
        </p>
      </div>
    );
  });

  return (
    <div className="register-bg py-4 px-lg-5 px-md-5 px-3">
      <div className="d-flex align-items-start flex-column mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="mb-0 col-lg-8 d-flex align-items-center justify-content-center">
            <img src={logo} className="col-lg-12" alt="" />
          </div>
          <h3 className="regular-txt txt-FFF m-0 p-0 text-center font-family-quantico font-weight-500">
            SkyBoard
          </h3>
        </div>
      </div>

      <div className="d-lg-flex d-md-flex d-block justify-content-between align-items-center">
        <div className="col-lg-5 col-md-12 col-12">
          <h1 className="m-0 p-0 extra-large-txt txt-FFF font-weight-500 mb-4 font-family-quantico">
            Log In to your <span className="register-acct-txt">Account</span>
          </h1>
          <p className="m-0 p-0 small-txt txt-FFF opacity-_7 font-family-poppins font-weight-300 mb-4">
            Welcome back! Select method to log in:
          </p>

          <div className="d-flex align-items-center justify-content-between mb-5">
            <div className="col-lg-6 col-md-6 col-6">
              <div className="col-lg-11 col-md-11 col-11 p-2 d-flex align-items-center justify-content-center clickable login-other-options-container">
                <div className="px-1">
                  <CustomSvg name="google" />
                </div>
                <p className="px-1 txt-FEFEFF m-0 p-0 font-family-inter small-txt font-weight-400 line-height-24">
                  Sign in with Google
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-6 d-flex align-items-center justify-content-end">
              <div className="col-lg-11 col-md-11 col-11 p-2 d-flex align-items-center justify-content-center clickable login-other-options-container">
                <div className="px-1">
                  <CustomSvg name="apple" />
                </div>
                <p className="px-1 txt-FEFEFF m-0 p-0 font-family-inter small-txt font-weight-400 line-height-24">
                  Sign in with Apple
                </p>
              </div>
            </div>
          </div>

          <div className="mb-5 py-2 d-flex align-items-center justify-content-between">
            <div className="login-or-line col-lg-5 col-md-5 col-5" />
            <p className="m-0 p-0 regular-txt font-family-poppins font-weight-300 txt-FFF opacity-_7">
              Or
            </p>
            <div className="login-or-line col-lg-5 col-md-5 col-5" />
          </div>

          <div className="mb-3 w-100">
            <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
              <div style={{ width: "3%" }}>
                <CustomSvg name="mail" />
              </div>
              <input
                style={{ width: "94%" }}
                placeholder="Enter your email address"
                className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
              <div style={{ width: "3%" }}>
                <CustomSvg name="lock" />
              </div>
              <input
                type={passwordVisible ? "text" : "password"}
                style={{ width: "88%" }}
                placeholder="Enter your password"
                className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                style={{ width: "3%" }}
                className="d-flex jusitfy-content-start clickable"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <FiEye color="#FFF" />
                ) : (
                  <FiEyeOff size={30} color="#FFF" />
                )}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mb-5">
            <div className="d-flex align-items-center">
              <input type="checkbox" />
              <p className="font-weight-400 small-txt txt-FFF text-start font-family-poppins m-0 p-0 mx-2">
                Remember me
              </p>
            </div>
            <p
              onClick={goToForgotPassword}
              className="m-0 p-0 small-txt font-family-poppins txt-BD3193 font-weight-300 clickable"
            >
              Forgot Password?
            </p>
          </div>

          <div className="w-100 mb-3">
            <button
              onClick={submit}
              className="clickable w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2"
            >
              <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
                Login
              </p>
              <div className="m-0 p-0 mx-2 d-flex align-items-center">
                <CustomSvg name={"arrow-right"} />
              </div>
            </button>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <p
              onClick={goToRegister}
              className="clickable font-weight-400 small-txt txt-FFF text-start font-family-poppins m-0 p-0 mx-2"
            >
              Don’t have an account?{" "}
              <span className="txt-BD3193 opacity-_7">Register</span>.
            </p>
          </div>
        </div>

        <div className="col-lg-6 d-lg-flex d-md-none d-none justify-content-center align-items-center">
          <div className="col-lg-10 register-carousel-container px-4 py-5">
            <Carousel controls={false}>{displayCarouselItems}</Carousel>
          </div>
        </div>
      </div>

      <SuccessModal
        modalProps={successModal}
        redirectFunc={goToDashboard}
        subTxt="Successfully logged in, we are redirecting you..."
      />
    </div>
  );
}
