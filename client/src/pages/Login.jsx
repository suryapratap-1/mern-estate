import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { signInStart, signInSuccess, signInFailure } from '../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const { loading, error } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        try {
            const res = await fetch('/api/v1/auth/login', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                }
            )
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure());
                return;
            };
            dispatch(signInSuccess(data));
            navigate('/');
        } 
        catch (error) {
            
        }
    }

    return (
        <div className='w-1/2 mx-auto p-6 flex flex-col items-center gap-8'>

            <h1 className='text-4xl font-bold'>Sign In</h1>
            
            <form onSubmit={submitHandler} className='flex flex-col gap-4'>

                <label htmlFor="email">
                    <input type="email" id='email' name='email' placeholder='Email' required 
                        className=' w-[400px] py-2 px-3 border-2 border-black rounded-sm'
                        onChange={changeHandler}
                    />
                </label>

                <label htmlFor="password">
                    <input type="password" id='password' name='password' placeholder='Password' required 
                        className=' w-[400px] py-2 px-3 border-2 border-black rounded-sm'
                        onChange={changeHandler}
                    />
                </label>

                <button className=' bg-blue-600 text-white py-3 rounded hover:bg-blue-800'>
                    {loading ? "Loading..." : "Login"}
                </button>

                <p className='text-red-500'>
                    {error ? error : ""}
                </p>

            </form>

        </div>
    )
}

export default Login