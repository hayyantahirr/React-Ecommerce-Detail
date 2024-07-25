import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/universal.css";
import { doc, getDoc } from "firebase/firestore"; // Import doc and getDoc from Firestore
import { db } from "../config/firebase/firebaseconfig"; // Import Firestore database configuration

const Detail = () => {
  const param = useParams(); // Hook to get URL parameters
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [product, setProduct] = useState(null); // State to hold the product data
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Function to navigate back to the previous page
  function back() {
    navigate(-1);
  }

  // Function to fetch product data based on the document ID from Firestore
  async function getDataThroughId() {
    const docRef = doc(db, "product", param.id); // Reference to the specific document
    try {
      const docSnap = await getDoc(docRef); // Fetch the document snapshot
      if (docSnap.exists()) {
        const data = docSnap.data(); // Get the document data
        data.id = docSnap.id; // Add the document ID to the data
        setProduct(data); // Update the product state with the fetched data
        console.log(data); // Log the data for debugging
      } else {
        console.log("No such document!"); // Log if no document is found
      }
      setLoading(false); // Set loading to false after fetching data
    } catch (e) {
      console.log(e); // Log any error that occurs
      setLoading(false); // Set loading to false in case of error
    }
  }

  // useEffect hook to call getDataThroughId when the component mounts or param.id changes
  useEffect(() => {
    getDataThroughId();
  }, [param.id]);

  // Display loading spinner while data is being fetched
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
        // Display product details if product data is available
        <div className="mt-7 mb-8">
          <div className="flex justify-center gap-5">
            <img
              src={product.img}
              alt=""
              className="w-1/5 border rounded-3xl"
            />
            <div className="border text-center w-1/2 rounded-3xl">
              <h1 className="mt-5 text-2xl ">{product.title}</h1>
              <div>
                <h1 className="text-xl ">
                  price :{" "}
                  <span className="text-[#a6adad] text-base">
                    {product.price}$
                  </span>
                </h1>
                <h1 className="text-xl ">
                  Brand :{" "}
                  <span className="text-[#a6adad] text-base">
                    {product.brand}
                  </span>
                </h1>
                <h1 className="text-xl ">
                  category :{" "}
                  <span className="text-[#a6adad] text-base">
                    {product.category}
                  </span>
                </h1>
                <div className="w-1/3 mx-auto mt-4">
                  {" "}
                  <h1 className="text-wrap">{product.description}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-7">
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
        // Display loading spinner if product data is not available
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default Detail;
