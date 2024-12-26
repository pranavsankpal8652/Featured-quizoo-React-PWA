import {React,StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import AddQuiz from './Components/AddQuiz'
import { BrowserRouter, Route, Routes } from 'react-router'
import Fire_root from './Components/Fire_root'
import ViewQuiz from './Components/ViewQuiz'
import PlayQuiz from './Components/PlayQuiz'
import Register from './Components/Register'
import Login from './Components/Login'
import Context from './Components/Context'
import { Home } from './Components/Home'
import { ToastContainer } from 'react-toastify'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";;
import './index.css'
import Student_Login from './Components/Student_Login'
import Final_Results from './Components/Final_Results'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
   <Context>
   <Routes>
      <Route element={<Fire_root/>}>
        <Route path='/add_quiz' element={<AddQuiz/>}></Route>
        <Route path='/view_quiz' element={<ViewQuiz/>}></Route>
        <Route path='/play_quiz' element={<PlayQuiz/>}></Route>
        <Route path='/results' element={<Final_Results/>}></Route>
      </Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/student_login' element={<Student_Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
     
    </Routes>
   </Context>
   <ToastContainer/>
   </BrowserRouter>
  </StrictMode>,
)
