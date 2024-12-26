import React, { createContext, useState } from 'react'


const context=createContext() 
export default function Context({children}) {

   var checkUserSession=localStorage.getItem('user')?true:false
   // console.log("checkUserSession"+checkUserSession)
   var checkUserRole=localStorage.getItem('Role') ?? 'Student'

   const [login,setLogin]=useState(checkUserSession)
   const [role,setRole]=useState(checkUserRole)

   const data={login,setLogin,role,setRole}
  return (
   <context.Provider value={data}>
      {children}
   </context.Provider>
  )
}
export {context}
