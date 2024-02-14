import React from 'react'
import { Link } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/slices/userSlice"

const Header = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    // console.log(user)

    const signOutHandler = async () => {
        try {
            const response = await fetch("/api/v1/auth/signout");
            const data = await response.json();
            if (data.success === false)  return;
            dispatch(signOutSuccess(data))
            // console.log("Logged out", data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className=' px-4 min-[769px]:px-24 min-[]: flex items-center justify-between w-full h-16 shadow'>

            <div className='flex items-center gap-2 font-bold text-2xl'>
                <IoHome className='text-violet-600'/>
                <div>
                    <span className=' text-gray-700'>ESTATE</span>
                    <span className=' text-violet-600'>.com</span>
                </div>
            </div>

            <div className='gap-10 font-medium hidden min-[769px]:flex'>
                <div>Rent</div>
                <div>Buy</div>
                <div>Sell</div>
                <div className='flex items-center gap-2 whitespace-nowrap'>
                    <p>Manage Property</p>
                    <button className='mt-1'>
                        <IoIosArrowDown />
                    </button>
                </div>
                <div className='flex items-center gap-2'>
                    <p>Resources</p>
                    <button className='mt-1'>
                        <IoIosArrowDown />
                    </button>
                </div>
            </div>

            <div>
                {
                    user.currentUser != null ?
                    (
                        <div className='sm:flex hidden items-center gap-3 text-white'>
                            <Link to="/">
                                <button className='px-6 h-10 font-medium text-black border-2 border-gray-300 rounded'>
                                    Home
                                </button>
                            </Link>
                            <Link to='/dashboard'>
                                <button className='px-6 h-10 font-medium text-black border-2 border-gray-300 rounded'>
                                    Dashboard
                                </button>
                            </Link>
                            <button onClick={signOutHandler} className='w-20 h-10 font-medium bg-violet-600 border border-violet-600 rounded'>
                                Sign out
                            </button>
                            <Link to='/profile'>
                                <button className='pl-2'>
                                    <img className='w-10 rounded-full border-2 border-violet-600'
                                        src={user.currentUser.avatar} alt="profile" 
                                    />
                                </button>
                            </Link>
                        </div>
                    ) :
                    (
                        <div className=' gap-3 text-white sm:flex hidden'>
                            <Link to='login'>
                                <button className='w-20 h-10 font-medium text-black border-2 border-gray-300 rounded' >Login</button>
                            </Link>
                            <Link to='sign-up'>
                                <button className='w-20 h-10 font-medium bg-violet-600 border border-violet-600 rounded' >Sign up</button>
                            </Link>
                        </div>
                    ) 
                }
            </div>
            
        </nav>
    )
}

export default Header