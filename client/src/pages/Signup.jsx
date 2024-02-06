import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const navigate = useNavigate();
    // const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    
    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };
    
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
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
        if (data.success === false) {
            setError(data.message);
            setLoading(false);
            return;
        };
        setLoading(false);
        setError(null);
        navigate('/');
    };

    return (
        <div className='w-1/2 mx-auto p-6 flex flex-col items-center gap-8'>

            <h1 className='text-4xl font-bold'>Sign Up</h1>

            <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                <label htmlFor="username">
                    <input 
                        type="text" name="username" id="username" placeholder='Username' required 
                        className=' w-[400px] py-2 px-3 border-2 border-black rounded-sm'
                        onChange={changeHandler}
                    />
                </label>

                <label htmlFor="email">
                    <input 
                        type="email" name="email" id="email" placeholder='Email' required 
                        className=' w-[400px] py-2 px-3 border-2 border-black rounded-sm'
                        onChange={changeHandler}
                    />
                </label>

                <label htmlFor="password">
                    <input
                        type="password" name="password" id="password" placeholder='Password' required 
                        className=' w-[400px] py-2 px-3 border-2 border-black rounded-sm'
                        onChange={changeHandler}
                    />
                </label>

                <button className=' bg-blue-600 text-white py-3 rounded hover:bg-blue-800'>
                    {loading ? "Loading..." : "Sign Up"}
                </button>

                <p className='text-red-500'>
                    {error ? error : ""}
                </p>
            </form>
        </div>
    )
}

export default Signup