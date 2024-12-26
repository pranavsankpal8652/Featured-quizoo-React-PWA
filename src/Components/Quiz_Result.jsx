import { getDatabase, ref, set } from 'firebase/database';
import React from 'react'
import { Link } from 'react-router'
import app from './config/firebase';

export default function Quiz_Result({score,quizess}) {
    const response=JSON.parse(localStorage.getItem('StudentInfo'))
    const response_name=response.name
    const response_roll=response.roll

       const db = getDatabase(app);
        set(ref(db, 'usersScore/'+response.name+'_'+response.roll),{score:score});

  return (
   <>
    <div class="max-w-sm mx-auto my-20 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="p-5">
              <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ScoreCard</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">You Scored {score}/{quizess.length} </p>
              
          </div>
      </div>
   </>

  )
}
