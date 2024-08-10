import React, { useEffect, useState } from "react"; // Import React and hooks
import { useNavigate, useParams } from "react-router-dom"; // Import hooks for navigation and URL parameters
import "../Styles/universal.css"; // Import universal CSS styles
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions to retrieve a document
import { db } from "../config/firebase/firebaseconfig"; // Import Firestore database configuration
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { addToCart } from "../config/Redux/cartSlice"; // Import Redux action to add items to the cart

const Detail = () => {
  const param = useParams(); // Get the URL parameters, specifically the product ID
  const navigate = useNavigate(); // Hook for programmatically navigating between routes
  const [product, setProduct] = useState(null); // State to hold the fetched product data
  const [loading, setLoading] = useState(true); // State to manage the loading state
  const dispatch = useDispatch(); // Hook to dispatch Redux actions

  // Function to navigate back to the previous page
  function back() {
    navigate(-1); // Navigate back to the previous page
  }

  // Function to fetch product data from Firestore using the product ID from the URL
  async function getDataThroughId() {
    const docRef = doc(db, "product", param.id); // Reference to the specific product document in Firestore
    try {
      const docSnap = await getDoc(docRef); // Fetch the document snapshot from Firestore
      if (docSnap.exists()) {
        const data = docSnap.data(); // Extract data from the document
        data.id = docSnap.id; // Attach the document ID to the data object
        setProduct(data); // Update the state with the fetched product data
        console.log(data); // Log the fetched data for debugging
      } else {
        console.log("No such document!"); // Log a message if no document is found
      }
      setLoading(false); // Set loading to false after data fetching is complete
    } catch (e) {
      console.log(e); // Log any errors that occur during data fetching
      setLoading(false); // Set loading to false even if an error occurs
    }
  }

  // useEffect hook to fetch product data when the component mounts or when the product ID changes
  useEffect(() => {
    getDataThroughId();
  }, [param.id]);

  // If the product data is still being fetched, show a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      {product ? (
        // Display the product details if the data is available
        <div className="mt-7 mb-8 ">
          <div className="flex justify-center gap-5">
            <img
              src={product.img}
              alt={product.title}
              className="w-1/5 border rounded-3xl "
            />
            <div className="border text-center w-1/2 rounded-3xl ">
              <h1 className="mt-5 text-2xl ">{product.title}</h1>
              <div>
                <h1 className="text-xl ">
                  Price:{" "}
                  <span className="text-[#a6adad] text-base">
                    {product.price}$
                  </span>
                </h1>
                <h1 className="text-xl ">
                  Brand:{" "}
                  <span className="text-[#a6adad] text-base">
                    {product.brand}
                  </span>
                </h1>
                <h1 className="text-xl ">
                  Category:{" "}
                  <span className="text-[#a6adad] text-base">
                    {product.category}
                  </span>
                </h1>
                <div className="w-1/3 mx-auto mt-4 mb-5">
                  <h1 className="text-wrap">{product.description}</h1>
                </div>
                <div className="w-1/3 mx-auto mt-4 mb-5">
                  {/* Button to add the product to the cart */}
                  <button
                    className="relative group cursor-pointer text-sky-50  overflow-hidden h-16 w-64 rounded-md bg-sky-800 p-2 flex justify-center items-center font-bold"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-900"></div>
                    <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-800"></div>
                    <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-700"></div>
                    <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-600"></div>
                    <p className="z-10 ">
                      <span className="flex AddToCart items-center">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5 mr-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 5v1H4.667a1.75 1.75 0 0 0-1.743 1.598l-.826 9.5A1.75 1.75 0 0 0 3.84 19H16.16a1.75 1.75 0 0 0 1.743-1.902l-.826-9.5A1.75 1.75 0 0 0 15.333 6H14V5a4 4 0 0 0-8 0Zm4-2.5A2.5 2.5 0 0 0 7.5 5v1h5V5A2.5 2.5 0 0 0 10 2.5ZM7.5 10a2.5 2.5 0 0 0 5 0V8.75a.75.75 0 0 1 1.5 0V10a4 4 0 0 1-8 0V8.75a.75.75 0 0 1 1.5 0V10Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add to cart
                      </span>
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-7">
            {/* Button to navigate back to the previous page */}
            <button className="btn btn-outline btn-primary" onClick={back}>
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
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
              Go Back to Home
            </button>
          </div>
        </div>
      ) : (
        // Show a loading spinner if the product data is not available
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default Detail;

// ### Detailed Explanation

// 1. **Imports**:
//    - **React and Hooks**: `useEffect` and `useState` are used to manage side effects and state within the component.
//    - **React Router**: `useNavigate` is used to navigate programmatically, and `useParams` fetches URL parameters.
//    - **Firebase Firestore**: `doc` and `getDoc` are used to reference and retrieve documents from Firestore.
//    - **Redux**: `useDispatch` and `useSelector` are used to interact with the Redux store.

// 2. **State Management**:
//    - **product**: Stores the fetched product data.
//    - **loading**: Tracks whether the product data is still being fetched.

// 3.

//  **Functions**:
//    - **back()**: Uses `navigate(-1)` to go back to the previous page.
//    - **getDataThroughId()**: Fetches product data from Firestore based on the product ID in the URL. If the document exists, the data is stored in the `product` state. If not, it logs an error.

// 4. **useEffect**:
//    - Automatically calls `getDataThroughId` when the component mounts or when `param.id` changes.

// 5. **Conditional Rendering**:
//    - While loading, a spinner is shown.
//    - Once the product data is loaded, it's displayed with various details (image, title, price, etc.). A button is provided to add the product to the cart, which dispatches the `addToCart` action from Redux.
//    - A "Go Back to Home" button allows navigation back to the previous page.

// This code structure ensures that the product data is fetched and displayed correctly, and it provides a clear way to interact with the Redux store and navigate within the app.
