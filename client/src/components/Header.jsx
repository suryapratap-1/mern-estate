import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <div className='flex items-center justify-between w-full h-16 px-24 bg-stone-400'>

            <div className='font-bold text-3xl'>
                <span className=' text-blue-600'>Surya</span>
                <span className=' text-gray-700'>ESTATE</span>
            </div>

            <div>
                <form action="">
                    <label htmlFor="search">
                        <input 
                            type="text" placeholder='Search' id='search'
                            className=' w-96 h-10 px-2 border border-gray-800 rounded'
                        />
                    </label>
                </form>
            </div>

            <div className='flex gap-4 text-white'>
                <Link to='sign-up'>
                    <button className='px-3 py-2 bg-blue-600 rounded' >Sign up</button>
                </Link>
                <Link to='login'>
                    <button className='px-3 py-2 bg-blue-600 rounded' >Login</button>
                </Link>
            </div>
            
        </div>
    )
}

export default Header