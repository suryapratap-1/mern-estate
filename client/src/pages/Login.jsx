import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { signInStart, signInSuccess, signInFailure } from '../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import toast from 'react-hot-toast'
import axios from 'axios'

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

    const submitHandler = async (event) => {
        event.preventDefault();
        dispatch(signInStart());
        try {     
            const response = await axios.post('/api/v1/auth/login', formData)

            if (response.success === false) {
                dispatch(signInFailure(response.data.message));
                return;
            };

            const token = response.data.token;
            localStorage.setItem('token', token);
            
            dispatch(signInSuccess(response.data.data));
            navigate('/');
            toast.success(response.data.message);
        } 
        catch (error) {
            dispatch(signInFailure(error));
            console.log(error);
            toast.error('Login failed 😓')
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

                <button className=' bg-violet-600 text-white py-3 rounded hover:bg-violet-800'>
                    {loading ? "Loading..." : "Login"}
                </button>

                <OAuth />

                <div className='flex gap-2'>
                    <p>Dont have an account?</p>
                    <Link to='/sign-up'>
                        <span className='text-violet-600'>Sign Up</span>
                    </Link>
                </div>

                <p className='text-red-500'>
                    {error ? error : ""}
                </p>

            </form>

        </div>
    )
}

export default Login