import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { use } from 'react';
import { context } from './Context';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Student_Login() {
    const { role } = useContext(context)
    // console.log(role)
    const navigate = useNavigate()



    const loginUser = (e) => {
        e.preventDefault()
        const student={
            name:e.target.Name.value,
            roll:e.target.Roll.value
        }
        localStorage.setItem('StudentInfo',JSON.stringify(student))
    //    console.log(JSON.parse(localStorage.getItem('StudentInfo')))
       navigate('/play_quiz')
        e.target.reset()
    }




    return (

        <div className='max-w-[100%] h-screen bg-gradient-to-br from-blue-300 via-transparent to-blue-50 py-7'>
            <form class="max-w-sm mx-auto p-4" onSubmit={loginUser} autoComplete='off'>

                <div class="relative w-full my-10">
                    <input type="text" id="floating_standard" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name='Name' required autoFocus/>
                    <label for="floating_standard" class="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter Your Name</label>
                </div>

                <div class="relative my-5">
                    <input type="text" id="floating_standard_pass" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name='Roll' required />
                    <label for="floating_standard" class="absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter Your Roll Number</label>
                </div>

                <button type="submit" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 my-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Click to Start Quiz</button>
            </form>

        </div>


    )
}
