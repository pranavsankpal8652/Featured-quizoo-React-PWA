import React, { useContext, useEffect } from 'react'
import { getDatabase, ref, set } from "firebase/database";
import app from './config/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { context } from './Context';
import Second_Auth from './Second_Auth';

export default function AddQuiz() {
  const { login, password, role } = useContext(context)
  const navigate = useNavigate()


  useEffect(() => {
    if (!(login && role == 'Admin')) {
      navigate('/')
    }
  }, [login])
  const AddQuestion = (e) => {
    e.preventDefault()
    var QuizNumber=e.target.QuizNumber.value
    const quiz = {
      title: e.target.question.value,
      option1: e.target.option1.value,
      option2: e.target.option2.value,
      option3: e.target.option3.value,
      option4: e.target.option4.value,
      correctAns: e.target.CorrectAnswer.value
    }


    const db = getDatabase(app);
    set(ref(db, `quizess/${QuizNumber}/` + Date.now()), quiz);
    toast.success('Adding the Question Succeed')
    e.target.reset()
  }
  return (
    <>
      {
        password
          ?
          ''
          :
          <Second_Auth />
      }
      <div className={`max-w-[100%] bg-gradient-to-br from-blue-300 via-transparent to-blue-100 min-h-screen ${password ? '' : 'blur-md'}`}>
        <form className="max-w-sm mx-auto p-4" autoComplete='off' onSubmit={AddQuestion}>
          <div className="mb-5">
            <input type="text" id="QuizNumber" name='QuizNumber' className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Quiz Number/Subject" required />
          </div>
          <div className="mb-5">
            <input type="text" id="question" name='question' className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Question" required />
          </div>
          <div className="mb-5">
            <input type="text" id="option1" name='option1' className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Option1" required />
          </div>
          <div className="mb-5">
            <input type="text" id="option2" name='option2' className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Option2" required />
          </div>
          <div className="mb-5">
            <input type="text" id="option3" name='option3' className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Option3" required />
          </div>
          <div className="mb-5">
            <input type="text" id="option4" name='option4' className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Option4" required />
          </div>
          <div className="mb-5">
            <label htmlFor="CorrectAnswer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select id="CorrectAnswer" name='CorrectAnswer' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option selected value="">Choose a Correct Answer</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
        </form>
      </div>


    </>
  )
}
