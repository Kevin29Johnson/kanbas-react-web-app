import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MultipleChoiceQuestionEditor from "./QuestionTypes/Multiple ChoiceQuestionEditor";
import ReactQuill from "react-quill";
import TrueFalseEditor from "./QuestionTypes/TrueFalseEditor";
import FillInTheBlankEditor from "./QuestionTypes/FillInTheBlank";
import * as courseClient from "../../Courses/client"
import * as quizClient from "./client";
import { useSelector } from "react-redux";


export default function QuizEditor() {
  const { cid, qid } = useParams(); 
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer) || {};
  const [quiz,setQuiz]=useState<any>([]);
  const [questions, setQuestions] = useState<any>([]);
  const [activeTab, setActiveTab] = useState("Details");
  const [questionType, setQuestionType] = useState("Multiple Choice");  // Default tab is "Details"
  //const [question, setQuestion]=useState(false);
  const [edit,setEdit]=useState(true);

  const [title, setTitle] = useState("");
  const [error,setError]=useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [isShuffleAnswers, setShuffleAnswers] = useState(false);
  const [isMultipleAttempts, setMultipleAttempts] = useState(false);
  const [isOneQuestionAtATime, setOneQuestionAtATime] = useState(false);
  const [isWebcamRequired, setWebcamRequired] = useState(false);
  const [isLockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [allowedAttempts, setAllowedAttempts] = useState(1);

  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      const localDateString = date.toISOString().slice(0, 16);
      return localDateString;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

 
  const addQuestion = () => {
    const newQuestion = {
      id:Date.now(),
      type: "Multiple Choice",
      title: "",
      points: 0,
      text: "",
      choices: [],
      correctAnswer: null,
    };
    setQuestions([...questions, newQuestion]);
  };


  const handleEdit = (questionId:any) => {
    setQuestions((prevQuestions:any) =>
      prevQuestions.map((q:any) =>
        q._id === questionId ? { ...q, isEditing: !q.isEditing } : q
      )
    );
  };

  const handleQuestionTypeChange = (id: number, type: string) => {
   questions.map((q:any)=>{
     if(q===undefined){
      console.log("no");
      
     }
   })
    setQuestions(questions.map((q:any) => q._id === id ? {...q, type} : q));
  };
  
  // const updateQuestion = async (questionId: string, updatedData: any) => {
  //     const updatedQuiz = quiz.find((q: any) => q.course === cid && q._id === qid);
  //     updatedQuiz.questions = updatedQuiz.questions.map((q: any) =>
  //       q._id === questionId ? { ...q, ...updatedData } : q
  //     );
  //     setQuestions(updatedQuiz.questions);
  // };
  const updateQuestion = async (questionId: string, updatedData: any,qtype:any) => {
    setQuestions((prevQuestions: any) => 
      prevQuestions.map((q: any) => 
        q._id === questionId 
          ? { ...q, ...updatedData, isEditing: false,type:qtype }  // Turn off editing mode after update
          : q
      )
    );
  };
  const deleteQuestion = async (questionId: string) => {
      const quizToUpdate = quiz.find((q: any) => q.course === cid && q._id === qid);
      const updatedQuestions = questions.filter((q: any) => q._id !== questionId);
      setQuestions(updatedQuestions);  
      const updatedQuiz = { ...quizToUpdate, questions: updatedQuestions };
      setQuiz(updatedQuiz);

  };
  const isNewQuiz = qid === "New";

  const fetchQuiz = async () => {
    if (!cid || isNewQuiz) return;

    try {
      const quizzesFetched = await courseClient.findQuizzesForCourse(cid);
      setQuiz(quizzesFetched); 
    
     
      // Find the specific quiz to edit
      const quizToEdit = quizzesFetched.find(
        (q: any) => q.course === cid && q._id === qid
      );
    
      // Populate fields if quiz exists
      if (quizToEdit) {
        setTitle(quizToEdit.title || "");
        setDescription(quizToEdit.instructions || "");
        setPoints(quizToEdit.points || 0);
        setTimeLimit(quizToEdit.timeLimit || 30);
        setShuffleAnswers(quizToEdit.isShuffleAnswers || false);
        setMultipleAttempts(quizToEdit.isMultipleAttempts || false);
        setAllowedAttempts(quizToEdit.allowedAttempts||1)
        setOneQuestionAtATime(quizToEdit.isOneQuestionAtATime || false);
        setWebcamRequired(quizToEdit.isWebcamRequired || false);
        setLockQuestionsAfterAnswering(quizToEdit.isLockQuestionsAfterAnswering || false);
        setAccessCode(quizToEdit.accessCode || "");
        setAvailableDate(formatDateForInput(quizToEdit.availableDate)|| "");
        setDueDate(formatDateForInput(quizToEdit.dueDate) || "");
        setAvailableUntil(formatDateForInput(quizToEdit.availableUntilDate) || "");
        setQuestions(quizToEdit.questions);        
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };


  useEffect(() => {
    fetchQuiz();
  }, [cid, qid]);

  const handleSave = async () => {
    setQuestions(quiz.questions)
    const updatedQuiz = {
      _id: isNewQuiz ? Date.now().toString() : qid,
      course: cid,
      title,
      description,
      points,
      timeLimit,
      availableDate,
      dueDate,
      availableUntil,
      isShuffleAnswers,
      isMultipleAttempts,
      allowedAttempts,
      isOneQuestionAtATime,
      isWebcamRequired,
      isLockQuestionsAfterAnswering,
      accessCode,
      questions: questions,
    };

    try {
      if (isNewQuiz) {
        // Create new quiz
        await courseClient.createQuizForCourse(cid!, updatedQuiz);
      } else {
        // Update existing quiz
        await quizClient.updateQuiz(updatedQuiz);
      }
      
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch(error) {
      console.error("Error saving quizzes:", error);
      navigate(`/Kanbas/Courses/${cid}/Quizzes`); 
    }
  }

  const handleSaveandPublish=async ()=>{
    setQuestions(quiz.questions)
    const updatedQuiz = {
      _id: isNewQuiz ? Date.now().toString() : qid,
      course: cid,
      title,
      description,
      points,
      timeLimit,
      availableDate,
      dueDate,
      availableUntil,
      isShuffleAnswers,
      isMultipleAttempts,
      allowedAttempts,
      isOneQuestionAtATime,
      isWebcamRequired,
      isLockQuestionsAfterAnswering,
      accessCode,
      questions: questions,
    };

    try {
      if (isNewQuiz) {
        // Create new quiz
        const createdQuiz=await courseClient.createQuizForCourse(cid!, updatedQuiz);
        await quizClient.publishQuiz(createdQuiz._id)

      } else {
        // Update existing quiz
        await quizClient.updateQuiz(updatedQuiz);
        await quizClient.publishQuiz(qid);
      }
      
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch(error) {
      console.error("Error saving quizzes:", error);
      navigate(`/Kanbas/Courses/${cid}/Quizzes`); 
    }

  }
  return (
    <div className="form-group container mt-4">
      {/* Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "Details" ? "active" : ""}`}
            onClick={() => setActiveTab("Details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "Questions" ? "active" : ""}`}
            onClick={() => {setActiveTab("Questions")}}
          >
            Questions
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content mt-4">
        {/* Details Tab */}
        {activeTab === "Details" && (
          <div>
            {/* Quiz Title */}
            <div className="mb-4">
              <label htmlFor="quiz-title" className="form-label">
                Quiz Title
              </label>
              <input
                id="quiz-title"
                type="text"
                className="form-control form-control-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Quiz Title"
              />
            </div>

            {/* Quiz Instructions */}
            <div className="mb-4">
              <label htmlFor="quiz-instructions" className="form-label">
                Quiz Instructions
              </label>
              <div className="mb-3">
        <ReactQuill
          theme="snow"
           id="quiz-instructions"
                className="form-control"
                value={description}
          onChange={(value) => setDescription(value)}
          placeholder="Add quiz instructions..."
        />
      </div>
            </div>

            {/* Quiz Options */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Quiz Options</h5>
                <div className="col-md-3 d-flex align-items-center">
                  <label
                    htmlFor="wd-assignment-group"
                    className="font-weight-bold"
                  >
                    Assignment Group
                  </label>
                </div>
                <div className="col-md-6">
                  <select id="wd-assignment-group" className="form-select">
                    <option value="assignments">Assignments</option>
                  </select>
                </div>

                <div className="col-md-3 d-flex align-items-center">
                  <label
                    htmlFor="wd-assignment-group"
                    className="font-weight-bold"
                  >
                    Quiz Type
                  </label>
                </div>
                <div className="col-md-6">
                  <select id="wd-assignment-group" className="form-select">
                    <option value="assignments">Graded Quiz</option>
                  </select>
                </div>

                <div className="form-check mb-2">
                  <input
                    id="shuffle-answers"
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked={isShuffleAnswers}
                    onChange={(e)=>{setShuffleAnswers(Boolean(e.target.value))}}
                  />
                  <label htmlFor="shuffle-answers" className="form-check-label">
                    Shuffle Answers
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    id="multiple-attempts"
                    type="checkbox"
                    defaultChecked={isMultipleAttempts}
                    className="form-check-input"
                    onChange={(e)=>{setMultipleAttempts(Boolean(e.target.value))}}
                  />
                  <label
                    htmlFor="multiple-attempts"
                    className="form-check-label"
                  >
                    Allow Multiple Attempts
                  </label>
                </div>
                {isMultipleAttempts && (
        <div className="mb-2">
          <label
            htmlFor="allowed-attempts"
            className="form-label"
          >
            Number of Allowed Attempts:
          </label>
          <input
            id="allowed-attempts"
            type="number"
            min="1"
            value={allowedAttempts}
            onChange={(e) => setAllowedAttempts(Number(e.target.value))}
            className="form-control"
          />
        </div>
      )}
                <div className="form-check mb-2">
                  <input
                    id="one-question"
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked={isOneQuestionAtATime}
                    onChange={(e)=>{setOneQuestionAtATime(Boolean(e.target.value))}}
                  />
                  <label htmlFor="one-question" className="form-check-label">
                    One Question at a Time
                  </label>
                </div>

                <div className="form-check mb-2">
                  <input
                    id="lock-question"
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked={isLockQuestionsAfterAnswering}
                    onChange={(e)=>{setLockQuestionsAfterAnswering(Boolean(e.target.value))}}
                  />
                  <label htmlFor="one-question" className="form-check-label">
                   Lock Questions After Answering
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    id="webcam-required"
                    type="checkbox"
                    className="form-check-input"
                    defaultChecked={isWebcamRequired}
                    onChange={(e)=>{setWebcamRequired(Boolean(e.target.value))}}
                  />
                  <label htmlFor="webcam-required" className="form-check-label">
                    Require Webcam
                  </label>
                  
                </div>
              </div>
              <div className="mb-4">
               <label htmlFor="quiz-access-code" className="m-4">
                  Access Code
                </label>
                <input
                  id="quiz-access-code"
                  type="text"
                  className="me-4"
                  value={accessCode}
                  onChange={(e)=>{setAccessCode(e.target.value)}}
                  placeholder="Enter access code"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quiz-minutes" className="m-4">
                  Minutes
                </label>
                <input
                  id="quiz-minutes"
                  type="number"
                  className="me-4"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  placeholder="Enter time limit in minutes"
                />

              <label htmlFor="quiz-points" className="m-4">
                  Points
                </label>
                 <input
                  id="quiz-points"
                  type="number"
                  className="me-4"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  placeholder="Enter time limit in minutes"
                />
              </div>
            </div>

            {/* Availability */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Availability</h5>

                <div className="col-md-6">
                  <label htmlFor="wd-assign-to" className="font-weight-bold">
                    Assign To
                  </label>
                  <select id="wd-assign-to" className="form-select">
                    <option value="everyone">Everyone</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="available-date" className="form-label">
                    Available Date
                  </label>
                  <input
                    id="available-date"
                    type="datetime-local"
                    className="form-control"
                    value={availableDate}
                    onChange={(e)=>{setAvailableDate(e.target.value)}}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="due-date" className="form-label">
                    Due Date
                  </label>
                  <input
                    id="due-date"
                    type="datetime-local"
                    className="form-control"
                    value={dueDate}
                    onChange={(e)=>{setDueDate(e.target.value)}}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="due-date" className="form-label">
                    Until
                  </label>
                  <input
                    id="due-date"
                    type="datetime-local"
                    className="form-control"
                    value={availableUntil}
                    onChange={(e)=>{setAvailableUntil(e.target.value)}}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
        {/* Questions Tab */}
{activeTab === "Questions" && (
  <div>
    <button className="btn btn-secondary mb-3" onClick={addQuestion}>
      + New Question
    </button>
    {questions && questions.map((question:any) => (
      <div key={question._id}>
        {!question.isEditing ? (
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{question.type} Question</h5>
              <h6 className="card-title">Points: {question.points}</h6>
              <button className="btn btn-secondary me-2" onClick={() => handleEdit(question._id)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => deleteQuestion(question._id) } >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <>
            <select
              className="form-select mb-3"
              value={question.type}
              onChange={(e) => handleQuestionTypeChange(question._id, e.target.value)}
            >
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="TrueFalse">True/False</option>
              <option value="Fill in the Blanks">Fill in the Blanks</option>
            </select>

            {question.type === "Multiple Choice" && (
              <MultipleChoiceQuestionEditor
                question={question}
                onUpdate={(updatedData) => updateQuestion(question._id, updatedData,question.type)}
              />
            )}
            {question.type === "TrueFalse" && (
              <TrueFalseEditor
                question={question}
                onUpdate={(updatedData) => updateQuestion(question._id, updatedData,question.type)}
              />
            )}
            {question.type === "Fill in the Blanks" && (
              <FillInTheBlankEditor
                question={question}
                onUpdate={(updatedData) => updateQuestion(question._id, updatedData,question.type)}
              />
            )}
          </>
        )}
      </div>
    ))}
  </div>
)}

      {/* Footer Buttons */}
      <div className="d-flex justify-content-end gap-2 mt-4">
        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-danger" onClick={handleSave}>Save</button>
        <button className="btn btn-secondary" onClick={handleSaveandPublish}>Save and Publish</button>
      </div>
    </div>
  );

}
