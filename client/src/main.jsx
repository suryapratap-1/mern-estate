import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import Home from './pages/Home.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './components/Profile.jsx'
import CreateListing from "./pages/CreateListing.jsx"
import Listing from './pages/Listing.jsx'
import SearchedListing from './pages/SearchedListing.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={ <App />}>
            <Route path='/' element={ <Home />}/>
            <Route path='/sign-up' element={<Signup />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/listing/:listingId' element={<Listing />} />
            <Route path='/listing/search' element={<SearchedListing />} />
            <Route element={<PrivateRoute />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/create-listing' element={<CreateListing />} />
            </Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
