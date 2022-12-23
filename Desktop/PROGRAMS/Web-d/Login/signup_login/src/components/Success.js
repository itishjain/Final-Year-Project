import React, { useState } from "react";
import "../components/App.css";
import HomePageLogo from "../images/Logo.png";
import chatLogo from "../images/chatIcon1.png";
import chatBotLogo from "../images/chatBotImage.png";

const Success = () => {
  const [style, setStyle] = useState("BotCircle");

  const shapeChange = () => {
    setStyle("BotCircleTransform");
  };

  // const Hide=()=>{
  //   setStyle("")
  // }

  return (
    <div>
      <div className="iconHome">
        <img src={HomePageLogo} width="200px" alt="Home Page Logo" />
      </div>
      <div className="homeNavbar">
        <div className="Chats">
          <a href="https://chat-champ.web.app/">
            <img src={chatLogo} alt="Chat icon" />
          </a>
        </div>
      </div>
      <div className="Main_afterlogin">
        <div className="side_content">
          This page is under construction.
          <br />
          See you in next presentation.
        </div>
      </div>
      <div className={style} onClick={shapeChange}>
        <img src={chatBotLogo} className="botLogo" alt="Chat icon" />
      </div>
    </div>
  );
};

export default Success;
