import React, { useEffect, useState } from "react";
import userProfile1 from "../../assets/images/userProfile1.png";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import UserProfileNav from "./UserProfileNav";
import { MdEdit } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import CustomSvg from "../svgs/CustomSvg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/hooks";
import { getUserDetails } from "../apiRequests/requestApi";
import { formatDateString } from "../../utils";

// const user = {
//   name: "SteshaCr",
//   wins: 230,
//   profile: userProfile1,
//   bgClass: "bg-FD8D84",
//   category: "wins",
//   email: "steshacr@gmail.com",
//   country: "Nigeria",
//   favGame: "Chess",
//   bio: `I'm SteshaCr, hailing from Lagos, Nigeria, where I've carved a niche for myself in the gaming world. My journey began with a love for strategic classics like Chess and Ludo, which not only honed my tactical abilities but also opened doors to a vibrant, global gaming community. As I climbed the ranks in local tournaments, my belief in gaming as a bridge between cultures has only strengthened. I'm committed to mastering my skills further and making an impact in Nigeria's competitive gaming landscape.`,
// };

const ad = {
  _id: "664a055c8abcfe371430a5d1",
  username: "mr. cameroon",
  email: "onuadaalfred1@gmail.com",
  emailIsVerified: true,
  dob: "1990-10-05T23:00:00.000Z",
  phoneNumber: "08148935069",
  phoneNumberIsVerified: false,
  govermentIDIsVerified: false,
  twoFactorAuthenticationEnabled: false,
  walletBalance: 185000,
  createdAt: "2024-05-19T13:57:48.191Z",
  __v: 0,
  notificationPreferences: {
    pushNotification: true,
    email: false,
  },
  avatar:
    "http://res.cloudinary.com/drrgoiiac/image/upload/v1716153695/skyboard_profile/ebh1mvfdlf1ibgkwevji.jpg",
  bio: "Steady grinding💪🏽",
  bgClass: "bg-FD8D84",

  country: "Nigeria",
};
export default function EditProfile() {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const goToSelectAvatar = () => navigateTo(`/user-profile/select-avatar`);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleEditMode = () => setIsEditting((prev) => !prev);

  const { getUser, user, setUserDetails, loading } = useUser();

  useEffect(() => {
    const get = async () => {
      try {
        const response = await getUser();
        console.log(response);
        const result = {
          ...response,
          dob: formatDateString(response?.dob, "short"),
          bgClass: "bg-FD8D84",
          // profile: userProfile1,
          country: "Nigeria",
        };
        console.log(result);
        console.log(result?.avatar);
        setUserDetails(result);
      } catch (error) {
        console.log(error);
      }
    };
    if (!user.username) {
      get();
    }
  }, []);

  const { bgClass, username, avatar, country, email, bio, phoneNumber, dob } =
    user;

  return (
    <>
      <div className="dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2">
        <div className="d-lg-flex d-md-flex d-block align-items-center justify-content-between mb-5">
          <div className="d-flex align-items-center">
            <div>
              <div
                className={`${bgClass} user-profile-edit-profile-img-container rounded-circle d-flex flex-column align-items-center justify-content-center p-1`}
              >
                <img
                  src={avatar}
                  alt="Avatar"
                  width={100}
                  style={{ borderRadius: 30 }}
                />
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <div
                  onClick={goToSelectAvatar}
                  className="user-profile-edit-profile-profile-edit-icon p-2 clickable rounded-circle bg-FFF"
                >
                  <MdEdit size={20} color="#BD3193" />
                </div>
              </div>
            </div>
            <div className="mx-2">
              <h5 className="m-0 mb-1 p-0 txt-FFF font-family-poppins font-weight-600 regular-txt">
                {loading ? "Not Available" : username}
              </h5>
              <p className="m-0 p-0 txt-FFF opacity-_7 small-txt font-family-poppins font-weight-300">
                {country ?? "Country not assigned yet"}
              </p>
            </div>
          </div>
          <div
            onClick={toggleEditMode}
            className="d-flex align-items-center justify-content-lg-center justify-content-md-center justify-content-end clickable"
          >
            <p className="m-0 p-0 font-family-poppins txt-small font-weight-400 txt-BD3193 text-capitalize">
              {isEditting ? "revert setUserDetailss" : "edit profile"}
            </p>
            <div className="mx-2">
              <CustomSvg name="arrow-right" color="#BD3193" />
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-start justify-content-lg-between justify-content-md-between justify-content-center mb-4">
          <div className="col-lg-5 col-md-5 col-12 mb-lg-0 mb-md-0 mb-4">
            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Name
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <input
                  style={{ width: "100%" }}
                  value={username}
                  contentEditable={isEditting}
                  className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Phone Number
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <input
                  style={{ width: "100%" }}
                  value={loading ? "Loading" : phoneNumber}
                  contentEditable={isEditting}
                  className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Date Of Birth
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <input
                  style={{ width: "100%" }}
                  value={dob}
                  className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Password
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <input
                  type={passwordVisible ? "text" : "password"}
                  style={{ width: "91%" }}
                  value="**************"
                  className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                />
                <div
                  style={{ width: "3%" }}
                  className="d-flex jusitfy-content-start clickable"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FiEye color="#FFFFFFB2" />
                  ) : (
                    <CustomSvg name="eye-slash" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-5 col-12 mb-lg-0 mb-md-0 mb-4">
            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Email Address
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <input
                  type="email"
                  style={{ width: "100%" }}
                  value={loading ? "Loading" : email}
                  className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">
                Bio
              </label>
              <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-2">
                <textarea
                  style={{ width: "100%", height: "37vh" }}
                  value={loading ? "Loading " : bio ?? "Not Signed in"}
                  className="p-lg-4 p-md-4 p-2 txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                />
              </div>
            </div>
          </div>
        </div>

        {isEditting && (
          <button className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-5">
            <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
              Save setUserDetailss
            </p>
            <div className="m-0 p-0 mx-2 d-flex align-items-center">
              <CustomSvg name={"arrow-right"} />
            </div>
          </button>
        )}
      </div>
    </>
  );
}
