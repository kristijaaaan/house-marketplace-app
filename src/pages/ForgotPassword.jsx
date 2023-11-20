import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useResetPassword } from "./useResetPassword";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { resetPassword, isLoading } = useResetPassword();

  function onSubmit(e) {
    e.preventDefault();

    if (!email) return;

    resetPassword({ email });
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="emailInput"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Link to="/sign-in" className="forgotPasswordLink">
            Sign in
          </Link>

          <div className="signInBar">
            <div className="signInText">Send reset link</div>
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
    </div>
  );
}

export default ForgotPassword;
