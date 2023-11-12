import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { find } from "lodash";
import { usePostContext } from "../../context/PostContext";
import moment from "moment";
import "moment-timezone";

const Modal = () => {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Africa/Abidjan");
  const [currentTime, setCurrentTime] = useState("");
  const [paused, setPaused] = useState(false);
  const [pausedTime, setPausedTime] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useAppContext();
  const { postState } = usePostContext();

  // Country API
  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // TimeZone API
  useEffect(() => {
    const updateClock = () => {
      if (!paused) {
        fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
          .then((response) => response.json())
          .then((data) => {
            const time = data.datetime;
            const formattedTime = moment(time)
              .tz(selectedCountry)
              .format("HH:mm:ss");
              setCurrentTime(formattedTime);
          });
        //filter datetime for only time
      }
    };

    if (!pausedTime) {
      updateClock();
      const intervalId = setInterval(updateClock, 1000);
      return () => clearInterval(intervalId);
    }
  }, [selectedCountry, paused, pausedTime]);

  const handlePauseToggle = () => {
    if (!paused) {
      setPausedTime(currentTime);
    } else {
      setPausedTime(null);
    }
    setPaused((prevIsPaused) => !prevIsPaused);
  };

  const userData = find(state, (data) => data?.id == id);
  const userPostData = postState.filter((data) => data?.userId == id);

  const goBack = () => {
    navigate(`/`);
  };

  return (
    <div className="flex justify-center items-center m-[0 auto] h-full">
      <div className="modal-container w-full">
        <div className="modal-header flex items-center justify-between mx-4">
          <div className="back-button" onClick={() => goBack()}>
            <ArrowBackIcon />
          </div>
          <div className="header-right-content p-2 flex items-center gap-4">
            <div className="select-country flex gap-2 flex-col">
              <label htmlFor="country" className="text-sm">
                Select Country
              </label>
              <select
                name="country"
                id="country"
                className="w-[130px] p-1 text-sm"
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                }}
              >
                {country.map((list, index) => (
                  <option key={index} value={list}>
                    {list}
                  </option>
                ))}
              </select>
            </div>

            {selectedCountry ? (
              <div>
                <div id="clock">{currentTime}</div>
                <div className="buttons flex gap-4">
                  <button
                    className="pause bg-black text-white px-2 cursor-pointer hover:text-gray-300"
                    onClick={handlePauseToggle}
                  >
                    {paused ? "Start" : "Pause"}
                  </button>
                </div>
              </div>
            ) : (
              <p>Select Country to load time</p>
            )}
          </div>
        </div>
        <div className="modal-body-content flex justify-center flex-col mx-10">
          <h1 className="text-2xl">Profile Page</h1>
          <div className="card flex rounded-sm flex-col sm:flex-row justify-between">
            <div className=" sm:mb-0">
              <p className="sm:mb-0">Name:{userData?.name}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <p className="sm:mb-0">Username: {userData?.username}</p>
                <p>Catch Phrase: {userData?.company?.catchPhrase}</p>
              </div>
            </div>
            <div>
              <p>Address:{userData?.address?.street}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <p>Email:{userData?.email}</p>
                <p>Phone: {userData?.phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-post-container pl-0 sm:pl-[15rem]">
          <div className="flex gap-4 flex-wrap m-10 ">
            {userPostData?.map((post, index) => (
              <div
                key={index}
                className="bg-slate-400 w-full sm:w-1/2 md:w-1/4 p-4"
              >
                <p className="text-xl">Post Title: {post.title}</p>
                <p>Content: {post.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
