import { useState } from "react";
import { Link } from "react-router-dom";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { useSignup } from "./useSignUp";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const { signup, isLoading } = useSignup();

  function onChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!email || !password || !name) return;

    signup(
      { name, email, password },
      {
        onSettled: () => {
          setFormData({ name: "", email: "", password: "" });
        },
      }
    );
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome back</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />

            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                className="showPassword"
                alt="show"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>

            <div className="signInBar">
              <p className="signInText">Sign up</p>
              <button className="signInButton">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="34px"
                  viewBox="0 0 24 24"
                  width="34px"
                  fill="#fff"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </button>
            </div>
          </form>
        </main>
        <Link to="/sign-in" className="registerLink">
          Sign in instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
