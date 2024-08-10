import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // We use these tools to help users log in, stay logged in, and log out.
import React, { useEffect, useState } from "react"; // React helps us build our website, and these special tools (called hooks) let us do cool things.
import { useNavigate, useLocation, Link } from "react-router-dom"; // These tools help us move around our website and know where we are.
import { app } from "../config/firebase/firebaseconfig"; // This is where our app's Firebase setup is stored.
import "../Styles/universal.css"; // This file has the styles (like colors and fonts) we use on our website.
import { useDispatch, useSelector } from "react-redux"; // These tools let us manage the cart, which holds the items users want to buy.
import {
  decrement,
  increment,
  removeFromCart,
} from "../config/Redux/cartSlice"; // These actions help us add or remove items from the cart.

const Navbar = () => {
  const auth = getAuth(app); // This helps us handle user login and logout.
  const navigate = useNavigate(); // This helps us move to different pages on our website.
  const location = useLocation(); // This helps us know which page we're on.
  const cartItem = useSelector((state) => state); // This gets the items in the user's shopping cart.
  const dispatch = useDispatch(); // This lets us tell the cart what to do (like add or remove items).
  const [user, setUser] = useState(null); // We keep track of who is logged in.
  const [error, setError] = useState(null); // We keep track of any problems or mistakes that happen.
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "emerald"
  ); // We keep track of the website's theme (like colors) and store it.

  // This function lets the user switch between light and dark mode.
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("synthwave"); // If the user wants dark mode, we use "synthwave."
    } else {
      setTheme("emerald"); // If the user wants light mode, we use "emerald."
    }
  };

  // This makes sure the theme stays the same when the user comes back to the website.
  useEffect(() => {
    localStorage.setItem("theme", theme); // We save the chosen theme.
    const localTheme = localStorage.getItem("theme"); // We get the saved theme.
    document.querySelector("html").setAttribute("data-theme", localTheme); // We apply the theme to the whole website.
  }, [theme]); // This runs whenever the theme changes.

  // This keeps track of whether someone is logged in or not.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // If someone is logged in, we save their information.
      } else {
        setUser(null); // If no one is logged in, we reset to show that.
      }
    });

    return () => unsubscribe(); // This stops tracking when the user leaves the page.
  }, [auth]); // This runs whenever the `auth` changes.

  // This function logs out the user.
  const logOutUser = async () => {
    try {
      await signOut(auth); // We log the user out.
      navigate("/"); // After logging out, we take the user back to the home page.
    } catch (error) {
      setError("Oops! Looks like a problem occurred"); // If something goes wrong, we show an error message.
    }
  };

  // We decide if we should hide certain buttons based on the page the user is on.
  const hideButtons =
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname === "/sell";

  // This is what shows up on the screen for our navigation bar.
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
          {/* The shopping cart button */}
          <div className="form-control flex flex-row items-center">
            <div className="dropdown dropdown-end">
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
                  <span className="badge badge-sm indicator-item">
                    {cartItem.persistedReducer.cart.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-80 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">
                    Items : {cartItem.persistedReducer.cart.length}
                  </span>
                  <span className="text-info items-center ">
                    {cartItem.persistedReducer.cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-2 rounded mb-2"
                        style={{ width: "100%" }}
                      >
                        <div className="w-10 h-10">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-10 h-10 mask mask-squircle"
                          />
                        </div>
                        <div className="flex-grow flex">
                          <p className="truncate">{item.title}</p>{" "}
                          <p className="truncate">${item.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-primary btn-xs"
                            onClick={() => dispatch(increment(item))}
                          >
                            +
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="btn btn-secondary btn-xs"
                            onClick={() => dispatch(decrement(item))}
                          >
                            -
                          </button>
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => dispatch(removeFromCart(item))}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.

5Zm3.34-.81a.75.75 0 0 1 .69.81l-.3 7.5a.75.75 0 1 1-1.5-.06l.3-7.5a.75.75 0 0 1 .81-.69ZM7.5 16.5a.75.75 0 0 1-.75.75h-.154a1.25 1.25 0 0 1-1.247-1.15l-.74-9.252a43.564 43.564 0 0 0 3.131-.314l.346 8.655Zm6.145.6a1.25 1.25 0 0 1-1.246 1.15H11a.75.75 0 0 1-.75-.75l.348-8.654a43.662 43.662 0 0 0 3.13.313l-.741 9.252Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </span>
                  <div className="card-actions">
                    <button
                      onClick={() => navigate("/checkout")}
                      className="btn btn-primary btn-block"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* The dark mode toggle */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "synthwave"}
            />

            {/* Sun icon */}
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64 17.657l-1.414 1.414-1.414-1.414 1.414-1.414 1.414 1.414zm12.728 0l1.414 1.414 1.414-1.414-1.414-1.414-1.414 1.414zm1.415-6.415h2v2h-2v-2zm-16 0H2v2h2v-2zm7-7h2v2h-2V4zm0 16h2v2h-2v-2zm7.071-14.071l1.414 1.414-1.414 1.414-1.414-1.414 1.414-1.414zM5.636 5.636l-1.414 1.414L2.808 5.636l1.414-1.414 1.414 1.414zm6.364 2.828a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>

            {/* Moon icon */}
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.707 13.05a1 1 0 0 0-1.076-.252 7.947 7.947 0 0 1-2.89.527 8 8 0 1 1-8-8 7.947 7.947 0 0 1 .527-2.89 1 1 0 0 0-.252-1.076A1.004 1.004 0 0 0 10 1a10 10 0 1 0 10 10c0-.416-.017-.833-.051-1.25a1 1 0 0 0-.242-.7z" />
            </svg>
          </label>
          {/* Conditional rendering of buttons based on the page */}
          {!hideButtons && (
            <>
              {!user ? (
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              ) : (
                <>
                  <button
                    className="btn btn-secondary"
                    onClick={() => logOutUser()}
                  >
                    Logout
                  </button>
                </>
              )}
              <Link to="/sell" className="btn btn-accent">
                Sell
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

// In this version, I've reorganized the code, improved some comments, and made sure that everything is clear and easy to follow. The `Navbar` component now includes:

// 1. **Authentication and Navigation**: It manages the user's authentication state, handles sign-out, and controls navigation using React Router's hooks.
// 2. **Theme Management**: It allows users to toggle between the `emerald` and `synthwave` themes, saving the selected theme in `localStorage`.
// 3. **Cart Interaction**: It displays the user's cart items and allows for item increment, decrement, and removal, integrating with Redux for state management.
// 4. **Conditional Button Rendering**: It hides certain buttons based on the current route to enhance the user experience.

// This should provide a clear, maintainable, and efficient implementation of the `Navbar` component for your React project.
