import { Modal } from "react-bootstrap";
import CustomSvg from "../../svgs/CustomSvg";
import "../css/games.css";
import { CgCalendar } from "react-icons/cg";
import { useState } from "react";
import CustomErrorMsg from "../../CustomErrorMsg/CustomErrorMsg";
import { addOneWeekToISO, convertToISOWithGivenTime } from "../../../utils";
import { useGames } from "../../../utils/hooks";

export default function HostGameModal({
  modalProps,
  gameData,
  btnFunc,
  maxPlayers,
}) {
  const [numWinnersInput, setNumWinnersInput] = useState(1);
  const [errorMsg, setErrorMsg] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const { setMakeTournament } = useGames();

  const test = (e, set) => {
    set(e.target.value);
  };

  if (modalProps && gameData && btnFunc && maxPlayers) {
    const { onHide, visible, size } = modalProps;
    const { title } = gameData;

    const onNumWinnersInput = (e) => {
      const value = e.target.value;

      if (Number(value) < 1) {
        setErrorMsg("Cannot be less than 1");
      } else if (Number(value) >= maxPlayers) {
        setErrorMsg("Cannot have up to " + value + " winners on this game");
      } else {
        setErrorMsg();
      }
      setNumWinnersInput(Number(value));
    };

    const submit = () => {
      const iso = convertToISOWithGivenTime(date, time);

      setMakeTournament({
        gameId: gameData._id,
        endDate: iso,
        noOfWinners: Number(numWinnersInput),
        registrationDeadline: addOneWeekToISO(iso),
        name,
        noOfGamesToPlay: numWinnersInput * 2,
      });
      console.log(iso);

      onBtnClick();
    };

    const onBtnClick = () => {
      if (numWinnersInput < 1) {
        return;
      }

      if (errorMsg) {
        return;
      }

      onHide();
      btnFunc({ numWinners: numWinnersInput });
    };

    return (
      <Modal
        show={visible}
        onHide={onHide}
        size={size ? size : "sm"}
        centered={true}
      >
        <div className="py-4 px-4 mx-3">
          <div
            onClick={onHide}
            className="d-flex align-items-center justify-content-end mb-4 clickable"
          >
            <CustomSvg name="x" />
          </div>

          <h4 className="p-0 m-0 mb-5 txt-130828 text-center font-family-quantico font-weight-700 line-height-30 letter-spacing-_32 medium-txt">
            Host Game
          </h4>

          {errorMsg && <CustomErrorMsg isCentered={true} errorMsg={errorMsg} />}
          <div className="d-flex join-lobby-input align-items-center justify-content-between p-2 mb-4">
            <div style={{ width: "3%" }}>
              <CustomSvg name="emoji" />
            </div>
            <input
              type="text"
              style={{ width: "88%" }}
              placeholder="Name"
              className="txt-000 mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
              onInput={(e) => test(e, setName)}
            />
          </div>
          <div className="d-flex join-lobby-input align-items-center justify-content-between p-2 mb-4">
            <div style={{ width: "3%" }}>
              <CgCalendar color="#000" size={20} />
            </div>
            <input
              type="date"
              style={{ width: "88%" }}
              placeholder="Select date"
              className="txt-000 mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
              onInput={(e) => test(e, setDate)}
            />
          </div>

          <div className="d-flex join-lobby-input align-items-center justify-content-between p-2 mb-4">
            <div style={{ width: "3%" }}>
              <CustomSvg name="clock" />
            </div>
            <input
              type="time"
              style={{ width: "88%" }}
              placeholder="Time of Tournament"
              className="txt-000 mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
              onInput={(e) => test(e, setTime)}
            />
          </div>

          <div className="d-flex join-lobby-input align-items-center justify-content-between p-2 mb-4">
            <div style={{ width: "3%" }}>
              <CustomSvg name="selectNumber" />
            </div>
            <input
              type="number"
              value={numWinnersInput}
              onInput={onNumWinnersInput}
              style={{ width: "88%" }}
              placeholder="Number of winners"
              className="txt-000 mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico"
            />
          </div>

          <button
            onClick={submit}
            className="w-100 bg-73CD02 d-flex align-items-center justify-content-center p-2 mb-5"
          >
            <p className="p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1">
              Continue
            </p>
            <div className="m-0 p-0 mx-2 d-flex align-items-center">
              <CustomSvg name={"arrow-right"} color="#000" />
            </div>
          </button>

          <p className="m-0 p-0 txt-130828 opacity-_7 text-center regular-txt font-family-poppins font-weight-300">
            Welcome to {title}, the free new and updated version of the classic
            word game!
          </p>
        </div>
      </Modal>
    );
  }

  return <></>;
}
