import React, { useEffect, useState } from "react";
import img1 from "../../assets/images/userProfile1.png";
import img2 from "../../assets/images/userProfile2.png";
import img3 from "../../assets/images/userProfile3.png";
import img4 from "../../assets/images/userProfile4.png";
import logo from "../../assets/images/logowithname.png";
import CustomSvg from "../svgs/CustomSvg";
import { deleteRequest, getRequest } from "../apiRequests";
import { formatDateString } from "../../utils";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const get = async () => {
      try {
        const response = await getRequest("/notifications");
        console.log(response);

        if (!response.data) {
          setNotifications(null);
        }

        const data = response.data;

        const newArray = data.map(({ image, body, createdAt, _id }) => ({
          image,
          text: body,
          date: formatDateString(createdAt, "long"),
          senderProfile: img1,
          type: "normal",
          _id,
        }));

        setNotifications(newArray);

        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    get();
  }, []);

  const deleteNotification = async (notify) => {
    try {
      const { _id } = notify;
      const response = await deleteRequest({ url: `/notification/${_id}` });

      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n._id !== _id)
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Note Alfred needs to update the notifications to include type

  const displayNotifications = notifications.map((notify, i) => {
    const { text, date, senderProfile, type } = notify;

    return (
      <div
        key={i}
        className="mb-4 d-flex align-items-start justify-content-between"
      >
        <div className="d-lg-flex d-md-flex d-block align-items-center mb-4">
          <div className="d-lg-block d-md-block d-flex align-items-center justify-content-start mb-lg-0 mb-md-0 mb-2">
            <div
              className={`${
                senderProfile === "skyBoard"
                  ? "col-lg-12"
                  : "bg-FFD2B1 rounded-circle d-flex align-items-center justify-content-center p-1"
              }`}
            >
              <img
                className={`${senderProfile === "skyBoard" && "col-lg-12"}`}
                src={senderProfile === "skyBoard" ? logo : senderProfile}
                alt="="
              />
            </div>
          </div>

          <div className="mx-lg-4 mx-md-4 mx-0 w-100">
            <h4
              className={`${
                type === "urgent" ? "txt-FF0000" : "txt-FFF"
              } m-0 p-0 mb-2 regular-txt font-family-poppins font-weight-400 opacity-_8`}
            >
              {text}
            </h4>
            <p className="m-0 p-0 txt-BD3193 font-weight-400 font-family-poppins opacity-_7 line-height-18">
              {date}
            </p>
          </div>
        </div>
        <div className="clickable" onClick={() => deleteNotification(notify)}>
          <CustomSvg name="x" color="#FFF" />
        </div>
      </div>
    );
  });

  return (
    <div className="dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2">
      {loading ? (
        <div className="txt-FFF">Retrieving transactions</div>
      ) : (
        displayNotifications ?? <div className="txt-FFF">No transactions</div>
      )}
    </div>
  );
}
