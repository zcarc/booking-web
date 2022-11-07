import "./mailList.css";

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">시간도 돈도 아끼는 일석이조의 현명한 선택!</h1>
      <span className="mailDesc">
        가입하시면 최고의 특가 정보를 보내드릴게요
      </span>
      <div className="mailInputContainer">
        <input type="text" placeholder="이메일 주소" />
        <button>구독신청</button>
      </div>
    </div>
  );
};

export default MailList;
