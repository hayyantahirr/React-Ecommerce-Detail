import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase authentication functions
import React, { useEffect, useState } from "react"; // React and hooks
import { useNavigate, useLocation, Link } from "react-router-dom"; // React Router hooks
import { app } from "../config/firebase/firebaseconfig"; // Firebase configuration
import "../Styles/universal.css"; // Universal CSS

const Navbar = () => {
  const auth = getAuth(app); // Initialize Firebase authentication
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook for getting the current location

  const [user, setUser] = useState(null); // State to store the current user
  const [error, setError] = useState(null); // State to store any errors
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "emerald"
  ); // State to store the theme, default to "emerald"

  // Function to toggle between dark and light theme
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("synthwave");
    } else {
      setTheme("emerald");
    }
  };

  // Set theme in localStorage on mount and update localStorage on theme change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // Add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  // Listener for authentication state changes
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

  // Function to log out the user
  const logOutUser = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Navigate to home page after logging out
    } catch (error) {
      setError("Oops! Looks like a problem occurred");
    }
  };

  // Hide buttons on specific pages
  const hideButtons =
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname === "/sell";

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <img
            src="/src/assets/universal_mart-removebg-preview.png"
            alt="Universal Mart Logo"
            width="70px"
          />
          <Link to="/home" className="btn btn-ghost text-xl">
            Universal Mart
          </Link>
        </div>
        <div className="flex-none flex items-center gap-2">
          <div className="form-control flex flex-row items-center">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {/* <span className="badge badge-sm indicator-item">8</span> */}
              </div>
            </div>
            {user && !hideButtons && (
              <Link
                to="/sell"
                className="btn btn-outline btn-info w-[120px] p-0 ml-5"
              >
                Sell Product
              </Link>
            )}
          </div>
          {error && <h1 className="text-center text-red-500">{error}</h1>}

          {/* Day and Night mode toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={handleToggle}
              checked={theme === "emerald" ? false : true}
              value="synthwave"
            />
            {/* Sun icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {/* Dropdown menu */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square"
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
                {user && !hideButtons && <a onClick={logOutUser}>Logout</a>}
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
