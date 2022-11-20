import "./hotel.css";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../components/context/SearchContext";
import { AuthContext } from "../../components/context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    `http://localhost:8800/hotels/find/${id}`
  );

  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    console.log("handleClick... user: ", user);
    if (user) {
      // 로그인이 되어있다면 모달 오픈
      setOpenModal(true);
    } else {
      // 예약했을 때, 로그인이 안되어있다면 로그인 페이지로 이동
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>
              지금 예약
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              중심부에서 {data.distance}m - 최고의 위치
            </span>
            <span className="hotelPriceHighlight">
              이 숙소에서 ${data.cheapestPrice} 이상 숙박을 예약하고 무료 공항
              택시를 받으세요
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, index) => (
                <div className="hotelImgWrapper" key={index}>
                  <img
                    onClick={() => handleOpen(index)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>{days}일 숙박에 최적</h1>
                <span>
                  커플들이 선호하는 지역 — 커플 투숙에 평점 9.3점을
                  획득하였습니다
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}박
                  기준)
                </h2>
                <button onClick={handleClick}>지금 예약</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
