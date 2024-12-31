import React, { useContext, useEffect, useState } from 'react'
import app from './config/firebase';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { Link } from 'react-router';
import { context } from './Context';
import Second_Auth from './Second_Auth';
import { toast } from 'react-toastify';

export default function Final_Results() {
	const { password } = useContext(context)

	const [Users, setUsers] = useState([])
	useEffect(() => {

		const db = getDatabase(app);
		const starCountRef = ref(db, 'usersScore');
		onValue(starCountRef, (data) => {

			if (data.exists()) {
				const users_list = data.val();
				//  console.log(users_list)
				const user_obj = {};
				for (let [key, response] of Object.entries(users_list)) {
					//    console.log(key)

					const [student_name, roll_no] = key.split('_')
					const studentKey = `${student_name}_${roll_no}`
					if (!user_obj[studentKey]) {
						user_obj[studentKey] = []
					}
					user_obj[studentKey].push(response)
				}
				const user_arr = Object.entries(user_obj).map(([key, responses]) => {
					return { [key]: responses }
				})


				//  console.log(user_obj)

				setUsers([...user_arr])
			}
		});
	}, [])

    const deleteScores=()=>{
        if(confirm('Are you Sure To Delete All the Scores of Quiz?')){
            const db = getDatabase(app);
            const userList=ref(db,'usersScore/');
            remove(userList)
            .then(()=>{
                toast.info('Scores deleted')
                setUsers([])
            })
            .catch((err)=>{
                toast.error(err)
            })
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
				<div class="relative max-w-[1340px] mx-auto  py-6 px-1">
					<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" class="md:px-6 md:py-3 p-2 w-auto" >
									Student Name_Roll
								</th>
								<th scope="col" class="md:px-6 md:py-3 px-2">
									Score
								</th>
								<th scope="col" class="md:px-6 md:py-3 hidden md:block">
									Details
								</th>
							</tr>
						</thead>
						<tbody>
							{
								Users.length > 0
									?
									Users.map((user, index) => {
										return (
											Object.entries(user).map(([user_name, answers]) => {
												// console.log(user_name,answers[0].score)
												return (
													<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
														<th scope="row" class="md:px-6 md:py-4 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
															{user_name}														</th>
														<td class="md:px-6  py-4  text-center md:text-left">
															{answers[0].score}
														</td>
														<td class="px-6 py-4 hidden md:block">
															<Link to='/detail_score' className='underline'>View Details</Link>
														</td>

													</tr>
												)
											})
										)
									})


									:
									<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
										<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" colSpan={6}>
											No Users Yet
										</th>

									</tr>
							}


						</tbody>
					</table>
					<div className='w-fit mx-auto my-7'>
						<button className='text-md text-white bg-cyan-800 hover:bg-slate-500 rounded-lg p-[10px_20px]' onClick={deleteScores}>
							Delete Scores
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
