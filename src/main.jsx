import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Home from './screens/Home'


const router =createBrowserRouter([{
    path:"/",
    element: <Layout/>,
    children:[
        {
            path:"/",
            element:<Home/>
        }
    ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>

)
