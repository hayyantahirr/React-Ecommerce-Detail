import React, { useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../Styles/register.css";
import { app } from "../config/firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const [error,setError]=useState()

  // firebase Auth
  const auth = getAuth(app);

  // function made for registering the user

  function registerUser(event) {
    event.preventDefault();

    // Register user
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        navigate("/login");
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setError("Oh no ! Looks like you have already been registered!")
      });

    console.log(email.current.value);
    console.log(password.current.value);

    email.current.value = "";
    password.current.value = "";
  }
  function sendToLogin(params) {
    navigate("/login");
  }

  return (
    <>
      <form onSubmit={registerUser}>
        <h1 className="text-center text-2xl mt-20">Register Yourself Now !</h1>
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" placeholder="Email" ref={email} />
        </label>
        <label className="inp input input-bordered flex items-center gap-2  w-1/2 mx-auto mt-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            className=" grow"
            ref={password}
          />
        </label>
        <div className="flex justify-center">
          <button className="btn btn-outline btn-success mt-8" >
            Register{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button></div>
          <h1 onClick={sendToLogin} className="alreadylogin text-center mt-8">
            Already Have an Account?
          </h1>
        <h1 className="text-center mt-8">{error}</h1>
      </form>
    </>
  );
};

export default Register;
