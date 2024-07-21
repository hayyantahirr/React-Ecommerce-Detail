import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);

  function back() {
    navigate(-1);
  }

  useEffect(() => {
    axios(`https://dummyjson.com/products/${param.id}`).then((res) => {
      setProducts(res.data);
    });
  }, [param.id]);

  return (
    <>
      {products ? (
        <div className="mt-7 mb-8">
          <div className="flex justify-center gap-5">
            <img
              src={products.thumbnail}
              alt=""
              className="w-1/5 border rounded-3xl"
            />
            <div className="border text-center w-1/2 rounded-3xl">
              <h1 className="mt-5 text-2xl ">{products.title}</h1>
              <div>
                <h1 className="text-xl ">
                  price :{" "}
                  <span className="text-[#a6adad] text-base">{products.price}$</span>
                </h1>
                <h1 className="text-xl ">
                  Brand :{" "}
                  <span className="text-[#a6adad] text-base">{products.brand}</span>
                </h1>
                <h1 className="text-xl ">
                  category :{" "}
                  <span className="text-[#a6adad] text-base">{products.category}</span>
                </h1>
                <div className="w-1/3 mx-auto mt-4">
                  {" "}
                  <h1 className="text-wrap">{products.description}</h1>
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
