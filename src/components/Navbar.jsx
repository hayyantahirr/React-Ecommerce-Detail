import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
            <img src="/src/assets/universal_mart-removebg-preview.png"  alt="" width={"70px"}/>
          <a className="btn btn-ghost text-xl">Universal Mart</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-50 md:w-auto"
            />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Navbar;
