import { useState, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logo from "../src/assets/logo.png";
import "../src/styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState("password");
  const [errorInput, setErrorInput] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {
    const dataPost = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPost),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorInput(true);
      });
  };
  return (
    <div className="wrapper">
      <Link to="/" className="Logo_content">
        <img src={logo} alt="Logo Vroommm" className="logo_vroommm" />
      </Link>

      <form
        className="form_login"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <input
            type="email"
            className="username"
            name="email"
            placeholder="Email"
            ref={emailRef}
          />
        </div>
        <div className="password_box">
          {showPassword === "password" ? (
            <AiFillEye
              className="icon"
              onClick={() => {
                setShowPassword("text");
              }}
            />
          ) : (
            <AiFillEyeInvisible
              className="icon"
              onClick={() => {
                setShowPassword("password");
              }}
            />
          )}
          <input
            type={showPassword}
            className="password"
            name="password"
            minLength="8"
            required
            placeholder="Mot de passe"
            ref={passwordRef}
          />
        </div>

        <input type="submit" value="Connexion" className="sign_in" />
        {errorInput && <p className="error">Email ou mot de passe incorrect</p>}
      </form>
      <Link to="/register">
        <input type="submit" value="Créer un compte" className="sign_in" />
      </Link>
    </div>
  );
}
