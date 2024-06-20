import React, { useEffect, useRef, useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import CollapseBlock from "../dashboard/CollapseBlockLeft/collapseblockleft";
import CollapseBlockRight from "../dashboard/collapseblockright/collapseblockright";
import CustomSvg from "../svgs/CustomSvg";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../apiRequests/requestApi";

const EnterPin = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);
  const goToWaitingRoom = () => navigateTo("/games/waiting-room");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move to the next input field if the current one is filled
    if (element.nextSibling && element.value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const submit = async () => {
    const lobbycode = otp.join("");
    console.log(lobbycode);
    const details = {
      lobbycode,
    };
    try {
      const response = await postRequest({ url: "/join-lobby", data: details });

      const { message, success } = response;

      if (success) {
        goToWaitingRoom();
        return;
      }

      alert(message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4 pb-3">
        {otp.map((data, index) => {
          return (
            <input
              type="text"
              name="otp"
              maxLength="1"
              key={index}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="email-verify-input p-3 col-lg-2 col-md-2 col-2 text-center font-family-source-sans txt-FFF medium-txt"
            />
          );
        })}
      </div>

      <button
        onClick={submit}
        className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-5"
      >
        <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
          Enter
        </p>
        <div className="m-0 p-0 mx-2 d-flex align-items-center">
          <CustomSvg name={"arrow-right"} />
        </div>
      </button>

      <div>
        <p className="p-0 m-0 opacity-_8 text-center letter-spacing-_22 line-height-30 font-weight-300 small-txt txt-FFF font-family-poppins">
          Didn’t receive email? <br /> You can resend code in{" "}
          <span className="txt-BD3193">55s</span>
        </p>
      </div>
    </div>
  );
};

const ScanQrCode = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);
  const goToWaitingRoom = () => navigateTo("/games/waiting-room");

  return (
    <div>
      <div className="mb-4 pb-3 d-flex align-items-center justify-content-center">
        <CustomSvg name="qrCode" />
      </div>
      <button
        onClick={goToWaitingRoom}
        className="w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-4"
      >
        <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
          Enter
        </p>
        <div className="m-0 p-0 mx-2 d-flex align-items-center">
          <CustomSvg name={"arrow-right"} />
        </div>
      </button>
      <div>
        <p className="p-0 px-2 m-0 opacity-_8 text-center letter-spacing-_22 line-height-30 font-weight-300 small-txt txt-FFF font-family-poppins">
          QR Code are unique and different for each competition, you can invite
          your friends to join the competition
        </p>
      </div>
    </div>
  );
};

export default function JoinLobby() {
  const [activeRoute, setActiveRoute] = useState("enterPin");
  const [isLeftBlockOpen, setIsLeftBlockOpen] = useState(true);
  const [isRightBlockOpen, setIsRightBlockOpen] = useState(true);
  const [blocksOpen, setBlocksOpen] = useState("both");

  useEffect(() => {
    if (isLeftBlockOpen && isRightBlockOpen) {
      setBlocksOpen("both");
    }

    if (!isLeftBlockOpen && !isRightBlockOpen) {
      setBlocksOpen("none");
    }

    if (
      (!isLeftBlockOpen && isRightBlockOpen) ||
      (isLeftBlockOpen && !isRightBlockOpen)
    ) {
      setBlocksOpen("one");
    }
  }, [isLeftBlockOpen, isRightBlockOpen]);

  const routeToEnterPin = () => setActiveRoute("enterPin");
  const routeToQrCode = () => setActiveRoute("qrCode");

  return (
    <div style={{ minHeight: "100vh" }} className="dashboard">
      <DashboardHeader />

      <div className="d-lg-flex d-md-flex d-block mt-lg-4 mt-md-4 mt-4 px-lg-4 px-md-4 px-4 justify-content-between align-items-start herogeneral">
        <div className="d-lg-none d-md-none d-flex align-items-center justify-content-between mb-2">
          <div className="col-lg-2">
            <CollapseBlock isSmallScreen={true} />
          </div>
          <div className="col-lg-2">
            <CollapseBlockRight isSmallScreen={true} />
          </div>
        </div>

        <div
          className={`${
            isLeftBlockOpen ? "col-lg-2 col-md-2" : "col-lg-1 col-md-1"
          } d-lg-flex d-md-flex d-none`}
        >
          <CollapseBlock setIsLeftBlockOpen={setIsLeftBlockOpen} />
        </div>

        <div
          className={`${
            blocksOpen === "both"
              ? "col-lg-8 col-md-8"
              : blocksOpen === "one"
              ? "col-lg-9 col-md-9"
              : blocksOpen === "none"
              ? "col-lg-10 col-md-10"
              : ""
          } col-auto px-lg-4 px-md-4 px-0`}
        >
          <h1 className="m-0 p-0 mb-3 font-weight-700 font-family-quantico txt-large txt-FFF">
            Join <span className="create-lobby-title-span">Lobby</span>
          </h1>
          <p className="m-0 p-0 mb-4 regular-txt font-weight-300 font-family-poppins txt-FFF opacity-_7">
            We’ve sent the pin to your email address. Check your email and enter
            the pin below
          </p>

          <div className="d-lg-flex d-md-flex d-block col-lg-12 w-100 align-items-center justify-content-between mb-5">
            <div
              onClick={routeToEnterPin}
              className={`${
                activeRoute === "enterPin"
                  ? "bg-BD3193"
                  : "bg-transparent join-lobby-inactive-route"
              } clickable col-lg-5 col-md-5 col-12 p-3 mb-lg-0 mb-md-0 mb-4`}
            >
              <p className="m-0 p-0 text-center txt-FFF font-weight-500 regular-txt font-family-poppins">
                Enter Pin
              </p>
            </div>
            <div
              onClick={routeToQrCode}
              className={`${
                activeRoute === "qrCode"
                  ? "bg-BD3193"
                  : "bg-transparent join-lobby-inactive-route"
              } clickable col-lg-5 col-md-5 col-12 p-3`}
            >
              <p className="m-0 p-0 text-center txt-FFF font-weight-500 regular-txt font-family-poppins">
                Scan QR Code
              </p>
            </div>
          </div>

          {activeRoute === "enterPin" && <EnterPin />}
          {activeRoute === "qrCode" && <ScanQrCode />}
        </div>

        <div
          className={`${
            isRightBlockOpen ? "col-lg-2 col-md-2" : "col-lg-1 col-md-1"
          } d-lg-flex d-md-flex d-none align-items-center justify-content-end`}
        >
          <div className="">
            <CollapseBlockRight setIsRightBlockOpen={setIsRightBlockOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}
