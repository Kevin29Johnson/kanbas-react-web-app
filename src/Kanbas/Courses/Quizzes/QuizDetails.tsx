import React, { useEffect, useState } from 'react';
import { GiPencil } from "react-icons/gi";
import { Link, useParams } from 'react-router-dom';
import * as courseClient from "../../Courses/client"
const QuizDetails = () => {
    const { cid , qid} = useParams();
    const [quiz,setQuiz]=useState<any>([]);
    const fetchQuiz = async () => {
      if (!cid) return;
      const quizfetched = await courseClient.findQuizzesForCourse(cid);
     setQuiz(quizfetched)
    };
  
    const quizData = quiz.find((q:any) => q._id === qid);

    useEffect(() => {
      if (qid) fetchQuiz();
    }, [qid]);

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quizData?.title??'Quiz Title'}</h2>
        <div className="action-buttons">
          <button className="preview-btn"> <Link 
            to={`/Kanbas/Courses/${cid}/Quizzes/${quizData?._id}/preview`} 
            style={{ color: 'black', textDecoration: 'none' }}
           >Preview</Link></button>
          <button className="edit-btn">
          <Link 
  to={`/Kanbas/Courses/${cid}/Quizzes/${quizData?._id ?? 'New'}/edit`} 
  style={{ color: 'black', textDecoration: 'none' }}
 >
            <GiPencil/>{" "}Edit
          </Link>
          </button>
        </div>
        
      </div>
      
      <div className="quiz-details">
        <div className="detail-row">
          <span className="label">Quiz Type</span>
          <span className="value">{quizData?.quizType}</span>
        </div>
        <div className="detail-row">
          <span className="label">Points</span>
          <span className="value">{quizData?.points}</span>
        </div>
        <div className="detail-row">
          <span className="label">Assignment Group</span>
          <span className="value">{quizData?.assignmentGroup}</span>
        </div>
        <div className="detail-row">
          <span className="label">Shuffle Answers</span>
          <span className="value">{quizData?.isShuffleAnswers?"Yes":"No"}</span>
        </div>
        <div className="detail-row">
          <span className="label">Time Limit</span>
          <span className="value">{quizData?.timeLimit}</span>
        </div>
        <div className="detail-row">
          <span className="label">Multiple Attempts</span>
          <span className="value">{quizData?.isMultipleAttempts?"Yes":"No"}</span>
        </div>
        <div className="detail-row">
          <span className="label">View Responses</span>
          <span className="value">{quizData?.viewResponses}</span>
        </div>
        <div className="detail-row">
          <span className="label">Show Correct Answers</span>
          <span className="value">{quizData?.showCorrectAnswers}</span>
        </div>
        <div className="detail-row">
          <span className="label">One Question at a Time</span>
          <span className="value">{quizData?.isOneQuestionAtATime?"Yes":"No"}</span>
        </div>
        <div className="detail-row">
          <span className="label">Require Respondus LockDown Browser</span>
          <span className="value">{quizData?.requireRespondusLockDownBrowser?"Yes":"No"}</span>
        </div>
        <div className="detail-row">
          <span className="label">Required to View Quiz Results</span>
          <span className="value">{quizData?.requiredToViewQuizResults?"Yes":"No"}</span>
        </div>
        <div className="detail-row">
          <span className="label">Webcam Required</span>
          <span className="value">{quizData?.isWebcamRequired?"Yes":"No"}</span>
        </div>
        <div className="detail-row">
          <span className="label">Lock Questions After Answering</span>
          <span className="value">{quizData?.lockQuestionsAfterAnswering?"Yes":"No"}</span>
        </div>
      </div>

      <div className="quiz-schedule">
        <table>
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quizData?.dueDate}</td>
              <td>{quizData?.for}</td>
              <td>{quizData?.availableDate}</td>
              <td>{quizData?.availableUntilDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizDetails;