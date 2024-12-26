
"use client";

import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { getDatabase, ref, onValue, set } from "firebase/database";
import app from "./config/firebase";
import Quiz_Section from "./Quiz_Section";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { context } from "./Context";
import Quiz_Result from "./Quiz_Result";

export default function PlayQuiz() {
  var [userResponse, setuserResponse] = useState([])
  var [ResultPage, setResultPage] = useState(false)
  var [timer, setTimer] = useState(25.00)
  var [score, setScore] = useState(0)
  var interval
  const location = useLocation()
  const [quizess, setQuizess] = useState([])
  const navigate=useNavigate()
// console.log(userResponse)
  useEffect(() => {
    // Reset state when component mounts
    setTimer(25.00);
    setuserResponse([]);
    setScore(0);
    setResultPage(false);
    if(!localStorage.getItem('StudentInfo')){
      navigate('/student_login')
    }
  }, [location]);


  //  console.log(userResponse)  
  const SubmitQUiz = () => {
    if (confirm('Are You sure to Submit the Quiz')) {
      setResultPage(true)
      // console.log(userResponse)
      const db = getDatabase(app);
      userResponse.map((response) => {
        if (response.answer === response.correctAns) {
          setScore(prevscore => prevscore + 1)
        }
        set(ref(db, 'usersScore/'+response.name+'_'+response.roll+'_'+Date.now()),response);

      })

      clearInterval(interval)
      toast.success('Quiz Submitted Successfully..')
      toast.info('You can close the App now')

    }
  }

  //  console.log(ResultPage

  var settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: false,
          dots: false
        }
      }
    ]

  };

  useEffect(() => {

    const db = getDatabase(app);
    const starCountRef = ref(db, 'quizess');
    onValue(starCountRef, (data) => {
      var quiz_arr = []
      const quiz = data.val()
      for (var question of Object.values(quiz)) {
        // console.log(question)
        quiz_arr.push(question)

      }
      setQuizess([...quiz_arr])
    });
  }, [])


  useEffect(() => {
    if (quizess.length == 0) {
      return () => clearInterval(interval)
    }
    else  {
      if (timer > 0) {
        interval = setInterval(() => {
          setTimer((prevtimer) => prevtimer - 1)
        }, 1000);
        return () => clearInterval(interval)
      }
      else {
        setResultPage(true)
        userResponse.map((response) => {
          if (response.answer === response.correctAns) {
            setScore(prevscore => prevscore + 1)
          }
        })
        return () => clearInterval(interval)

      }
    }

  }, [timer,quizess.length])

  return (
    <div id="quiz_slider" className="p-5 min-h-screen bg-gradient-to-br from-blue-300 via-transparent to-blue-100">
      {
        ResultPage
          ?
          <Quiz_Result score={score} quizess={quizess} />
          :
          <Slider {...settings}>
            {
              quizess.length > 0
                ?
                quizess.map((quiz, index) => {
                  return (
                    <Quiz_Section quiz={quiz} userResponse={userResponse} setuserResponse={setuserResponse} key={index} />

                  )

                })
                :

                <div className="text-4xl text-red-600 text-center">
                  No Quizess Yet
                </div>


            }
          </Slider>

      }

      <div className="absolute top-20 right-20 bg-red-400 p-2">
        Time:{timer.toFixed(2)}Sec
      </div>
      <div className={`absolute top-[90%] right-[40%] bg-blue-400 p-2 rounded-lg d hover:bg-blue-700 hover:text-white ${ResultPage ? 'hidden' : ''}`}>
        <button onClick={SubmitQUiz} >
          Submit
        </button>
      </div>
    </div>
  );
}
