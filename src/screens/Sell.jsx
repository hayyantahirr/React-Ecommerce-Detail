import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase/firebaseconfig";
import { addDoc, collection } from "firebase/firestore";
import "../Styles/universal.css";

function Sell() {
  const img = useRef();
  const title = useRef();
  const price = useRef();
  const brand = useRef();
  const category = useRef();
  const description = useRef();

  const navigate = useNavigate();
  const storage = getStorage();



  async function sellProduct(event) {
    // this is to prevent its default behavior
    event.preventDefault();
    console.log(img.current.files[0].name);
// we are setting up image in the data base though url 
    const storageRef = ref(storage, "product/" + img.current.files[0].name);

    await uploadBytes(storageRef, img.current.files[0]);

    const url = await getDownloadURL(ref(storageRef));
    
    console.log(url);
    // now we are sending the data base our collection which we have collected through input fields 
    try {
      await addDoc(collection(db, "product"), {
        title: title.current.value,
        img: url,
        price: price.current.value,
        brand: brand.current.value,
        category: category.current.value,
        description: description.current.value,
      });
      console.log("congrats kam hogya");
      navigate(-1); // Navigate back after successful submission
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // testing all the value 
    console.log(title.current.value);
    console.log(price.current.value);
    console.log(brand.current.value);
    console.log(category.current.value);
    console.log(description.current.value);
  }

  return (
    <>
      <form onSubmit={sellProduct}>
        <h1 className="text-center text-2xl mt-20">Sell a Product</h1>
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input type="file" className="grow cursor-pointer" ref={img} />
        </label>
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input
            type="text"
            placeholder="Title of Product"
            className="grow cursor-pointer"
            ref={title}
          />
        </label>
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input
            type="number"
            placeholder="price"
            className="grow cursor-pointer"
            ref={price}
          />
        </label>
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input
            type="text"
            placeholder="Brand"
            className="grow cursor-pointer"
            ref={brand}
          />
        </label>
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input
            type="text"
            placeholder="Category"
            className="grow cursor-pointer"
            ref={category}
          />
        </label>
        <label className="inp input input-bordered flex items-center gap-2 w-1/2 mx-auto mt-7">
          <input
            type="text"
            placeholder="Description"
            className="grow cursor-pointer"
            ref={description}
          />
        </label>

        <div className="flex justify-center">
          <button
            className="btn btn-outline btn-success mt-8 mb-5"
            type="submit"
          >
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
      </form>
    </>
  );
}

export default Sell;
