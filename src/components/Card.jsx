import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/universal.css";

const Card = ({ title, img, desc, id }) => {
  const navigate = useNavigate();
  // console.log(key);
  function click() {
    navigate(`/detail/${id}`);
  }
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={img} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{desc}....</p>

          <div className="card-actions">
            <button className="btn btn-primary" onClick={click}>
              See more....
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
