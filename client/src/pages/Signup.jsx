import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/slices/userSlice'
import toast from 'react-hot-toast';

const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.user);
    const [formData, setFormData] = useState({});

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // console.log(formData)
    
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        try {
            const res = await fetch('/api/v1/auth/sign-up',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                }
            );
            const data = await res.json();
            console.log(data)
            if (data.success === false) {
                dispatch(signInFailure(data.error));
                return;
            };
            dispatch(signInSuccess(data));
            toast.success(data.message);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className=''>

            <div className='relative w-full h-[40rem] z-0'>
                <img className='w-full h-full object-cover'
                    src="/signup-bg.jpg" alt="signup-background" 
                />
                <div className='absolute bottom-[0%] bg-black opacity-60 w-full h-full' />
            </div>

            <div className='absolute z-10 left-1/2 -translate-x-1/2 bottom-20 w-1/3 mx-auto p-6 flex flex-col items-center gap-8 bg-[#ffffff1e] rounded-md backdrop-opacity-80 shadow-lg shadow-[#00000081]'>
                
                <h1 className=' text-white text-4xl font-bold'>Sign Up</h1>

                <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                    <label htmlFor="username">
                        <input
                            className=' w-[400px] py-2 px-3 border border-black rounded-md'
                            onChange={changeHandler}
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder='Username'
                        />
                    </label>

                    <label htmlFor="email">
                        <input
                            className=' w-[400px] py-2 px-3 border border-black rounded-md'
                            onChange={changeHandler}
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder='Email'
                        />
                    </label>

                    <label htmlFor="password">
                        <input
                            className=' w-[400px] py-2 px-3 border border-black rounded-md'
                            onChange={changeHandler}
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder='Password'
                        />
                    </label>

                    <label htmlFor="contactNumber">
                        <input
                            className=' w-[400px] py-2 px-3 border border-black rounded-md'
                            onChange={changeHandler}
                            type="text" 
                            name="contactNumber" 
                            id="contactNumber" 
                            placeholder='+1 0000000000'
                        />
                    </label>

                    <button className=' bg-[#1a1a1a] text-white py-3 rounded hover:bg-[#222222]'>
                        {loading ? "Loading..." : "Sign Up"}
                    </button>

                    <OAuth />

                    <Link to='/login'>
                        <span className='text-white'>Already have an account? Login</span>
                    </Link>

                    <p className='text-red-500'>
                        {error ? error : ""}
                    </p>
                </form>
            </div>

        </main>
    )
}

export default Signup