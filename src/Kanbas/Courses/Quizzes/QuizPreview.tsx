import React, { useState, useEffect } from "react";
import * as courseClient from "../../Courses/client";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import * as quizClient from "./client";

const QuizPreview = () => {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>([]);
  const [questions, setQuestions] = useState<any>([]);
  const [answers, setAnswers] = useState<any>({});
  const { currentUser } = useSelector((state: any) => state.accountReducer) || {};

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!currentUser?._id || !qid) {
      setSubmitError("User must be logged in to submit the quiz");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer: String(answer),
      }));

      const result = await quizClient.submitQuizAttempt(
        currentUser._id,
        qid,
        formattedAnswers
      );

      setScore(result.score);
      alert(`Quiz submitted successfully! Your score: ${result.score}`);
    } catch (error: any) {
      setSubmitError(
        error.response?.data?.error ||
        "Failed to submit quiz. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
        return <div className="alert alert-warning">Unknown question type</div>;
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Quiz Preview</h1>
      {submitError && (
        <div className="alert alert-danger">
          {submitError}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {questions.map((question: any) => (
          <div key={question._id} className="card mb-3">
            <div className="card-body">
              {renderQuestion(question)}
            </div>
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>
        {score !== null && (
          <div className="alert alert-success mt-4">
            Your Score: {score}
          </div>
        )}
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
}) => (
  <div>
    <h3>{question.title}</h3>
    <p dangerouslySetInnerHTML={{ __html: question.text }}></p>
    {question.choices.map((choice: any, index: number) => (
      <div key={index} className="form-check">
        <input
          type="radio"
          className="form-check-input"
          name={question._id}
          value={choice.text}
          onChange={(e) => handleAnswerChange(question._id, e.target.value)}
        />
        <label className="form-check-label">{choice.text}</label>
      </div>
    ))}
  </div>
);

const TrueFalse = ({
  question,
  handleAnswerChange,
}: {
  question: any;
  handleAnswerChange: (questionId: string, value: any) => void;
}) => (
  <div>
    <h3>{question.title}</h3>
    <p dangerouslySetInnerHTML={{ __html: question.text }}></p>
    <div className="form-check">
      <input
        type="radio"
        className="form-check-input"
        name={question._id}
        value="true"
        onChange={(e) => handleAnswerChange(question._id, true)}
      />
      <label className="form-check-label">True</label>
    </div>
    <div className="form-check">
      <input
        type="radio"
        className="form-check-input"
        name={question._id}
        value="false"
        onChange={(e) => handleAnswerChange(question._id, false)}
      />
      <label className="form-check-label">False</label>
    </div>
  </div>
);

const FillInTheBlanks = ({
  question,
  handleAnswerChange,
}: {
  question: any;
  handleAnswerChange: (questionId: string, value: any) => void;
}) => (
  <div>
    <h3>{question.title}</h3>
    <p dangerouslySetInnerHTML={{ __html: question.text }}></p>
    <input
      type="text"
      className="form-control"
      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
      placeholder="Type your answer here"
    />
  </div>
);

export default QuizPreview;
