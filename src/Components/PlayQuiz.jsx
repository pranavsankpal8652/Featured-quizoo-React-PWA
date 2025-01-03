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
  var [timer, setTimer] = useState(3600)
  var [score, setScore] = useState(0)
  var interval
  const location = useLocation()
  const [quizess, setQuizess] = useState([])
  var [Published, setPublished] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    // Reset state when component mounts
    setTimer(3600);
    setuserResponse([]);
    setScore(0);
    setResultPage(false);
    setQuizess([])
    if (!localStorage.getItem('StudentInfo')) {
      navigate('/student_login')
    }
  }, []);

  //Submit Quiz
  const SubmitQUiz = () => {
    if (confirm('Are You sure to Submit the Quiz')) {
      setResultPage(true)
      // console.log(userResponse)
      const db = getDatabase(app);
      userResponse.map((response) => {
        if (response.answer === response.correctAns) {
          setScore(prevscore => prevscore + 1)
        }
        set(ref(db, 'usersScore/' + response.name + '_' + response.roll + '_' + Date.now()), response);

      })

      clearInterval(interval)
      toast.success('Quiz Submitted Successfully..')
      toast.info('You can close the App now')

    }
  }
  //Quiz Publish Status Check
  useEffect(() => {
    const db = getDatabase(app);
    const starCountRef = ref(db, 'publishQuiz');
    onValue(starCountRef, (data) => {
      if (data.val()) {
        const publsh = data.val()
        if (publsh.isPublished) {
          setPublished(true)
        }
      }

    })
  }, [])

  //slider
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

  //setQuizessfromDB
  useEffect(() => {

    const db = getDatabase(app);
    const starCountRef = ref(db, 'quizess');
    onValue(starCountRef, (data) => {
      var quiz_arr = []
      if(data.val()){
        const quiz = data.val()
        for (var question of Object.values(quiz)) {
          // console.log(question)
          quiz_arr.push(question)

        }
        setQuizess([...quiz_arr])
      }
      else{
        setQuizess([])

      }
    });
  }, [])

  //timer
  useEffect(() => {
    if (quizess.length == 0 && !Published) {
      return () => clearInterval(interval)
    }
    else {
      if (timer > 0) {
        interval = setInterval(() => {
          setTimer((prevtimer) => prevtimer - 1)
        }, 1000);
        return () => clearInterval(interval)
      }
      else {
        setResultPage(true)
        const db = getDatabase(app);
        userResponse.map((response) => {
          if (response.answer === response.correctAns) {
            setScore(prevscore => prevscore + 1)
          }
          set(ref(db, 'usersScore/' + response.name + '_' + response.roll + '_' + Date.now()), response);

        })
        toast.success('Quiz Submitted Successfully..')
        toast.info('You can close the App now')
        return () => clearInterval(interval)

      }
    }

  }, [timer, quizess.length])

  //formarTimer
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  };
  return (
    <div id="quiz_slider" className="p-5 min-h-screen bg-gradient-to-br from-blue-300 via-transparent to-blue-100">
      {
        ResultPage
          ?
          <Quiz_Result score={score} quizess={quizess} />
          :
          <Slider {...settings}>
            {
              (quizess.length > 0 && Published)
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
      {
        (quizess.length > 0 && Published)
          ?
          <>
            <div className="absolute top-20 right-20 bg-red-400 p-2">
              Time: {formatTime(timer)} Second
            </div>
            <div className={`absolute top-[90%] right-[40%] bg-blue-400 p-2 rounded-lg d hover:bg-blue-700 hover:text-white ${ResultPage ? 'hidden' : ''}`}>
              <button onClick={SubmitQUiz} >
                Submit
              </button>
            </div>
          </>
          :
          ''

      }

    </div>
  );
}
