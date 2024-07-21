import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase/firebaseconfig";

const Navbar = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const logOutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError("Oops! Looks like a problem occurred");
      });
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <img
            src="/src/assets/universal_mart-removebg-preview.png"
            alt="Universal Mart Logo"
            width="70px"
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
            {user && (
              <button className="btn btn-outline btn-info w-[120px] p-0 ml-5">
                Sell Product
              </button>
            )}
          </div>
          {error && <h1 className="text-center text-red-500">{error}</h1>}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square "
            >
              <div className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                {user && <a onClick={logOutUser}>Logout</a>}
                {error && <h1 className="text-center text-red-500">{error}</h1>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
