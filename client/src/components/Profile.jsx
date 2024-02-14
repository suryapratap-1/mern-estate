import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { currentUser } = useSelector(state => state.user);

    return (
        <div className='w-1/2 mx-auto p-6 flex flex-col items-center gap-5'>
            <h2 className='text-4xl font-bold'>Profile</h2>

            <form action="" className='w-[400px] mt-5 flex flex-col items-center gap-4'>
                <img 
                    className='w-20 mb-5 rounded-full'
                    src={currentUser.avatar} 
                    alt="profile" 
                />
                <input className='w-full py-2 px-3 border-2 border-black rounded-sm'
                    type="text" 
                    placeholder='username' 
                />
                <input className='w-full py-2 px-3 border-2 border-black rounded-sm'
                    type="email" 
                    placeholder='email' 
                />
                <button className='w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-800'>
                    Update
                </button>
            </form>

            <div className='w-[400px] flex justify-between'>
                <button className='text-red-700 hover:text-orange-500'>Delete account</button>
                <button className='text-red-700 hover:text-orange-500'>Sign out</button>
            </div>
        </div>
    )
}

export default Profile