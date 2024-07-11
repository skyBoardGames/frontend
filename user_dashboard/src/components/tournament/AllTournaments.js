import React, { useEffect, useState } from "react";
import "./tournament.css";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import CollapseBlockRight from "../dashboard/collapseblockright/collapseblockright";
import CollapseBlock from "../dashboard/CollapseBlockLeft/collapseblockleft";
// import SelectedUserOpponent from "../../assets/images/SelectedUserOpponent.svg";
// // import Ludotournament from '../../assets/images/Ludotournament.svg'
// import Ludotournament from "../../assets/images/Ludotournament.png";
// import VS from "../../assets/images/VS.svg";
// import SelectedUserYou from "../../assets/images/SelectedUserYou.svg";
import CustomSvg from "../svgs/CustomSvg";
// import { useParams } from "react-router-dom";
// import { allGames, allUsers } from "../games/auxiliary/gamesAux";
import { useGames } from "../../utils/hooks";
import { formatDateDash } from "../../utils";

function AllTournaments() {
  const [openGames, setOpenGames] = useState(false);
  const [tournamentvs, setTournamentvs] = useState(true);
  const [isLeftBlockOpen, setIsLeftBlockOpen] = useState(true);
  const [isRightBlockOpen, setIsRightBlockOpen] = useState(true);
  const [blocksOpen, setBlocksOpen] = useState("both");

  const { getTournaments, tournaments } = useGames();

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

  const handleopen = () => {
    setOpenGames(true);
    setTournamentvs(false);
  };

  useEffect(() => {
    const get = async () => {
      try {
        if (tournaments.length === 0) await getTournaments();
        console.log(tournaments);
      } catch (error) {
        console.log("Error reached");
        console.error(error);
        // setErrorMsg(error.message ? error.message : 'Error loading available games')
      }
    };

    get();
  }, []);

  return (
    <div className="generaltournament" style={{ minHeight: "100vh" }}>
      <DashboardHeader />
      <div className="w-100 mt-lg-4 mt-md-4 mt-4 px-lg-4 px-md-4 px-4">
        {tournamentvs && (
          <div className="w-100">
            <div className="d-lg-flex d-md-flex d-block align-items-start justify-content-between">
              <div className="d-lg-none d-md-none d-flex align-items-center justify-content-between mb-4">
                <div className="col-lg-2">
                  <CollapseBlock />
                </div>
                <div className="col-lg-2">
                  <CollapseBlockRight />
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
                <div className="selectedgeneral d-flex flex-column">
                  {/* <div className="selectedtext font-family-Quantico">
                    A list of all available tournaments will show here
                  </div> */}
                  {tournaments.length === 0 ? (
                    <div className="selectedtext font-family-Quantico">
                      A list of all available tournaments will show here
                    </div>
                  ) : (
                    tournaments.map((tournament, i) => {
                      const {
                        name,
                        gateFee,
                        registrationDeadline,
                        noOfWinners,
                      } = tournament;
                      return (
                        <div
                          className={`${
                            blocksOpen === "none"
                              ? "col-lg-3 col-md-3"
                              : blocksOpen === "one"
                              ? "col-lg-4 col-md-4"
                              : blocksOpen === "both" && "col-lg-4 col-md-4"
                          } col-12 bg-2796CE`}
                        >
                          <div
                            key={i}
                            // onClick={selectGame}
                            className={`p-3 clickable col-lg-11 col-md-11 col-12 mb-4`}
                          >
                            {/* <div className="col-lg-12 col-md-12 col-12 mb-3">
                        <img src={img} className="col-lg-12 col-md-12 col-12" alt="" />
                      </div> */}

                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h4 className="m-0 p-0 mb-3 txt-000 font-family-quantico regular-txt font-weight-700">
                                  {name} Tournament
                                </h4>
                                <p className="m-0 p-0 small-txt font-family-poppins txt-000 font-weight-300">
                                  {`Gate fee is ${gateFee / 100 ?? "0"}`}
                                </p>
                                <p className="m-0 p-0 small-txt font-family-poppins txt-000 font-weight-300">
                                  {`Registration Deadline is ${formatDateDash(
                                    registrationDeadline
                                  )}`}
                                </p>
                                <p className="m-0 p-0 small-txt font-family-poppins txt-000 font-weight-300">
                                  {`Number Of winners is ${noOfWinners}`}
                                </p>
                              </div>

                              <div className="p-2 d-flex align-items-center justify-content-center bg-000 rounded-circle">
                                <CustomSvg
                                  color="#2796CE"
                                  name="arrow-right"
                                  width={12}
                                  height={12}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div
                className={`${
                  isRightBlockOpen ? "col-lg-2 col-md-2" : "col-lg-1 col-md-1"
                } d-lg-flex d-md-flex d-none align-items-center justify-content-end`}
              >
                <div className="">
                  <CollapseBlockRight
                    setIsRightBlockOpen={setIsRightBlockOpen}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllTournaments;
