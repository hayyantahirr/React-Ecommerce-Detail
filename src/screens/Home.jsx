import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '../config/firebase/firebaseconfig'
import { useNavigate } from 'react-router-dom'
import "../Styles/universal.css";

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

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true) // State to manage loading
 const [users,setUsers] =useState()

//  this code is for welcomming the user 
onAuthStateChanged(auth, (user) => {
  if (user) {

setUsers(user)

    const uid = user.uid;
  
  } else {
    // User is signed out
    // ...
  }
});



  // this is for data fetching purpose only 
  useEffect(() => {
    axios('https://dummyjson.com/products')
      .then((res) => {
        console.log(res.data.products)
        setProduct(res.data.products)
        setLoading(false) // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err)
        setLoading(false) // Set loading to false if there's an error
      })
  }, [])
  
  // this code is written to show the loading 
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }

  return (
    <>
    <h1 className='text-2xl text-left'>Welcome <span className='text-xl font-bold italic'>{users?.email}</span>,</h1>
      <div className='flex justify-center items-center'>
      
          
        
        <div>
          <h1 className='text-xl'>Scroll Down!!</h1>
        </div>
        <Carousel />
      </div>

      <div className='flex gap-3 flex-wrap justify-center'>
        {product ? product.map((item) => {
          return (
            <Card
              key={item.id}
              title={item.title}
              desc={item.description.slice(0, 62)}
              thumbnail={item.thumbnail}
              id={item.id}
            />
          )
        }) : <span className="loading loading-dots loading-lg"></span>}
      </div>
    </>
  )
}

export default Home