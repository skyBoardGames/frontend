import { Modal } from "react-bootstrap";
import CustomSvg from "../../svgs/CustomSvg";
import "../css/games.css";
import { CgCalendar } from "react-icons/cg";
import { useState } from "react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";

export default function GateFeeModal({ modalProps, openPrices }) {
  const [useFee, setUseFee] = useState("yes");

  if (modalProps) {
    const { onHide, visible, size } = modalProps;

    const toggleUseFee = () =>
      setUseFee((prev) => (prev === "yes" ? "no" : "yes"));

    const onBtnClick = () => {
      onHide();
      if (useFee === "yes" && openPrices) {
        openPrices({ isGateFee: true });
      } else {
        openPrices({ isGateFee: false });
      }
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

          <h4 className="p-0 m-0 mb-4 txt-130828 text-center font-family-quantico font-weight-700 line-height-30 letter-spacing-_32 medium-txt">
            Gate Fee
          </h4>
          <p className="m-0 mb-3 p-0 txt-130828 opacity-_7 text-center regular-txt font-family-poppins font-weight-300">
            Would you like to set a gate fee for your competition?
          </p>

          <div className="d-flex align-items-center mb-3">
            <div
              onClick={toggleUseFee}
              className="clickable d-flex align-items-center"
            >
              {useFee === "no" ? (
                <MdOutlineCheckBoxOutlineBlank color="#000" size={20} />
              ) : (
                <IoMdCheckbox color="#73CD02" size={20} />
              )}
              <p className="m-0 p-0 mx-2 txt-000 font-weight-400 font-family-poppins regular-txt">
                Yes
              </p>
            </div>

            <div
              onClick={toggleUseFee}
              className="clickable mx-4 d-flex align-items-center"
            >
              {useFee === "yes" ? (
                <MdOutlineCheckBoxOutlineBlank color="#000" size={20} />
              ) : (
                <IoMdCheckbox color="#73CD02" size={20} />
              )}
              <p className="m-0 mx-2 p-0 txt-000 font-weight-400 font-family-poppins regular-txt">
                No
              </p>
            </div>
          </div>

          <button
            onClick={onBtnClick}
            className="w-100 bg-73CD02 d-flex align-items-center justify-content-center p-2 mb-5"
          >
            <p className="p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1">
              Continue
            </p>
            <div className="m-0 p-0 mx-2 d-flex align-items-center">
              <CustomSvg name={"arrow-right"} color="#000" />
            </div>
          </button>
        </div>
      </Modal>
    );
  }

  return <></>;
}
