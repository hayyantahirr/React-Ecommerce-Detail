import React from 'react'

function Sell() {
  return (
  <><>
  <form >
    <h1 className="text-center text-2xl mt-20">Sell a Product</h1>
    <label className="inp input input-bordered flex items-center gap-2  w-1/2 mx-auto mt-7">
      <input type="text" placeholder="Name" className=" grow"  />
    </label>
    <label className="inp input input-bordered flex items-center gap-2  w-1/2 mx-auto mt-7">
      <input type="number" placeholder="Age" className=" grow"  />
    </label>
    <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
      >
        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
      </svg>
      <input type="text" placeholder="Email"  />
    </label>
    <label className="inp input input-bordered flex items-center gap-2  w-1/2 mx-auto mt-7">
      
      <input
        type="text"
        placeholder="Password"
        className=" grow"
     
      />
    </label>

    <div className="flex justify-center">
      <button className="btn btn-outline btn-success mt-8">
        Add it !{" "}
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
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </div>
    
    <h1 className="text-center mt-8">{error}</h1>
  </form>
</></>
  )
}

export default Sell