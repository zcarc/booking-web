import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">중심부에서 {item.distance}m</span>
        <span className="siTaxiOp">무료 공항 택시</span>
        <span className="siSubtitle">스튜디오 아파트 - 에어컨</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">무료 취소</span>
        <span className="siCancelOpSubtitle">
          나중에 취소 가능한 최저가를 지금 잡아놓으세요.
        </span>
      </div>
      <div className="siDetails">
        {item.rating ? (
          <div className="siRating">
            <span>우수함</span>
            <button>{item.rating}</button>
          </div>
        ) : null}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTexOp">세금 및 기타 요금 포함</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">예약 가능 옵션 보기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
