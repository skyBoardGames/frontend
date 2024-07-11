import React, { useEffect, useState } from "react";
import userProfile1 from "../../assets/images/userProfile1.png";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import UserProfileNav from "./UserProfileNav";
import { MdEdit } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import CustomSvg from "../svgs/CustomSvg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/hooks";
import { formatDateString } from "../../utils";
import { patchRequest } from "../apiRequests";

export default function EditProfile() {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const goToSelectAvatar = () => navigateTo(`/user-profile/select-avatar`);

  // const { bgClass, name, profile, country } = user

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEditting, setIsEditting] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleEditMode = () => setIsEditting((prev) => !prev);

  const { getUser, user, setUserDetails, loading } = useUser();

  const [changedInputs, setChangedInputs] = useState({});

  const { bgClass, username, avatar, country, email, bio, phoneNumber, dob } =
    user;

  const [phonenum, setPhoneNumber] = useState(phoneNumber);
  const [userName, setUserName] = useState(username);
  const [biography, setBio] = useState(bio);
  const [date, setDob] = useState(dob);

  const handleChange = (e, set) => {
    const { name, value } = e.target;

    set(value);

    setChangedInputs((prevChanges) => ({
      ...prevChanges,
      [name]: value,
    }));
  };

  useEffect(() => {
    const get = async () => {
      try {
        const response = await getUser();
        console.log(response);
        const result = {
          ...response,
          dob: formatDateString(response?.dob, "short"),
          avatar: userProfile1,
          bgClass: "bg-FD8D84",
          // profile: userProfile1,
          country: "Nigeria",
        };
        console.log(result);
        setUserDetails(result);
      } catch (error) {
        console.log(error);
      }
    };
    if (!user.bgClass) {
      get();
    }
  }, []);

  const update = async () => {
    try {
      console.log("Update started ");

      console.log(changedInputs);
      const response = await patchRequest("/auth/profile", changedInputs);

      console.log(response);
      const userDetails = {
        ...user,
        ...changedInputs,
      };
      alert(response?.message);
      setUserDetails(userDetails);
      console.log(user);
      setIsEditting(!isEditting);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2">
      <div className="d-lg-flex d-md-flex d-block align-items-center justify-content-between mb-5">
        <div className="d-flex align-items-center">
          <div>
            <div
              style={{
                border: "6px solid #BD3193",
              }}
              className={`${bgClass} rounded-circle d-flex flex-column align-items-center justify-content-center p-1`}
            >
              <img
                src={avatar}
                alt=""
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
              {country ?? "No country assigned"}
            </p>
          </div>
        </div>
        <div
          onClick={toggleEditMode}
          className="d-flex align-items-center justify-content-lg-center justify-content-md-center justify-content-end clickable"
        >
          <p className="m-0 p-0 font-family-poppins txt-small font-weight-400 txt-73CD02 text-capitalize">
            {isEditting ? "revert changes" : "edit profile"}
          </p>
          <div className="mx-2">
            <CustomSvg name="arrow-right" color="#73CD02" />
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
                defaultValue={userName}
                name="username"
                // disabled={isEditting}
                disabled={!isEditting}
                className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                onChange={(e) => handleChange(e, setUserName)}
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
                defaultValue={phonenum}
                name="phoneNumber"
                disabled={!isEditting}
                className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                onChange={(e) => handleChange(e, setPhoneNumber)}
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
                defaultValue={dob ? date : ""}
                disabled={!isEditting}
                className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                onChange={(e) => setDob(e.target.value)}
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
                disabled={!isEditting}
                defaultValue="**************"
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
                defaultValue={email}
                disabled={!isEditting}
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
                defaultValue={
                  username ? biography || "Not set" : "Not Signed in"
                }
                name="bio"
                className="p-lg-4 p-md-4 p-2 txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
                disabled={!isEditting}
                onChange={(e) => handleChange(e, setBio)}
              />
            </div>
          </div>
        </div>
      </div>

      {isEditting && (
        <button
          className="w-100 bg-73CD02 d-flex align-items-center justify-content-center p-2 mb-5"
          onClick={update}
        >
          <p className="p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1">
            Save Changes
          </p>
          <div className="m-0 p-0 mx-2 d-flex align-items-center">
            <CustomSvg name={"arrow-right"} color="#000" />
          </div>
        </button>
      )}
    </div>
  );
}
