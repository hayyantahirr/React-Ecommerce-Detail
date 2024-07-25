import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/universal.css";
import { doc, getDoc } from "firebase/firestore"; // Import doc and getDoc
import { db } from "../config/firebase/firebaseconfig";

const Detail = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // Single product, not array
  const [loading, setLoading] = useState(true); // Add loading state

  function back() {
    navigate(-1);
  }

  async function getDataThroughId() {
    const docRef = doc(db, "product", param.id); // Use doc to get a specific document
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        data.id = docSnap.id; // Add document ID to the data
        setProduct(data);
        console.log(data);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataThroughId();
  }, [param.id]); // Add param.id as a dependency

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
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default Detail;
