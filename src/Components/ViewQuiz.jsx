import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  update,
  limitToFirst,
  query,
  get,
  orderByKey,
  endBefore,
  limitToLast,
} from "firebase/database";
import app from "./config/firebase";
import { data, useNavigate } from "react-router";
import { context } from "./Context";
import { toast } from "react-toastify";
import Second_Auth from "./Second_Auth";

export default function ViewQuiz() {
  const { login, password, role } = useContext(context);
  const navigate = useNavigate();
  const db = getDatabase(app);
  const quizessRef = ref(db, "quizess");

  useEffect(() => {
    if (!login && role !== "Admin") {
      toast.warning("Login as Admin first ");
      navigate("/");
    }
  }, [login]);
  const [quizess, setQuizess] = useState({});

  const [Publish, setPublished] = useState({});

  const [pageLoader, setPageLoader] = useState(true);

  const [loadMoreQuizess, setLoadMore] = useState(true);

  const [lastKey, setLastKey] = useState(null);

  const getQuizess = (snapshot) => {
    if (snapshot.exists()) {
      var quiz_obj = {};
      const Totalquizes = snapshot.val();
      const keys = Object.keys(Totalquizes);
      // console.log("keys", keys)
      setLastKey(keys[keys.length - 1]); // Store the last key for the next query
      // console.log("Totalquizes",Object.values(Totalquizes))
      Object.entries(Totalquizes).map(([key, value], index) => {
        quiz_obj[key] = Object.values(value);
        // console.log("value",key,':',Object.values(value))
      });
      //    })
      // console.log("quizess_arr",quiz_obj)
      return quiz_obj;
    } else {
      return [];
    }
  };
  //setQuizessfromDB
  useEffect(() => {
    async function loadQuizess() {
      const starCountRef = query(quizessRef, orderByKey(), limitToLast(1));
      const snapshot = await get(starCountRef);

      if (snapshot.val()) {
        // console.log("snapshot",snapshot.val())
        var quizessList = getQuizess(snapshot);
        console.log("quizessList", quizessList);

        setQuizess(quizessList); //to state
        setPageLoader(false);

        // // Enable Load More button only if the total blogs fetched exceed 6
        const totalRef = await get(quizessRef);
        const totalCount =
          totalRef.size || Object.keys(totalRef.val() || {}).length;

        if (totalCount > 1) {
          setLoadMore(true);
        } else {
          setLoadMore(false);
        }
      } else {
        setLoadMore(false); // No blogs to load
      }
    }
    loadQuizess();
  }, []);

  //setPublishedTruefromDB
  useEffect(() => {
    const published = ref(db, "publishedQuizzes");
    onValue(
      published,
      (data) => {
        const currentlyPublished = data.val();
        // console.log(currentlyPublished)
        if (currentlyPublished) {
          Object.entries(currentlyPublished).map(([key, value]) => {
            // console.log(key, value)
            setPublished((prev) => ({
              ...prev,
              [key]: value.isPublished,
            }));
          });
        }
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  const deleteQuiz = (quiz, index) => {
    // console.log(arrIndex)
    if (quiz) {
      if (confirm("Are you Sure TO Delete This Quiz?")) {
        const quiz = ref(db, `quizess/${index}`);

        remove(quiz)
          .then(() => {
            const updatedQuizzes = { ...quizess }; // Clone the single object
            delete updatedQuizzes[index]; //
            console.log(updatedQuizzes);
            setQuizess({ ...updatedQuizzes });
            toast.info("Quiz deleted");
          })
          .catch((err) => {
            toast.error(err);
          });
        const Published = ref(db, `publishedQuizzes/${index}`);
        remove(Published);
        return () => unsubscribe();
      }
    }
  };

  const publishQuiz = (quiz, index) => {
    // console.log(quiz)
    if (quiz) {
      const published = ref(db, `publishedQuizzes/${index}`);
      onValue(
        published,
        (data) => {
          if (data.exists()) {
            if (confirm("UnPublish this Quiz?")) {
              remove(published)
                .then(() => {
                  toast.info("Quiz UnPublished");
                  setPublished((prev) => ({
                    ...prev,
                    [index]: false,
                  }));
                })
                .catch((err) => toast.error(err.message));
            }
            // toast.info('Quiz UnPublished')
          } else {
            if (confirm("Publish this Quiz?")) {
              set(published, { isPublished: true })
                .then(() => {
                  toast.success("Quiz Published");
                  setPublished((prev) => ({
                    ...prev,
                    [index]: true,
                  }));
                })
                .catch((err) => toast.error(err.message));
            }
          }
        },
        {
          onlyOnce: true,
        }
      );
    } else {
      toast.error("No Questions Yet");
    }
  };

  const loadmore = async () => {
    //  console.log('lastkey',lastKey)

    const quizessQuery = query(
      quizessRef,
      orderByKey(),
      endBefore(lastKey),
      limitToLast(5)
    );
    const snapshot = await get(quizessQuery);
    // console.log("snapshot", snapshot.val());
    if (snapshot.val()) {
      const quiz = getQuizess(snapshot);
      // console.log(quiz)

      // console.log(totalBlogsLength)
      const totalQuizfetched =
        Object.keys(quizess).length + Object.keys(quiz).length;

      // console.log('totalLength', totalLength)
      const TotalQuizess = await get(quizessRef);
      // console.log(TotalBlogs.val())
      const totalLength = Object.keys(TotalQuizess.val()).length;
      setQuizess((prev) => {
        const updatedQuizess = { ...prev, ...quiz };
        return updatedQuizess;
      });
      console.log("totalQuizfetched", totalQuizfetched);
      console.log("totalLength", totalLength);
      if (totalQuizfetched == totalLength) {
        setLoadMore(false);
      }
    } else {
      setLoadMore(false);
    }
  };

  return (
    <>
      {password ? "" : <Second_Auth />}
      <div
        className={`max-w-[100%] bg-gradient-to-br from-blue-300 via-transparent to-blue-100 min-h-screen ${
          password ? "" : "blur-md"
        } `}
      >
        <div
          className={`text-center flex justify-center items-center h-screen ${
            pageLoader ? "block" : "hidden"
          }`}
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="blue"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="green"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        {Object.keys(quizess).length > 0 ? (
          <>
            {Object.entries(quizess).map(([key, quiz], index) => {
              //   console.log(key, quiz);
              return (
                <div
                  className="relative max-w-[1340px] mx-auto px-6 py-6 shadow-gray-700 shadow-xl mb-[50px]"
                  key={key}
                >
                  <div className="text-black font-bold italic underline p-2 text-lg">
                    {key}
                  </div>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 w-auto ">
                          Question Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 hidden md:table-cell"
                        >
                          Option1
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 hidden md:table-cell"
                        >
                          option2
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 hidden md:table-cell"
                        >
                          OPtion3
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 hidden md:table-cell"
                        >
                          OPtion4
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Correct Answer
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {quiz &&
                        quiz.map((question, index) => {
                          return (
                            <tr
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
                              key={index}
                            >
                              <th
                                scope="col"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[500px] text-wrap"
                              >
                                {question.title}
                              </th>
                              <td className="px-6 py-4 hidden md:table-cell">
                                {question.option1}
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell">
                                {question.option2}
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell">
                                {question.option3}
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell">
                                {question.option4}
                              </td>
                              <td className="px-6 py-4 w-[100px]">
                                {question.correctAns}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {quiz && (
                    <>
                      <div className="w-fit mx-auto my-7">
                        <button
                          className="text-sm text-white bg-green-600 hover:bg-green-800 rounded-lg p-[10px_20px]"
                          onClick={() => publishQuiz(quiz, key)}
                        >
                          {Publish[key] ? "Unpublish Quiz" : "Publish Quiz"}
                        </button>
                      </div>
                      <div className="w-fit mx-auto mt-7">
                        <button
                          className="text-sm text-white bg-cyan-800 hover:bg-slate-500 rounded-lg p-[10px_20px]"
                          onClick={() => deleteQuiz(quiz, key)}
                        >
                          Delete This Quiz
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
            <div
              className={`mx-auto w-fit py-10 ${
                loadMoreQuizess ? "block" : "hidden"
              }`}
            >
              <button
                className={`text-sm text-white bg-gradient-to-r from-violet-700 via-blue-500 to-blue-300 brightness-95 p-[10px_20px] rounded-lg ${
                  loadMoreQuizess ? "block" : "hidden"
                }`}
                onClick={loadmore}
              >
                Load More
              </button>
            </div>
          </>
        ) : (
          <div
            className={`text-4xl text-red-600 text-center flex justify-center items-center h-screen overflow-hidden1 ${
              pageLoader ? "hidden" : "block"
            }`}
          >
            No Quizess Yet
          </div>
        )}
      </div>
    </>
  );
}
