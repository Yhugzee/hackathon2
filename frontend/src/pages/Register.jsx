import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logo from "../assets/logo.png";
import arrow from "../assets/arrow.png";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("password");
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {
    const dataPost = {
      firstname: firstNameRef.current.value,
      lastname: lastNameRef.current.value,
      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role_id: 3,
    };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    }).then((res) => {
      console.warn(res);
      navigate("/login");
    });
  };

  return (
    <div className="register">
      <Link to="/">
        <img src={arrow} alt="Retour" className="back-arrow" />
      </Link>
      <Link to="/" className="logo">
        <img src={logo} alt="Vroommm Logo" className="logo_vroommm" />
      </Link>
      <form
        className="form_register"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          placeholder="Prénom"
          className="firstname"
          ref={firstNameRef}
        />
        <input
          type="text"
          placeholder="Nom"
          className="lastname"
          ref={lastNameRef}
        />
        <input
          type="text"
          placeholder="Pseudo"
          className="username_register"
          ref={userNameRef}
        />
        <input
          type="email"
          placeholder="Email"
          className="email"
          ref={emailRef}
        />
        <div className="password_box_register">
          {showPassword === "password" ? (
            <AiFillEye
              className="icon_register"
              onClick={() => {
                setShowPassword("text");
              }}
            />
          ) : (
            <AiFillEyeInvisible
              className="icon_register"
              onClick={() => {
                setShowPassword("password");
              }}
            />
          )}

          <input
            type={showPassword}
            name="password"
            minLength="8"
            required
            placeholder="Mot de passe"
            className="password_register"
            ref={passwordRef}
          />
        </div>
        <button type="submit" className="register_btn">
          S'enregistrer
        </button>
      </form>
    </div>
  );
}