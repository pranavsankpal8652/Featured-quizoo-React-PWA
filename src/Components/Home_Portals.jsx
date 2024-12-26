import React, { useContext } from 'react'
import { Card, Dropdown } from "flowbite-react";
import { Link, useNavigate } from 'react-router';
import { getDatabase, ref, set } from "firebase/database";
import { context } from './Context';

export default function Home_Portals({ Portal_name, portal_desc }) {
    const { setRole } = useContext(context)
    const navigate = useNavigate()
    const loginAdmin = () => {
        setRole(Portal_name)
        localStorage.setItem('Role', Portal_name)
        navigate('/login')
    }
    const RegisterAdmin = () => {
        setRole(Portal_name)
        localStorage.setItem('Role', Portal_name)
        navigate('/register')
    }
    const loginforStudent=()=>{
        setRole(Portal_name)
        localStorage.setItem('Role', Portal_name)
        navigate('/student_login')
    }

    return (
        <>
            <Card className="max-w-sm animate-fadeIN ">
                <div className="flex flex-col items-center  w-[240px] lg:w-[300px] ">

                    <h5 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{Portal_name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{portal_desc}</span>
                    <div className="mt-4 flex space-x-3 lg:mt-6">
                        {
                            Portal_name === 'Admin'
                                ?

                                <>
                                    <a
                                        className="cursor-pointer   inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                                        onClick={loginAdmin}>
                                        Login Here
                                    </a>
                                    <a
                                        className="cursor-pointer  inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                        onClick={RegisterAdmin}>
                                        Register Here
                                    </a>
                                </>

                                :
                                <a
                                className="cursor-pointer   inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                                onClick={loginforStudent}>
                                Attempt Quiz Here
                            </a>

                        
                    }

                    </div>
                </div>
            </Card>
        </>
    )
}
