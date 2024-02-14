import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/slices/userSlice'

const Signup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.user);
    const [formData, setFormData] = useState({});
    
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
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-1/2 mx-auto p-6 flex flex-col items-center gap-8'>

            <h1 className='text-4xl font-bold'>Sign Up</h1>

            <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                <label htmlFor="username">
                    <input 
                        type="text" name="username" id="username" placeholder='Username'  
                        className=' w-[400px] py-2 px-3 border-2 border-black rounded-sm'
                        onChange={changeHandler}
                    />
                </label>

                <label htmlFor="email">
                    <input 
                        type="email" name="email" id="email" placeholder='Email'  
                        className=' w-[400px] py-2 px-3 border-2 border-black rounded-sm'
                        onChange={changeHandler}
                    />
                </label>

                <label htmlFor="password">
                    <input
                        type="password" name="password" id="password" placeholder='Password'  
                        className=' w-[400px] py-2 px-3 border-2 border-black rounded-sm'
                        onChange={changeHandler}
                    />
                </label>

                <button className=' bg-blue-600 text-white py-3 rounded hover:bg-blue-800'>
                    {loading ? "Loading..." : "Sign Up"}
                </button>

                <OAuth />

                <div className='flex gap-2'>
                    <p>Already have an account?</p>
                    <Link to='/login'>
                        <span className='text-blue-600'>Login</span>
                    </Link>
                </div>

                <p className='text-red-500'>
                    {error ? error : ""}
                </p>
            </form>
        </div>
    )
}

export default Signup