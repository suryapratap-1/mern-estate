import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteUserSuccess, deleteUserFailure, signOutSuccess } from "../redux/slices/userSlice"

const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [formData, setFormData] = useState({});

    const deleteUserHandler = async () => {
        try {
            const response = await fetch(`/api/v1/auth/delete/${currentUser.data._id}`, 
                {
                    method: "DELETE",
                }
            )
            const data = await response.json();
            console.log(data)
            if (data.success === true) {
                dispatch(deleteUserSuccess());
                toast.success(data.message);
                navigate("/");
                return;
            }
            else {
                dispatch(deleteUserFailure(data.message));
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error while deleting user account ", error)
        }
    }
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

    return (
        <div className='w-1/2 mx-auto p-6 flex flex-col items-center gap-5'>
            <h2 className='text-4xl font-bold'>Profile</h2>

            <form action="" className='w-[400px] mt-5 flex flex-col items-center gap-4'>
                <img 
                    className='w-20 mb-5 rounded-full'
                    src={currentUser.data.avatar} 
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
                <button onClick={deleteUserHandler} className='text-red-700 hover:text-orange-500'>Delete account</button>
                <button onClick={signOutHandler} className='text-red-700 hover:text-orange-500'>Sign out</button>
            </div>
        </div>
    )
}

export default Profile