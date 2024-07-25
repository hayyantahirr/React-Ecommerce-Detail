import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "../config/firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
import "../Styles/universal.css";
import { collection, getDocs, query } from "firebase/firestore";

const Home = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  // this code is to make sure that nobody can get to home until he is logged in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        console.log("please login first!");
        navigate("/");
      }
    });
  });

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [users, setUsers] = useState();

  //  this code is for welcomming the user
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUsers(user);

      const uid = user.uid;
    } else {
      // User is signed out
      // ...
    }
  });

  // this is for data fetching purpose only

  async function gettingDocument(params) {
    // axios('https://dummyjson.com/products')
    //   .then((res) => {
    // console.log(res.data.products)
    //     setProduct(res.data.products)
    //     setLoading(false) // Set loading to false after data is fetched
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     setLoading(false) // Set loading to false if there's an error
    //   })
    const q = query(collection(db, "product"));
    try {
      const querySnapshot = await getDocs(q);
      const allDocs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id; // Add the document ID to the data
        return data;
      });
      setProduct(allDocs);
      setLoading(false);
      console.log(allDocs);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }

    // console.log(product);
  }

  useEffect(() => {
    gettingDocument();
  }, []);

  // this code is written to show the loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl text-left ml-5">
        Welcome <span className="text-xl font-bold italic">{users?.email}</span>
        ,
      </h1>
      {/* <div className="flex justify-center items-center">
        <div>
          <h1 className="text-xl">Scroll Down!!</h1>
        </div>
        <Carousel />
      </div> */}

      <div className="flex gap-3 flex-wrap justify-center">
        {product ? (
          product.map((item) => {
            console.log(item);
            return (
              <Card
                title={item.title}
                desc={item.description.slice(0, 50)}
                img={item.img}
                id={item.id}
                price={item.price}
                category={item.category}
                brand={item.brand}
              />
            );
          })
        ) : (
          <span className="loading loading-dots loading-lg"></span>
        )}
      </div>
    </>
  );
};

export default Home;
