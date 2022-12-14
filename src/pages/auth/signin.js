import React, { useState } from 'react';
import {BsTwitter} from 'react-icons/bs';
import { getAuth, signOut, signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase';
import {Store} from '../../store'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';
import { googleAuth } from '../../actions/userAuth';
import { useDispatch, useSelector } from 'react-redux';
const Signin = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();
    
    const googleSignIn =  (provider) => {
        signInWithPopup(auth, provider)
        const {displayName, photoURL, email, accessToken} = auth?.currentUser ? auth?.currentUser : {};
        console.log('user', auth?.currentUser);
        
        const user = {
          userName: displayName,
          image: photoURL,
          email,
          password: '',
          token: accessToken,
        }
        if (user?.email) {
          dispatch(googleAuth(user));
          localStorage.setItem('user', JSON.stringify(user))
        }
        
        // dispatch({type: 'SIGN_IN', payload: user})
      }
      
      const handleGoogleSignIn = () => {
        try {
          const provider = new GoogleAuthProvider();
           googleSignIn(provider);
           const user = JSON.parse(localStorage.getItem('user'))
           if (user?.token) navigate('/', {replace: true},)
           
        }
        catch(err) {
          console.log(err)
        }
      }
  return (
    <div className='flex justify-center mt-20 h-[100%] items-center space-x-8'>
        <img className='w-[19rem] h-[20rem] object-cover rotate-6 hidden md:inline-flex ' src='https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch13lingotweet.png.twimg.1920.png' alt='twitter on the phone' />
        <div className='flex flex-col'>
            {/* <div className='flex flex-col items-center justify-center my-auto h-[100%]'>
                <BsTwitter className='text-[#57a9f5] text-[8rem] mb-[1.5rem]' />
                <p>This is a social media app</p>
                
            </div> */}
            {isLogin ? <LoginForm /> : <SignupForm />}
            {isLogin ? <button className='text-gray-500 text-[1.1rem] px-[1rem] py-[.4rem] bg-gray-200 rounded-lg mt-[1rem] hover:bg-gray-300 font-bold  ' onClick={() => setIsLogin(false)}>Don't have an account ?</button> : <button className='text-gray-500 text-[1.1rem] px-[1rem] py-[.4rem] bg-gray-200 rounded-lg mt-[1rem] hover:bg-gray-300 font-bold  ' onClick={() => setIsLogin(true)}>Already have an account ?</button>}
            <button onClick={() => handleGoogleSignIn()} className='text-center  italic mt-[.7rem] bg-red-400 rounded-lg p-[.5rem] text-white text-xl hover:bg-red-500'>Sign In With Google</button>
        </div>
    </div>
  )
}

export default Signin
