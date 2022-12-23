import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/App.css";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "rsuite";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  let history = useNavigate();

  const login = async () => {
    try {
      // we need to store this await into a constant if we want to console log it

      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPwd);
      console.log(user);
      Alert.success("Login Details Verified. ^ _ ^", 3000);
      history("/Success");
    } catch (error) {
      Alert.error(error.message, 3000);
    }
  };

  const afterLogin = () => {
    login();
  };

  return (
    <div className="log">
      <form className="LoginForm" id="logform">
        <div className="WebsiteIcon"></div>
        <div className="Heading">
          <h1>Log &nbsp; In</h1>
        </div>
        <div className="fields">
          <label className="label">
            Email: <span className="required">*</span>{" "}
          </label>
          <input
            type="text"
            name="inputEmail"
            id="e_input"
            className="inputFields"
            placeholder="Enter your email here ..."
            onChange={(ev) => {
              setLoginEmail(ev.target.value);
            }}
          />
        </div>
        <div className="fields">
          <label className="label">
            Password: <span className="required">*</span>{" "}
          </label>
          <input
            type="password"
            name="inputPwd"
            id="pwd"
            className="inputFields"
            placeholder="Enter your password here ..."
            onChange={(ev) => {
              setLoginPwd(ev.target.value);
            }}
          />
        </div>

        <Link>
          <button id="loginBtn" className="btn" onClick={afterLogin}>
            Login
          </button>
        </Link>
        <div>
          Don't have an account? <Link to="/Signup">Sign Up?</Link>
        </div>
      </form>
      <div className="imageArea"></div>
    </div>
  );
};

export default Login;
