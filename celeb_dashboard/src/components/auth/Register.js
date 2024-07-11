import "./css/auth.css";
import logo from "../../assets/images/logo1.png";
import carouselImg1 from "../../assets/images/registerCarouselImg1.png";
import CustomSvg from "../svgs/CustomSvg";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Carousel } from "react-bootstrap";
import SuccessModal from "./auxiliary/SuccessModal";
import { register, SendEmailOTP } from "../apiRequests";
import { useUser } from "../../utils/hooks";
import { formatDateString } from "../../utils";

const carouselItems = [
  {
    img: carouselImg1,
    caption:
      "Play classics like Scrabble, WHOT, Chess, and Snooker with friends and family while betting to win big.",
  },
];

export default function Register({ navigateTo }) {
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [socialMediaPlatform, setSocialMediaPlatform] = useState("");
  const [socialMediaHandle, setSocialMediaHandle] = useState("");
  const { setUserDetails, user } = useUser();

  const submit = async () => {
    try {
      const details = {
        email,
        password,
        phoneNumber: phoneNumber ?? "09168963528",
        socialMediaPlatform,
        socialMediaHandle,
      };

      console.log(details);
      const response = await register(details);

      console.log(response);

      sessionStorage.setItem("token", JSON.stringify(response?.data?.tokens));
      setUserDetails({
        ...response?.data?.user,
        password: null,
        dob: formatDateString(response.data.user.dob, "short"),
      });
      openSuccessModal();

      const otpResponse = await SendEmailOTP(email);
      console.log(otpResponse);
    } catch (error) {
      console.log(error.message);
    }
  };

  const goToVerifyEmail = () => navigateTo("/email-verification");
  const goToLogin = () => navigateTo("/login");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [successModal, setSuccessModal] = useState({
    visible: false,
    onHide: null,
    size: "md",
  });

  const onFocusDobPicker = (e) => {
    e.target.type = "date";
    e.target.showPicker();
  };

  const onBlurDobPicker = (e) => {
    e.target.type = "text";
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible((prev) => !prev);

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
            Register your <span className="register-acct-txt">Account</span>
          </h1>
          <p className="m-0 p-0 small-txt txt-FFF opacity-_7 font-family-poppins font-weight-300 mb-4">
            New here! Create a new account
          </p>

          <div className="mb-3 w-100">
            <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
              <div style={{ width: "3%" }}>
                <CustomSvg name="share-2" />
              </div>
              <input
                type="text"
                style={{ width: "85%" }}
                placeholder="Select your social media platform"
                className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                onChange={(e) => setSocialMediaPlatform(e.target.value)}
              />
              <div
                style={{ width: "3%" }}
                className="d-flex jusitfy-content-start clickable"
                // onClick={togglePasswordVisibility}
              >
                <CustomSvg name="caret-down" />
              </div>
            </div>
            <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
              <div style={{ width: "3%" }}>
                <CustomSvg name="share-2" />
              </div>
              <input
                type="text"
                style={{ width: "92%" }}
                placeholder="Enter your social media handle"
                className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                onChange={(e) => setSocialMediaHandle(e.target.value)}
              />
            </div>
            <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
              <div style={{ width: "3%" }}>
                <CustomSvg name="mail" />
              </div>
              <input
                style={{ width: "92%" }}
                placeholder="Enter your email address"
                className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
              <div style={{ width: "3%" }}>
                <CustomSvg name="phone" />
              </div>
              <input
                style={{ width: "92%" }}
                placeholder="Enter your phone number"
                className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
              <div style={{ width: "3%" }}>
                <CustomSvg name="lock" />
              </div>
              <input
                type={passwordVisible ? "text" : "password"}
                style={{ width: "85%" }}
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
            <div className="d-flex align-items-center register-input-container justify-content-between p-2">
              <div style={{ width: "3%" }}>
                <CustomSvg name="lock" />
              </div>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                style={{ width: "85%" }}
                placeholder="Confirm your password"
                className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
              />
              <div
                style={{ width: "3%" }}
                className="d-flex jusitfy-content-start clickable"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? (
                  <FiEye color="#FFF" size={30} />
                ) : (
                  <FiEyeOff size={30} color="#FFF" />
                )}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-start mb-5">
            <div className="d-flex align-items-center">
              <input type="checkbox" />
              <p className="font-weight-400 small-txt txt-FFF text-start font-family-poppins m-0 p-0 mx-2">
                By checking the box you agree to our{" "}
                <span className="txt-73CD02 opacity-_7">Terms</span> and{" "}
                <span className="txt-73CD02 opacity-_7">Conditions</span>.
              </p>
            </div>
          </div>

          <div className="w-100 mb-3">
            <button
              onClick={submit}
              className="w-100 bg-73CD02 d-flex align-items-center justify-content-center p-2"
            >
              <p className="p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1">
                Register
              </p>
              <div className="m-0 p-0 mx-2 d-flex align-items-center">
                <CustomSvg
                  name={"arrow-right"}
                  color="#000"
                  width={24}
                  height={24}
                />
              </div>
            </button>
          </div>

          <div
            onClick={goToLogin}
            className="d-flex align-items-center justify-content-center"
          >
            <p className="clickable font-weight-400 small-txt txt-FFF text-start font-family-poppins m-0 p-0 mx-2">
              Already have an account?{" "}
              <span className="txt-73CD02 opacity-_7">Login</span>.
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
        redirectFunc={goToVerifyEmail}
        subTxt="Registration completed, we are redirecting you..."
      />
    </div>
  );
}
