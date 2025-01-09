import React from 'react'
import { Card } from "flowbite-react";

export default function Quiz_Section({ quiz, userResponse, setuserResponse }) {
  // console.log("quiz",quiz)
  const currentUser = JSON.parse(localStorage.getItem('StudentInfo'))
  const getOption = (e) => {
    // console.log(e.target.value)
    var userAnswer = {
      name: currentUser.name,
      roll: currentUser.roll,
      question: e.target.name,
      answer: e.target.value,
      correctAns: quiz.correctAns
    }
    let responsuser = [userAnswer, ...userResponse]
    setuserResponse(responsuser)


  }
  // console.log(userResponse)

  return (
    <>
    <div>
    <Card className="p-5 max-w-md min-h-[350px] mx-auto my-10 ">
          <div className="mb-4 flex items-center justify-between  ">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{quiz.title}</h5>

          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">

                  <div className="min-w-0 flex-1">
                    <label htmlFor={`{${quiz.title}A}`} className="truncate text-sm font-medium text-gray-900 dark:text-white cursor-pointer ">{quiz.option1}</label>
                  </div>
                  <input type="radio" name={`${quiz.title}`} id={`{${quiz.title}A}`} value='A' className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white scale-[1.3]" onClickCapture={(e) => { getOption(e) }}></input>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">

                  <div className="min-w-0 flex-1">
                    <label htmlFor={`{${quiz.title}B}`} className="truncate text-sm font-medium text-gray-900 dark:text-white cursor-pointer">{quiz.option2}</label>
                  </div>
                  <input type="radio" name={`${quiz.title}`} id={`{${quiz.title}B}`} value='B' className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white scale-[1.3]" onClickCapture={(e) => { getOption(e) }}></input>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">

                  <div className="min-w-0 flex-1">
                    <label htmlFor={`{${quiz.title}C}`} className="truncate text-sm font-medium text-gray-900 dark:text-white cursor-pointer">{quiz.option3}</label>
                  </div>
                  <input type="radio" name={`${quiz.title}`} id={`{${quiz.title}C}`} value='C' className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white scale-[1.3]" onClickCapture={(e) => { getOption(e) }}></input>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">

                  <div className="min-w-0 flex-1">
                    <label htmlFor={`{${quiz.title}D}`} className="truncate text-sm font-medium text-gray-900 dark:text-white cursor-pointer">{quiz.option4}</label>
                  </div>
                  <input type="radio" name={`${quiz.title}`} id={`{${quiz.title}D}`} value='D' className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white scale-[1.3]" onClickCapture={(e) => { getOption(e) }}></input>
                </div>
              </li>

            </ul>
          </div>
        </Card>
    </div>
       
     
    </>

  )
}
