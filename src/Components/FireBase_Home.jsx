import React from 'react'
import AddQuiz from './AddQuiz'
import { BrowserRouter, Route, Routes } from 'react-router'
import Fire_root from './Fire_root'
import ViewQuiz from './ViewQuiz'
import PlayQuiz from './PlayQuiz'
import Register from './Register'
import Login from './Login'
import Context from './Context'
import { Home } from './Home'
import { ToastContainer } from 'react-toastify'

export default function Firebase_Home() {
  return (
   <BrowserRouter>
   <Context>
   <Routes>
      <Route element={<Fire_root/>}>
        <Route path='/add_quiz' element={<AddQuiz/>}></Route>
        <Route path='/view_quiz' element={<ViewQuiz/>}></Route>
        <Route path='/play_quiz' element={<PlayQuiz/>}></Route>
      </Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
     
    </Routes>
   </Context>
   <ToastContainer/>
   </BrowserRouter>
   
  )
}
