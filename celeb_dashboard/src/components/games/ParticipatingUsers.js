import React, { useEffect, useRef, useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import CollapseBlock from "../dashboard/CollapseBlockLeft/collapseblockleft";
import CollapseBlockRight from "../dashboard/collapseblockright/collapseblockright";
import { CSSTransition } from "react-transition-group";
import CustomSvg from "../svgs/CustomSvg";
import { allUsers } from "./auxiliary/gamesAux";
import ActiveUsers from "./ActiveUsers";
import ShareModal from "./auxiliary/ShareModal";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

export default function ParticipatingUsers() {
  const navigate = useNavigate();
  const navigateTo = (path, data) => navigate(path, { state: data });
  const goToWaitingRoom = () =>
    navigateTo(`/games/waiting-room/${gameId}`, {
      reRoutePath: `/tournaments/play/user-pairing/${gameId}`,
    });

  const params = useParams();
  const { gameId } = params;

  const activeUsersNodeRef = useRef(null);

  const [isLeftBlockOpen, setIsLeftBlockOpen] = useState(true);
  const [isRightBlockOpen, setIsRightBlockOpen] = useState(true);
  const [blocksOpen, setBlocksOpen] = useState("both");
  const [showParticipatingUsers, setShowParticipatingUsers] = useState(true);
  const [showActiveUsers, setShowActiveUsers] = useState(false);
  const [shareModal, setShareModal] = useState({
    visible: false,
    onHide: null,
    size: "md",
  });

  const openActiveUsers = () => setShowActiveUsers(true);
  const hideActiveUsers = () => setShowActiveUsers(false);

  const openShareModal = () =>
    setShareModal({ visible: true, onHide: hideShareModal, size: "md" });
  const hideShareModal = () =>
    setShareModal({ visible: false, onHide: null, size: "md" });

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

  const displayParticipatingUsers = [...allUsers, ...allUsers, ...allUsers].map(
    (user, i) => {
      const { wins, name, profile, bgClass } = user;

      return (
        <div key={i} className={`mb-4`}>
          <div className={`${bgClass} p-3 rounded-circle mb-2`}>
            <img src={profile} alt="" />
          </div>
          <h5 className="m-0 p-0 mb-1 text-center txt-FFF small-txt font-weight-600 font-family-poppins">
            {name}
          </h5>
          <p className="m-0 p-0 text-center txt-EAD3AB extra-small-txt font-weight-300 font-family-poppins">
            {wins} wins
          </p>
        </div>
      );
    }
  );

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="dashboard font-family-poppins"
    >
      <DashboardHeader />
      <div className="d-lg-flex d-md-flex d-block mt-lg-4 mt-md-4 mt-2 px-lg-4 px-md-4 px-2 justify-content-between align-items-start herogeneral">
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
          <div>
            {showParticipatingUsers && (
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h1 className="m-0 p-0 font-weight-700 font-family-quantico txt-large txt-FFF">
                    Participating <span className="txt-73CD02">Users</span>
                  </h1>
                  <div className="clickable" onClick={openActiveUsers}>
                    <CustomSvg name={"share-2"} />
                  </div>
                </div>

                <div className="d-flex align-items-center flex-wrap justify-content-between mb-5 px-lg-0 px-md-0 px-4">
                  {displayParticipatingUsers}
                </div>

                <button
                  onClick={goToWaitingRoom}
                  className="w-100 bg-EAD3AB d-flex align-items-center justify-content-center p-2 mb-5"
                >
                  <p className="p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1">
                    Continue
                  </p>
                  <div className="m-0 p-0 mx-2 d-flex align-items-center">
                    <CustomSvg name={"arrow-right"} color="#000" />
                  </div>
                </button>
              </div>
            )}

            <CSSTransition
              in={showActiveUsers}
              timeout={300}
              classNames="alert"
              unmountOnExit
              nodeRef={activeUsersNodeRef}
              onEnter={() => setShowParticipatingUsers(false)}
              onExited={() => setShowParticipatingUsers(true)}
            >
              <div ref={activeUsersNodeRef} className="w-100">
                <div className="d-flex align-items-center justify-content-start">
                  <button
                    onClick={hideActiveUsers}
                    className="px-5 bg-transparent create-lobby-join-btn d-flex align-items-center justify-content-center p-2 mb-5"
                  >
                    <div className="m-0 p-0 mx-1 d-flex align-items-center">
                      <IoArrowBackSharp size={20} color="#fff" />
                    </div>
                    <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
                      Back
                    </p>
                  </button>
                </div>

                <ActiveUsers btnTxt={"Select"} btnFunc={openShareModal} />
              </div>
            </CSSTransition>
          </div>
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

      <ShareModal modalProps={shareModal} />
    </div>
  );
}
