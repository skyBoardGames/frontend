import "./css/games.css";
import CustomSvg from "../svgs/CustomSvg";
import { IoArrowBackSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import JoinLobbyModal from "./auxiliary/JoinLobbyModal";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import { CSSTransition } from "react-transition-group";
import ActiveUsers from "./ActiveUsers";
import AmountPicker from "../payments/auxiliary/AmountPicker";
import CollapseBlock from "../dashboard/CollapseBlockLeft/collapseblockleft";
import CollapseBlockRight from "../dashboard/collapseblockright/collapseblockright";
import { useNavigate, useParams } from "react-router-dom";
import { allGames } from "./auxiliary/gamesAux";
import HostGameModal from "./auxiliary/HostGameModal";
import GateFeeModal from "./auxiliary/GateFeeModal";
import SuccessModal from "../auth/auxiliary/SuccessModal";
import { useGames } from "../../utils/hooks";
import { postRequest } from "../apiRequests";

export default function SelectedGame() {
  const navigate = useNavigate();
  const navigateTo = (path, data) => navigate(path, { state: data });
  const goToTournaments = (data) =>
    navigateTo(`/tournaments/play/${gameId}`, data);
  const goToCreateLobby = () => navigateTo(`/games/create-lobby/${gameId}`);
  const goToTournament = () => navigateTo(`/tournaments`);

  const params = useParams();
  const { gameId } = params;

  const stakesNodeRef = useRef(null);

  const [showBtns, setShowBtns] = useState(true);
  const [showPrices, setShowPrices] = useState(false);
  const [hostGameModal, setHostGameModal] = useState({
    visible: false,
    onHide: null,
    size: "md",
  });
  const [gateFeeModal, setGateFeeModal] = useState({
    visible: false,
    onHide: null,
    size: "md",
  });
  const [isLeftBlockOpen, setIsLeftBlockOpen] = useState(true);
  const [isRightBlockOpen, setIsRightBlockOpen] = useState(true);
  const [blocksOpen, setBlocksOpen] = useState("both");
  const [gateFee, setGateFee] = useState({ fee: null, isGateFee: true });
  //   const []
  const [winnersCount, setWinnersCount] = useState(0);
  const [winnersPrices, setWinnersPrices] = useState([
    { price: null, position: 1 },
  ]);
  const [successModal, setSuccessModal] = useState({
    visible: false,
    onHide: null,
    size: "md",
  });
  const { games, getGames, loading, makeTournament, setMakeTournament } =
    useGames();

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

  useEffect(() => {
    let shouldReRoute = true;
    for (let i = 0; i < winnersPrices.length; i++) {
      if (winnersPrices[i].price == null) {
        shouldReRoute = false;
        break;
      }
    }

    if (shouldReRoute) {
      const create = async () => {
        try {
          const response = await postRequest(`/celebrity/tournaments`);
          const { success } = response?.data;
          alert(`It was ${success ? "successful" : "Not Successfulz"}`);
        } catch (error) {
          console.error(error);
        } finally {
          setMakeTournament(null);
          goToTournament();
        }
      };

      create();
    }
  }, [winnersPrices]);

  useEffect(() => {
    // setErrorMsg(null)

    const get = async () => {
      try {
        if (games.length === 0) await getGames();
        console.log(games);
      } catch (error) {
        console.log("Error reached");
        console.error(error);
        // setErrorMsg(error.message ? error.message : 'Error loading available games')
      }
    };

    get();
  }, []);
  const openPrices = ({ isGateFee }) => {
    setShowPrices(true);
    setGateFee({ isGateFee, fee: null });
  };
  const hidePrices = () => {
    setShowPrices(false);
    setWinnersPrices([{ price: null, position: 1 }]);
    setWinnersCount(0);
  };
  const openHostGameModal = () =>
    setHostGameModal({ visible: true, onHide: hideHostGameModal, size: "md" });

  const hideHostGameModal = () =>
    setHostGameModal({ visible: false, onHide: null, size: "md" });

  const openGateFeeModal = ({ numWinners }) => {
    setGateFeeModal({ visible: true, onHide: hideGateFeeModal, size: "md" });
    setWinnersCount(numWinners);
  };
  const hideGateFeeModal = () =>
    setGateFeeModal({ visible: false, onHide: null, size: "md" });

  const openSuccessModal = () =>
    setSuccessModal({ visible: true, onHide: hideSuccessModal, size: "md" });
  const hideSuccessModal = () =>
    setSuccessModal({ visible: false, onHide: null, size: "md" });

  const onSelectGateFee = (fee) => {
    console.log("woriking");

    openSuccessModal();
    setGateFee({ isGateFee: true, fee });
  };

  const displayPrices = () => hideSuccessModal();

  if (gameId) {
    const selectedGame = games.filter((game) => game.id === gameId);
    const {
      id,
      bgClass,
      img,
      title,
      caption,
      text,
      splitTitle1,
      splitTitle2,
      maxPlayers,
    } = selectedGame[0];

    const displayWinnersPrices = Array.from(Array(winnersCount).keys()).map(
      (el, i) => {
        const winnerPosition = i + 1;

        const btnFunc = (price) => {
          let positionPresent = false;

          const newArray = {
            ...makeTournament,
            gateFee: gateFee.fee ? gateFee.fee * 100 : null,
            hasGateFee: gateFee.fee ? true : false,
          };
          setMakeTournament(newArray);

          for (let i = 0; i < winnersPrices.length; i++) {
            if (winnersPrices[i].position == winnerPosition) {
              positionPresent = true;
            }
          }

          if (positionPresent) {
            const updatedWinnersPrices = winnersPrices.map((winner) => {
              if (winner.position == winnerPosition) {
                winner.price = price;
              }

              return winner;
            });

            if (winnersCount == updatedWinnersPrices.length) {
              setWinnersPrices(updatedWinnersPrices);
            } else {
              setWinnersPrices([
                ...updatedWinnersPrices,
                { price: null, position: winnerPosition + 1 },
              ]);
            }
          } else {
            const newPosition = { position: winnerPosition, price };
            const updatedWinnersPrices = [...winnersPrices, newPosition];
            setWinnersPrices(updatedWinnersPrices);
          }
        };

        return (
          <div
            key={i}
            className="mb-4"
            style={{
              display:
                winnersPrices.length == winnerPosition ? "block" : "none",
            }}
          >
            <h1 className="m-0 p-0 mb-3 font-weight-700 font-family-quantico txt-large txt-FFF">
              Set{" "}
              <span className="txt-73CD02">{winnerPosition}-Place Price</span>
            </h1>
            <p className="m-0 p-0 mb-4 regular-txt font-weight-300 font-family-poppins txt-FFF">
              Select Winning Amount
            </p>
            <AmountPicker
              btnTxt={"Continue"}
              minAmount={5000}
              maxAmount={25000}
              btnFunc={btnFunc}
              subTxt={"Winning price is 5k upwards "}
            />
          </div>
        );
      }
    );

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
            <div>
              <div className="d-flex align-items-center justify-content-stretch">
                <div className="w-100">
                  <div className="d-flex align-items-center justify-content-center create-lobby-bg col-lg-12 col-md-12 col-12 mb-3">
                    <img
                      src={img}
                      className="col-lg-12 col-md-12 col-12"
                      alt=""
                    />
                  </div>

                  {winnersCount === 0 && (
                    <h1 className="m-0 p-0 mb-3 font-weight-700 font-family-quantico txt-large txt-FFF">
                      {splitTitle1}{" "}
                      <span className="txt-73CD02">{splitTitle2}</span>
                    </h1>
                  )}

                  {showBtns && (
                    <div>
                      <p className="m-0 p-0 mb-4 regular-txt font-weight-300 font-family-poppins txt-FFF opacity-_7">
                        {text}
                      </p>

                      <button
                        onClick={openHostGameModal}
                        className="w-100 bg-EAD3AB d-flex align-items-center justify-content-center p-2 mb-3"
                      >
                        <p className="p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1">
                          Host Game
                        </p>
                        <div className="m-0 p-0 mx-2 d-flex align-items-center">
                          <CustomSvg name={"arrow-right"} color="#000" />
                        </div>
                      </button>
                    </div>
                  )}

                  <CSSTransition
                    in={showPrices}
                    timeout={300}
                    classNames="alert"
                    unmountOnExit
                    nodeRef={stakesNodeRef}
                    onEnter={() => setShowBtns(false)}
                    onExited={() => setShowBtns(true)}
                  >
                    <div ref={stakesNodeRef} className="w-100">
                      {gateFee.isGateFee && gateFee.fee == null ? (
                        <div className="mb-4">
                          <h1 className="m-0 p-0 mb-3 font-weight-700 font-family-quantico txt-large txt-FFF">
                            Gate <span className="txt-73CD02">Fee</span>
                          </h1>
                          <p className="m-0 p-0 mb-4 regular-txt font-weight-300 font-family-poppins txt-FFF">
                            Select Gate Fee
                          </p>
                          <AmountPicker
                            btnTxt={"Continue"}
                            // value={gateFee}
                            // setValue={setGateFee}
                            minAmount={1000}
                            maxAmount={100000}
                            btnFunc={onSelectGateFee}
                            subTxt={"Gate fee is 1k upwards"}
                          />
                        </div>
                      ) : (
                        displayWinnersPrices
                      )}

                      <button
                        onClick={hidePrices}
                        className="w-100 bg-transparent create-lobby-join-btn d-flex align-items-center justify-content-center p-2 mb-5"
                      >
                        <div className="m-0 p-0 mx-1 d-flex align-items-center">
                          <IoArrowBackSharp size={20} color="#fff" />
                        </div>
                        <p className="p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1">
                          Back
                        </p>
                      </button>
                    </div>
                  </CSSTransition>
                </div>
              </div>
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

        <HostGameModal
          modalProps={hostGameModal}
          gameData={selectedGame[0]}
          btnFunc={openGateFeeModal}
          maxPlayers={maxPlayers}
        />

        <GateFeeModal modalProps={gateFeeModal} openPrices={openPrices} />

        <SuccessModal
          modalProps={successModal}
          redirectFunc={displayPrices}
          subTxt={"Gate fee successful set, we are redirecting you..."}
        />
      </div>
    );
  } else {
    return navigateTo("/");
  }
}
