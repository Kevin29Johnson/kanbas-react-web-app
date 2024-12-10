import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const ATTEMPTS_API = `${REMOTE_SERVER}/api/attempts`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteQuiz = async (quizId: any) => {
 const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
 return response.data;
};
export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
  };
  
export const publishQuiz=async (quizId:any)=>{
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/publish`);
  return data;
 
}

export const unPublishQuiz=async (quizId:any)=>{
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/unpublish`);
  return data;
 
}

export const submitQuizAttempt= async (userId: string, quizId: string, answers: any[])=>{
  const response = await axios.post(ATTEMPTS_API, {
    userId,
    quizId,
    answers,
  });
  return response.data;
}

export const getAttemptsForUserAndQuiz = async (userId: any, quizId: any) => {
  const response = await axios.get(`${ATTEMPTS_API}/${userId}/${quizId}`);
  return response.data;
};