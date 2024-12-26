import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { context } from './Context'
import { toast } from 'react-toastify'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const { login, setLogin } = useContext(context)
  const navigate = useNavigate()
  const [Canvas, setCanvas] = useState(false)
  const [profileOptions, setProfileOPtions] = useState(false)
  const { role } = useContext(context)
  const current_user = JSON.parse(localStorage.getItem('StudentInfo'))
  const showcanvas = () => {
    setCanvas(!Canvas)
  }
  const playquiz = () => {
    if (!login) {
      toast.warning('Login First to give quiz!')
      navigate('/')
    }
    else {
      navigate('/play_quiz')
    }
  }

  const openMenu = () => {
    setProfileOPtions(!profileOptions)
  }
  const Logout = () => {
    setLogin(false)
    localStorage.clear()
    navigate('/')
  }
  const [AdminInfo,setAdminInfo]=useState({
    Name:'',
    Email:''
  })
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userName=user.displayName
       const  userEmail=user.email
      setAdminInfo({Name:userName,Email:userEmail})
        // console.log(user.email)
        // ...
      } 
    });
  }, [])
  return (
    <>
      {
        (role === 'Student')
          ?
          <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

              <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={openMenu}>
                  <span class="sr-only">Open user menu</span>
                  <img class="w-8 h-8 rounded-full" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" alt="user photo" />
                </button>
                <div class={`z-50 ${profileOptions ? '' : 'hidden'}  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown absolute top-[100%] `}>
                  <div class="px-4 py-3">
                    <span class="block text-sm text-gray-900 dark:text-white">{(current_user.name).toUpperCase()}</span>
                    <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{(current_user.name).toUpperCase() + '-' + current_user.roll}</span>
                  </div>
                  <ul class="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-nowrap" onClick={Logout}>Sign out</a>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          </nav>
          :
          <nav class="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-10 max-w-[100%]">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={openMenu}>
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" alt="user photo" />
              </button>
              <div class={`z-50 ${profileOptions ? '' : 'hidden'}  my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown absolute top-[100%] `}>
                <div class="px-4 py-3">
                  <span class="block text-sm text-gray-900 dark:text-white">{AdminInfo.Name}</span>
                  <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{AdminInfo.Email}</span>
                </div>
                <ul class="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-nowrap" onClick={Logout}>Sign out</a>
                  </li>
                </ul>
              </div>
              <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" onClick={showcanvas}>
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
              <div class={`${Canvas ? 'block' : 'hidden'} w-full md:block md:w-auto z-10`} id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link to="/add_quiz" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:focus:text-blue-700 md:p-0 dark:text-white md:focus:dark:text-blue-500" aria-current="page">Add Quiz</Link>
                  </li>

                  <li>
                    <Link to="/view_quiz" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent focus:text-blue-700 ">View Quiz</Link>
                  </li>

                  <li>
                    <Link to="/Results" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent focus:text-blue-700 ">Results</Link>
                  </li>


                </ul>
              </div>


            </div>
          </nav>





      }


    </>
  )
}
