import React, { useEffect, useState } from "react";
import CustomSvg from "../svgs/CustomSvg";
import { useUser } from "../../utils/hooks";
import { postRequest } from "../apiRequests/requestApi";
import { useNavigate } from "react-router-dom";

export default function Help() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState();
  const [message, setMessage] = useState();

  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const goToProfile = () => navigateTo("/user-profile");
  const { user } = useUser();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjRhMDU1YzhhYmNmZTM3MTQzMGE1ZDEiLCJpYXQiOjE3MTgyODc5MDMsImV4cCI6MTcxODI4ODgwM30.UVHlxeYOQuIzzZD0ghnpiXWZvhTkgZ3s3lrKmiY9_QA";

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const submit = async () => {
    try {
      const details = {
        email,
        fullName,
        message,
      };

      console.log(details);
      const response = await postRequest({
        url: "/contact",

        data: details,
        token: token,
      });
      console.log(response);
      alert("Message Successfully delivered");
      goToProfile();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2">
      <div className="d-flex w-100 align-items-center justify-content-center">
        <div className="col-lg-10">
          <h6 className="m-0 p-0 mb-4 txt-FFF font-family-poppins opacity-_7 font-weight-500 medium-txt">
            Send us an email, we will help you
          </h6>

          <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-3">
            <div style={{ width: "3%" }}>
              <CustomSvg name="profile" />
            </div>
            <input
              style={{ width: "94%" }}
              placeholder="Enter your fullName"
              className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-4 d-flex align-items-center register-input-container justify-content-between p-3">
            <div style={{ width: "3%" }}>
              <CustomSvg name="mail" />
            </div>
            <input
              style={{ width: "94%" }}
              placeholder="Enter your email address"
              className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 d-flex align-items-start register-input-container justify-content-between p-3">
            <div style={{ width: "3%" }}>
              <CustomSvg name="mail" />
            </div>
            <textarea
              style={{ width: "94%", height: "30vh" }}
              placeholder="Enter your message"
              className="txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="w-100 mb-3">
            <button
              className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-3"
              onClick={submit}
            >
              <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
                Send
              </p>
              <div className="m-0 p-0 mx-2 d-flex align-items-center">
                <CustomSvg name={"arrow-right"} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
