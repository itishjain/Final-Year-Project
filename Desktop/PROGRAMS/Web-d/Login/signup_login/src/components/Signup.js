import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import "../components/App.css";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "rsuite";
import validator from "validator";

const Signup = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPwd, setSignupPwd] = useState("");
  const [cnfrmPwd, setCnfrmPwd] = useState("");
  const [strongPasswordMessage, setStrongPasswordMessage] = useState("");

  // CHECK PASSWORD IS STRONG OR NOT
  const checkIfStrong = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setStrongPasswordMessage("Password is Strong 💪");
    } else {
      setStrongPasswordMessage("Password is Weak 😫");
    }
  };

  // ------------------------------------------------------------------------------------------

  // SUGGESTING A RANDOM PASSWORD
  const genPassword = () => {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 10;
    var password = "";
    for (var i = 0; i < passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    document.getElementById("suggestPassword").value = password;
  };

  // ------------------------------------------------------------------------------------------

  // REAL-TIME DATABASE IMPLEMENTATION

  let history = useNavigate();

  const [userData, setUserData] = useState({
    /*  step 2, add all the fields  */
    nameOfUser: "",
    email: "",
    phone_number: "",
    create_password: "",
    confirm_password: "",
  });

  // STORING THE POST USER DATA

  let key, value;
  const postUserData = (event) => {
    //step 5
    key = event.target.name; // step 6
    value = event.target.value;

    setUserData({ ...userData, [key]: value }); // step 6
  };

  /* 
      STEP 7
      CONNECT DATABASE TO FIREBASE
  */

  const SubmitData = async (event) => {
    window.confirm("You want to submit the details ?");

    //STEP 8
    const {
      nameOfUser,
      email,
      phone_number,
      create_password,
      confirm_password,
    } = userData;

    if (
      nameOfUser &&
      email &&
      phone_number &&
      create_password &&
      confirm_password
    ) {
      const res = await fetch(
        "https://auth-trial0001-default-rtdb.firebaseio.com/userDataRecords.json",
        // define method of content passed to database
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nameOfUser,
            email,
            phone_number,
          }),
        }
      );

      if (signupPwd === cnfrmPwd && res) {
        setUserData({
          nameOfUser: "",
          email: "",
          phone_number: "",
          create_password: "",
          confirm_password: "",
        });
        Alert.success("Data Stored", 2000);

        history("/");
      } else {
        Alert.information("Please fill the data", 3000);
      }
    } else {
      Alert.error("Field Unfilled", 3000);
    }
  };

  // ------------------------------------------------------------------------------------------

  // AUTHENTICATION PART START

  var error_occured = 0;
  const signup = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (signupPwd !== cnfrmPwd) {
      Alert.error("Password Doesn't match");
      error_occured = 1;
    }
    if (strongPasswordMessage !== "Password is Strong 💪") {
      Alert.error("Enter a strong password to continue.");
      error_occured = 1;
    }
    if (userData.phone_number.length !== 10) {
      Alert.error("Phone number is invalid");
      error_occured = 1;
    } else if (userData.phone_number.length === 0) {
      Alert.error("Phone number is Empty");
      error_occured = 1;
    }
    if (!regex.test(userData.email)) {
      Alert.error("This is not a valid email address");
      error_occured = 1;
    } else if (userData.email === "") {
      Alert.error("Email is empty");
      error_occured = 1;
    } else if (error_occured === 0) {
      createUserWithEmailAndPassword(auth, signupEmail, signupPwd)
        .then((user_cred) => {
          /*
              TO ACCESS THE EMAIL OF THE USER
              const user = user_cred.user.email;
          */
          console.log(user_cred);
          user_cred.user.displayName = userData.nameOfUser;
          Alert.success(
            `${user_cred.user.displayName} Signed in Succesfully ^ _ ^`,
            3000
          );
        })
        .catch((error) => {
          Alert.error(error.message, 3000);
        });
    }
  };

  // ------------------------------------------------------------------------------------------

  // ON SUBMITTING THE CREATE FORM

  const handleOnSubmit = () => {
    signup();
    if (
      error_occured === 0 &&
      strongPasswordMessage === "Password is Strong 💪"
    ) {
      SubmitData();
    }
    history("/");
  };

  // ------------------------------------------------------------------------------------------

  // HTML STARTED

  return (
    <div className="log">
      <form className="LoginForm" name="logform">
        <div className="Heading">
          <h1>Sign Up</h1>
        </div>
        <div className="fields">
          <label className="label">
            Name : <span className="required">*</span>{" "}
          </label>
          <input
            type="text"
            id="user_name"
            name="nameOfUser"
            className="inputFields"
            placeholder="Enter name here..."
            value={userData.nameOfUser}
            onChange={postUserData}
          />
        </div>
        <div className="fields">
          <label className="label">
            Email : <span className="required">*</span>{" "}
          </label>
          <input
            type="text"
            id="signupEmail"
            className="inputFields"
            placeholder="Enter email here..."
            name="email"
            value={userData.email}
            onChange={(ev) => {
              setSignupEmail(ev.target.value);
              postUserData(ev);
            }}
          />
        </div>
        <div className="fields">
          <label className="label">
            Password : <span className="required">*</span>
          </label>
          <input
            type="password"
            id="signupPwd"
            className="inputFields"
            placeholder="Enter password here..."
            name="create_password"
            value={userData.create_password}
            onChange={(ev) => {
              setSignupPwd(ev.target.value);
              postUserData(ev);
              checkIfStrong(ev.target.value);
            }}
          />
          <br />
          {strongPasswordMessage === "" ? null : (
            <div>
              <br />
              <div className="randomPasswordBox">
                <span>Want a strong password? &nbsp; &nbsp; </span>
                <span id="generatePasswordBtn" onClick={genPassword}>
                  Generate
                </span>
                &nbsp; &nbsp;
                <input type="text" id="suggestPassword" readonly />
              </div>
              <span
                className={
                  strongPasswordMessage === "Password is Strong 💪"
                    ? "strongTextGreen"
                    : "strongTextRed"
                }
              >
                ({strongPasswordMessage})
              </span>
              <br />
              <span className="strongPwdDetails">+ Include Uppercase</span>{" "}
              &nbsp; &nbsp;
              <span className="strongPwdDetails">+ Include Lowercase</span>{" "}
              &nbsp; &nbsp;
              <span className="strongPwdDetails">+ Include Alphabet</span>{" "}
              &nbsp;
              <br />
              <span className="strongPwdDetails">
                + Include Special Character
              </span>
              &nbsp; &nbsp;&nbsp;
              <span className="strongPwdDetails">
                + Password length must be 8 characters long
              </span>
            </div>
          )}
        </div>
        <div className="fields">
          <label className="label">
            Confirm Password : <span className="required">*</span>
          </label>
          <input
            type="password"
            id="cnfrmPwd"
            className="inputFields"
            placeholder="Enter password here..."
            name="confirm_password"
            value={userData.confirm_password}
            onChange={(ev) => {
              setCnfrmPwd(ev.target.value);
              postUserData(ev);
            }}
          />
        </div>
        <div className="fields">
          <label className="label">
            Phone Number : <span className="required">*</span>
          </label>
          <input
            type="text"
            id="phNo"
            name="phone_number"
            className="inputFields"
            placeholder="Enter Phone here..."
            value={userData.phone_number}
            onChange={postUserData}
          />
        </div>

        <Link>
          <button id="signUpBtn" className="btn" onClick={handleOnSubmit}>
            Create Account
          </button>
        </Link>
        <div>
          Already have an account? <Link to="/">Log In.</Link>
        </div>
      </form>
      <div className="imageArea"></div>
    </div>
  );
};

export default Signup;
