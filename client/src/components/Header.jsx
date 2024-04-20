import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { TbCircleLetterR } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/slices/userSlice"
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from "react-icons/gi";


const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signOutHandler = async () => {
        try {
            const response = await fetch("/api/v1/auth/signout");
            const data = await response.json();
            if (data.success === false)  return;
            dispatch(signOutSuccess(data));
            navigate("/");
            toast.success(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        if (searchTerm !== '') {
            navigate(`listing/search?${searchQuery}`);
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search])

    return (
        <nav className='px-4 min-[769px]:px-20 w-full py-2 text-sm shadow
            flex items-center justify-between
        '>

            <Link to='/'>
                <div className='flex items-center gap-1 font-bold text-2xl'>
                    <IoHome className='text-xl text-red-500'/>
                    <div>
                        <span className='text-red-500'>estate</span>
                        <span className='text-[#2b2b2b]'>.com</span>
                    </div>
                </div>
            </Link>

            <div className='block sm:hidden '>
                <GiHamburgerMenu className=' text-xl' />
            </div>

            <div className='gap-10 font-medium hidden lg:flex tracking-wider'>
                <div>Rent</div>
                <div>Sale</div>
                <div>Listings</div>
                {/* <div>Mortgage</div>
                <div className='relative'>
                    <p>Find Realtors</p>
                    <sup className='absolute -right-3'>
                        <TbCircleLetterR />
                    </sup> 
                </div> */}

                {/* <div className='flex items-center gap-2 whitespace-nowrap'>
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
                </div> */}
            </div>

            <form className='sm:flex hidden border p-1 border-black rounded-full' onSubmit={submitHandler}>
                <input className='md:w-[16rem] py-1 md:py-1.5 px-4 rounded-l-full outline-none'
                    type="text" 
                    placeholder='address/location' 
                    value={searchTerm}
                    name='localAddress'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='w-8 flex justify-center items-center bg-[#2b2b2b] text-white rounded-full'>
                    <FaSearch />
                </button>
            </form>

            <div className='sm:flex items-center hidden'>
                {
                    user.currentUser != null ?
                    (
                        <div className='flex items-center gap-3 text-white'>
                            {/* <Link to='/dashboard'>
                                <button className='px-6 h-10 font-medium text-black border-2 border-gray-300 rounded hover:bg-violet-500 hover:text-white hover:border-violet-500'>
                                    Dashboard
                                </button>
                            </Link> */}
                            <Link>
                                <button className='px-6 h-10 font-medium text-black border-2 border-gray-300 rounded hover:bg-[#2b2b2b] hover:text-white hover:border-[#2b2b2b]'>
                                    About
                                </button>
                            </Link>
                            <button onClick={signOutHandler} className='w-20 h-10 font-medium bg-[#2b2b2b] border border-[#2b2b2b] rounded'>
                                Sign out
                            </button>
                            <Link to='/profile'>
                                <button className='pl-2 grid place-items-center'>
                                    <img className='w-10 rounded-full border border-violet-600'
                                        src={user.currentUser.avatar} alt="profile" 
                                    />
                                </button>
                            </Link>
                        </div>
                    ) :
                    (
                        <div className=' gap-2 text-white sm:flex hidden'>
                            <Link to='login'>
                                <button className='w-20 md:h-10 h-9 font-medium text-black border rounded-full hover:bg-[#2b2b2b] hover:text-white hover:border-[#2b2b2b]'>
                                    Login
                                </button>
                            </Link>
                            <Link to='sign-up'>
                                <button className='w-20 md:h-10 h-9 font-medium bg-[#2b2b2b] border border-[#2b2b2b] rounded-full' >Sign up</button>
                            </Link>
                        </div>
                    ) 
                }
            </div>
            
        </nav>
    )
}

export default Header