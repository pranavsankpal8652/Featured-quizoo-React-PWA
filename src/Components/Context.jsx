import React, { createContext, useState } from 'react'


const context=createContext() 
export default function Context({children}) {

   var checkUserSession=localStorage.getItem('user')?true:false
   // console.log("checkUserSession"+checkUserSession)
   var checkUserRole=localStorage.getItem('Role') ?? 'Student'
   var checkPassword=localStorage.getItem('Password')?true:false
   const [login,setLogin]=useState(checkUserSession)
   const [role,setRole]=useState(checkUserRole)
   const [password,setPassword]=useState(checkPassword)
   const [Published,setPublished]=useState(false)
   const data={login,setLogin,role,setRole,password,setPassword,Published,setPublished}
  return (
   <context.Provider value={data}>
      {children}
   </context.Provider>
  )
}
export {context}
