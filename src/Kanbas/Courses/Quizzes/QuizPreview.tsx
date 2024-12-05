import React, { useState, useEffect } from "react";

// Define types using `type`
type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  points: number;
};

type Quiz = {
  id: number;
  title: string;
  questions: Question[];
};

const QuizPreview: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizSavedTime, setQuizSavedTime] = useState<string | null>(null);

  useEffect(() => {
    // Mocked quiz data
    const mockQuiz: Quiz = {
      id: 1,
      title: "HTML Basics",
      questions: [
        {
          id: 1,
          text: "An HTML label element can be associated with an HTML input element by setting their ID attributes to the same value.",
          options: ["True", "False"],
          correctAnswer: "True",
          points: 1,
        },
        {
          id: 2,
          text: "Which HTML element is used to define an internal stylesheet?",
          options: ["<script>", "<style>", "<link>", "<css>"],
          correctAnswer: "<style>",
          points: 1,
        },
      ],
    };
    setQuiz(mockQuiz);
    setQuizSavedTime(new Date().toLocaleTimeString());
  }, []);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    console.log("Answers submitted:", selectedAnswers);
    alert("Quiz submitted successfully!");
  };

  return quiz ? (
    <div>
      <h1>{quiz.title}</h1>
      <p>Quiz saved at {quizSavedTime}</p>
      <div>
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{quiz.questions[currentQuestionIndex].text}</p>
        {quiz.questions[currentQuestionIndex].options.map((option) => (
          <div key={option}>
            <label>
              <input
                type="radio"
                name={`question-${quiz.questions[currentQuestionIndex].id}`}
                value={option}
                checked={selectedAnswers[quiz.questions[currentQuestionIndex].id] === option}
                onChange={() =>
                  handleAnswerChange(quiz.questions[currentQuestionIndex].id, option)
                }
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleNext} disabled={currentQuestionIndex === quiz.questions.length - 1}>
        Next
      </button>
      {currentQuestionIndex === quiz.questions.length - 1 && (
        <button onClick={handleSubmit}>Submit Quiz</button>
      )}
    </div>
  ) : (
    <p>Loading quiz...</p>
  );
};

export default QuizPreview;
