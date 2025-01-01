import React, { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import app from './config/firebase';
import { data, useNavigate } from 'react-router';
import { context } from './Context';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import Second_Auth from './Second_Auth';

export default function ViewQuiz() {
    const { login, password, role } = useContext(context)
    const navigate = useNavigate()

    useEffect(() => {
        if (!login && role !== 'Admin') {
            toast.warning('Login as Admin first ')
            navigate('/')
        }
    }, [login])
    const [quizess, setQuizess] = useState([])
    useEffect(() => {

        const db = getDatabase(app);
        const starCountRef = ref(db, 'quizess');
        onValue(starCountRef, (data) => {
            var quiz_arr = []
            if (data.exists()) {
                const quiz = data.val();

                for (var question of Object.values(quiz)) {
                    // console.log(question)
                    quiz_arr.push(question)

                }
                setQuizess([...quiz_arr])
            }
        });
    }, [])

    const deleteQuiz = () => {
        if (quizess.length > 0) {
            if (confirm('Are you Sure TO Delete This Quiz?')) {
                const db = getDatabase(app);
                const quizList = ref(db, 'quizess/');
                remove(quizList)
                    .then(() => {
                        toast.info('Quiz deleted')
                        setQuizess([])
                    })
                    .catch((err) => {
                        toast.error(err)
                    })
                    const Published = ref(db, 'publishQuiz');
                    remove(Published)
                    return () => unsubscribe();
            }
          

        }
        else {
            toast.warn('No Quiz Yet')
        }

    }
    const publishQuiz = () => {
        if (quizess.length > 0) {
            if (confirm('Publish this Quiz?')) {
                const db = getDatabase(app);
                set(ref(db, 'publishQuiz'), {isPublished:true});
                toast.success('Quiz Published')

            }

        }
        else {
            toast.error('No Quiz Yet')
        }
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
                <div class="relative overflow-x-auto max-w-[1340px] mx-auto p-6">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3 w-auto " >
                                    Question Title
                                </th>
                                <th scope="col" class="px-6 py-3 hidden md:table-cell">
                                    Option1
                                </th>
                                <th scope="col" class="px-6 py-3 hidden md:table-cell">
                                    option2
                                </th>
                                <th scope="col" class="px-6 py-3 hidden md:table-cell">
                                    OPtion3
                                </th>
                                <th scope="col" class="px-6 py-3 hidden md:table-cell">
                                    OPtion4
                                </th>
                                <th scope="col" class="px-6 py-3 ">
                                    Correct Answer
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                quizess.length > 0
                                    ?
                                    quizess.map((quiz, index) => {
                                        return (
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {quiz.title}
                                                </th>
                                                <td class="px-6 py-4 hidden md:table-cell">
                                                    {quiz.option1}
                                                </td>
                                                <td class="px-6 py-4 hidden md:table-cell">
                                                    {quiz.option2}
                                                </td>
                                                <td class="px-6 py-4 hidden md:table-cell">
                                                    {quiz.option3}
                                                </td>
                                                <td class="px-6 py-4 hidden md:table-cell">
                                                    {quiz.option4}
                                                </td>
                                                <td class="px-6 py-4 w-[100px]">
                                                    {quiz.correctAns}
                                                </td>
                                            </tr>
                                        )
                                    })

                                    :
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" colSpan={6}>
                                            No Quizes Yet!
                                        </th>

                                    </tr>
                            }


                        </tbody>
                    </table>
                    <div className='w-fit mx-auto my-7'>
                        <button className='text-md text-white bg-green-600 hover:bg-green-800 rounded-lg p-[10px_20px]' onClick={publishQuiz}>
                            Publish This Quiz
                        </button>
                    </div>
                    <div className='w-fit mx-auto my-7'>
                        <button className='text-md text-white bg-cyan-800 hover:bg-slate-500 rounded-lg p-[10px_20px]' onClick={deleteQuiz}>
                            Delete This Quiz
                        </button>
                    </div>
                </div>
            </div>
        </>




    )
}
