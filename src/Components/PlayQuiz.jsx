import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { getDatabase, ref, onValue, set } from "firebase/database";
import app from "./config/firebase";
import Quiz_Section from "./Quiz_Section";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { context } from "./Context";
import Quiz_Result from "./Quiz_Result";
import CustomSlider from "./CustomSlider";

export default function PlayQuiz() {
	var [userResponse, setuserResponse] = useState([])
	var [ResultPage, setResultPage] = useState(false)
	var [timer, setTimer] = useState(3600)
	var [score, setScore] = useState(0)
	var interval
	const location = useLocation()
	const [quizess, setQuizess] = useState([])
	const [Published, setPublished] = useState('')
	const [loading, setLoading] = useState(false)
	const db = getDatabase(app);

	const navigate = useNavigate()
	// Reset state when component mounts



	//Submit Quiz
	const SubmitQUiz = () => {
		if (confirm('Are You sure to Submit the Quiz')) {
			setResultPage(true)
			// console.log(userResponse)
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
	const publish = ref(db, 'publishedQuizzes') ?? null;
	//Quiz Publish Status Check
	useEffect(() => {
		if(publish!==null)
		{
			onValue(publish, (data) => {
				if (data.val()) {
					// console.log(data.val())
					const Publish = data.val()
					// console.log(publish)
					Object.entries(Publish).map(([key, val]) => {
						if (val.isPublished) {
							setPublished(key)
						}
					})
				}
	
			},)
		}
	
	}, [publish])

	//slider
	var settings = {
		dots: false,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 1000,
		arrows: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: false,
					dots: false,
					arrows: false,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					infinite: false,
					dots: false,
				}
			},
			{
				breakpoint: 320,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					infinite: false,
					dots: false,

				}
			}
		]

	};

	//setQuizessfromDB
	useEffect(() => {
		if (Published !== '') {
			setLoading(true)
			// console.log("Published", Published)
			const starCountRef = ref(db, `quizess/${Published}`);
			onValue(starCountRef, (data) => {
				var quiz_arr = []
				// console.log(data.val())
				if (data.exists()) {
					const quiz = data.val()
					for (var question of Object.values(quiz)) {
						// console.log(question)
						quiz_arr.push(question)

					}
					// console.log(quiz_arr)
					setQuizess([...quiz_arr])
					setLoading(false)
					document.documentElement.requestFullscreen()
				}
				else {
					setQuizess([])
					setLoading(false)

				}

			});
		}

	}, [Published])

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
		<>

			<div className="p-5 min-h-screen bg-gradient-to-br from-blue-300 via-transparent to-blue-100 relative ">
				<div className={`text-center flex justify-center items-center h-screen ${loading ? 'block' : 'hidden'}`}>
					<div role="status">
						<svg aria-hidden="true" className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="pink" />
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="green" />
						</svg>
						<span className="sr-only">Loading...</span>
					</div>
				</div>
				{
					ResultPage
						?
						<Quiz_Result score={score} quizess={quizess} />
						:
						<>
							{
								quizess.length > 0 && Published !== "" &&
							
										quizess.map((quiz, index) => (
											<Quiz_Section
												quiz={quiz}
												userResponse={userResponse}
												setuserResponse={setuserResponse}
												key={index}
											/>
										))
								
							}
							{
								(quizess.length == 0) && !loading
								&&
								<div className={`text-4xl text-red-600 text-center flex justify-center items-center h-screen `}>
									No Quizess Yet!
								</div>
							}

						</>



				}
				{
					(quizess.length > 0 && Published != '')
						?
						<>
							<div className="absolute top-2 right-20 bg-red-400 p-2">
								Time: {formatTime(timer)} Second
							</div>
							<div className={`text-center text-lg bg-blue-400 p-2 rounded-lg d hover:bg-blue-700 hover:text-white ${ResultPage ? 'hidden' : ''}`}>
								<button onClick={SubmitQUiz} >
									Submit
								</button>
							</div>
						</>
						:
						''

				}

			</div>


		</>

	);
}
