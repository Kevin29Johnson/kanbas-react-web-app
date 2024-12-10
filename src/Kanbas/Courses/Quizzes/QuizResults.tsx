import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as quizClient from "./client";
import * as courseClient from "../../Courses/client"
import { useSelector } from "react-redux";

const QuizResults = () => {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>([]);
  const [questions, setQuestions] = useState<any>([]);
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state: any) => state.accountReducer) || {};
  const fetchResults = async () => {
    try {
        const quizFetched = await courseClient.findQuizzesForCourse(cid!);
        setQuiz(quizFetched);
        const quizToEdit = quizFetched.find(
          (q: any) => q.course === cid && q._id === qid
        );
        setQuestions(quizToEdit.questions);
      const attemptData = await quizClient.getAttemptsForUserAndQuiz(currentUser._id,qid);
      setAttempt(attemptData);

    } catch (error) {
      console.error("Failed to fetch results", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchResults();
  }, [qid]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <h1 className="mb-4">Quiz Results</h1>
      <h3>Your Score: {attempt?.score}</h3>
      <h3>Questions and Results</h3>
      {questions.map((question: any) => {
        const userAnswer = attempt.answers.find(
          (a: any) => a.questionId === question._id
        );
        let correctAnswer ;
        if(question.type=="Multiple Choice"){
            correctAnswer=question.choices.find((choice: any) => choice.isCorrect)?.text;
        }
        else if(question.type=="TrueFalse"){
            correctAnswer=String(question.correctAnswer)
        }
        else if(question.type=="Fill in the Blanks"){
           correctAnswer=question.choices[0];
        }
        const isCorrect = userAnswer?.answer === correctAnswer;
        console.log("QUESTION"+JSON.stringify(question,null,2)+"ATTEMPT"+JSON.stringify(attempt,null,2))

        return (
          <div key={question._id} className={`card mb-3 bg-light ${
            isCorrect ? "border-success" : "border-danger"
          }`}
          style={{ borderWidth: "2px" }}>
            <div className="card-body">
              <h5>{question.title}</h5>
              <p dangerouslySetInnerHTML={{ __html: question.text }}></p>
              <p>Your Answer: {userAnswer?.answer || "Not Answered"}</p>
              <p
                className={isCorrect ? "text-success" : "text-danger"}
              >
                {isCorrect ? "Correct" : "Incorrect"}
              </p>
            </div>
          </div>
        );
      })}
         <div className="alert alert-primary" role="alert"> 
             Last Attempt {attempt.timestamp}
            </div>
    </div>
  );
};

export default QuizResults;