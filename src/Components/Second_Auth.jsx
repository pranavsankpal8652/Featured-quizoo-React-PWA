import React, { useContext, useRef } from 'react'
import { context } from './Context'
import { toast } from 'react-toastify'

export default function Second_Auth() {
    const {password,setPassword} = useContext(context)
    const pass=useRef()
    const checkPassword=()=>{
        if(pass.current.value==='rekha777'){
            setPassword(true)
            toast.success('Authorization suceed')
            localStorage.setItem('Password',true)
        }
        else{
            toast.error('Invalid token!')
        }
    }
  return (
   <>

<div  tabindex="-1" class={`${password?'hidden':''} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full animate-pulse`}>
    <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
           
            <div class="p-4 md:p-5 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Enter The Access Token</h3>
                <div className='py-1'>
                <input type='password' className='py-1' ref={pass} required autoFocus></input>
                </div>
                <button data-modal-hide="popup-modal" type="button" class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mt-2" onClick={checkPassword}>
                    Get Access
                </button>
               
            </div>
        </div>
    </div>
</div>

   </>
  )
}
