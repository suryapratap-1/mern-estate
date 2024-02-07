import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase"
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/slices/userSlice';
import { useNavigate } from "react-router-dom";

const OAuth = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const OAuthHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/v1/auth/google', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        name: result.user.displayName, 
                        email: result.user.email, 
                        photo: result.user.photoURL 
                    })
                }
            )
            const data = res.json();
            dispatch(signInSuccess(data));
            navigate("/");
        } 
        catch (error) {
            console.log("Couldn't sign in with Google", error);
        }
    }

    return (
        <button onClick={OAuthHandler} type='button' className='py-3 flex items-center justify-center gap-2 border-2 rounded-lg'>
            <FcGoogle className=' text-2xl'/>
            <p>CONTINUE WITH GOOGLE</p>
        </button>
    )
}

export default OAuth