import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { use } from 'react';
import { context } from './Context';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
    const {login,setLogin}=useContext(context)
    const {role}=useContext(context)
    // console.log(role)
    const navigate=useNavigate()

    useEffect(()=>{
       
        if(login && role=='Admin'){
          navigate('/add_quiz')

        }
        
    },[login])

     const loginUser=(e)=>{
                e.preventDefault()
                // console.log(e.target.email)
                const auth = getAuth();
                signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    toast.success('Login Succeed!')
                    setLogin(true)
                    localStorage.setItem('user',JSON.stringify(user))

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage)
                    // ..
                });
                e.target.reset()
            }

        
      const loginWithGmail=()=>{
          const auth = getAuth();
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              // IdP data available using getAdditionalUserInfo(result)
              // ...
               toast.success('Login Succeed!')
                setLogin(true)
                localStorage.setItem('user',JSON.stringify(user))
            }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.customData.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // toast.error(errorMessage)
              // ...
            });
      }
    
  return (
   
<div className='max-w-[100%] h-screen bg-gradient-to-br from-blue-300 via-transparent to-blue-50 py-7'>
<form class="max-w-sm mx-auto p-4" onSubmit={loginUser} autoComplete='off'>
  
<div class="relative w-full my-10">
  <input type="email" id="floating_standard" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name='email'/>
  <label for="floating_standard" class="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter Your Email</label>
</div>

<div class="relative my-5">
    <input type="password" id="floating_standard_pass" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name='password'/>
    <label for="floating_standard" class="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter Your Password</label>
</div>

  <button type="submit" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
  <button type='button' class="text-white lg:mx-5  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-4 text-center dark:bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={loginWithGmail}>Login with google</button>
</form>
<div className='my-4 w-fit mx-auto'>
    <span>Not Registed?</span>
    <Link to="/register" className='underline'>Register here..</Link>
  </div>
</div>


  )
}
