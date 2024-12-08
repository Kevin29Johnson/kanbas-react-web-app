import React, { useState, useEffect } from "react";
import * as courseClient from "../../Courses/client";
import { useParams } from "react-router";

const QuizPreview = () => {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>([]);
  const [questions, setQuestions] = useState<any>([]);
  const [answers, setAnswers] = useState<any>({}); // Tracks user answers

  const fetchQuiz = async () => {
    if (!cid) return;
    const quizFetched = await courseClient.findQuizzesForCourse(cid);
    setQuiz(quizFetched);
    const quizToEdit = quizFetched.find(
      (q: any) => q.course === cid && q._id === qid
    );
    setQuestions(quizToEdit.questions);
  };

  useEffect(() => {
    fetchQuiz();
  }, [cid, qid]);

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev: any) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    console.log("User's Answers:", answers);
    alert("Quiz Submitted!");
    // Additional logic for submission can go here, like sending answers to a server
  };

  const renderQuestion = (question: any) => {
    switch (question.type) {
      case "Multiple Choice":
        return (
          <MultipleChoice
            question={question}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "TrueFalse":
        return (
          <TrueFalse
            question={question}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "Fill in the Blanks":
        return (
          <FillInTheBlanks
            question={question}
            handleAnswerChange={handleAnswerChange}
          />
        );
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <div>
      <h1>Quiz Preview</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {questions.map((question: any) => (
          <div key={question._id} className="question-container">
            {renderQuestion(question)}
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

const MultipleChoice = ({
  question,
  handleAnswerChange,
}: {
  question: any;
  handleAnswerChange: (questionId: string, value: any) => void;
}) => {
  return (
    <div className="multiple-choice">
      <h3>{question.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: question.text }}></p>
      {question.choices.map((choice: any, index: number) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name={question._id}
              value={choice.text}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
            />
            {choice.text}
          </label>
        </div>
      ))}
    </div>
  );
};

const TrueFalse = ({
  question,
  handleAnswerChange,
}: {
  question: any;
  handleAnswerChange: (questionId: string, value: any) => void;
}) => {
  return (
    <div className="true-false">
      <h3>{question.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: question.text }}></p>
      <div>
        <label>
          <input
            type="radio"
            name={question._id}
            value="true"
            onChange={(e) => handleAnswerChange(question._id, true)}
          />
          True
        </label>
        <label>
          <input
            type="radio"
            name={question._id}
            value="false"
            onChange={(e) => handleAnswerChange(question._id, false)}
          />
          False
        </label>
      </div>
    </div>
  );
};

const FillInTheBlanks = ({
  question,
  handleAnswerChange,
}: {
  question: any;
  handleAnswerChange: (questionId: string, value: any) => void;
}) => {
  return (
    <div className="fill-in-the-blanks">
      <h3>{question.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: question.text }}></p>
      <input
        type="text"
        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
        placeholder="Type your answer here"
      />
    </div>
  );
};

export default QuizPreview;
