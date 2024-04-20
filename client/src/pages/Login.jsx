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
        <main>

            <div className='relative w-full h-[40rem] z-0'>
                <img className='w-full h-full object-cover'
                    src="/signup-bg.jpg" alt="signup-background" 
                />
                <div className='absolute bottom-[0%] bg-black opacity-60 w-full h-full' />
            </div>

            <div className='absolute z-10 left-1/2 -translate-x-1/2 bottom-[10%] lg:bottom-[20%] xl:bottom-[15%] w-[90%] md:w-[500px] mx-auto p-6 flex flex-col items-center gap-8
                rounded-md backdrop-opacity-80 bg-[#ffffff1e] shadow-lg shadow-[#00000081]'>
                
                <h1 className='text-3xl sm:text-4xl font-bold text-white'>Sign In</h1>
                
                <form onSubmit={submitHandler} className='w-full flex flex-col gap-4'>

                    <label htmlFor="email">
                        <input 
                            type="email" id='email' name='email' placeholder='Email' required
                            className='w-full py-1.5 sm:py-2 px-3 border border-black rounded-md'
                            onChange={changeHandler}
                        />
                    </label>

                    <label htmlFor="password">
                        <input 
                            type="password" id='password' name='password' placeholder='Password' required
                            className='w-full py-1.5 sm:py-2 px-3 border border-black rounded-md'
                            onChange={changeHandler}
                        />
                    </label>

                    <button className='py-2 sm:py-3 rounded bg-[#1a1a1a] text-white hover:bg-[#222222]'>
                        {loading ? "Loading..." : "Login"}
                    </button>

                    <OAuth />

                    <Link to='/sign-up'>
                        <span className='text-sm sm:text-base text-white'>Dont have an account? Sign Up</span>
                    </Link>
                    
                    <p className='text-red-500'>
                        {error ? error : ""}
                    </p>

                </form>
            </div>

        </main>
    )
}

export default Login