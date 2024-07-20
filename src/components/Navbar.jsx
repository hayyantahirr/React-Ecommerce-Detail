import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase/firebaseconfig";

const Navbar = () => {
  // logout button
  const auth = getAuth(app);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        console.log("please login first!");
        navigate("/");
      }
    });
  });

  const [error, setError] = useState();

  function logOutUser() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError("Oops! look likes a problem occured");
      });
  }

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <img
            src="/src/assets/universal_mart-removebg-preview.png"
            alt=""
            width={"70px"}
          />
          <a className="btn btn-ghost text-xl">Universal Mart</a>
        </div>
        <div className="flex-none flex items-center gap-2">
          <div className="form-control flex flex-row items-center">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-50 md:w-auto"
            />
            <button
              className="btn btn-outline btn-error w-[100px] p-0 ml-5"
              onClick={logOutUser}
            >
              LogOut
            </button>
          </div>
          {error && <h1 className="text-center text-red-500">{error}</h1>}
        </div>
      </div>
    </>
  );
};

export default Navbar;
