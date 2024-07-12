import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router =createBrowserRouter()

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>

)
