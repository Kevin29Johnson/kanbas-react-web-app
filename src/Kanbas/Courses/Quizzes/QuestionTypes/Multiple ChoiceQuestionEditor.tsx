import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Choice = {
  text: string;
  isCorrect: boolean;
};

type Question = {
  title: string;
  points: number;
  question: string;
  choices: Choice[];
};

export default function MultipleChoiceQuestionEditor() {
  const [question, setQuestion] = useState<Question>({
    title: 'Easy Question',
    points: 4,
    question: 'How much is 2 + 2?',
    choices: [
      { text: '4', isCorrect: false },
      { text: '3', isCorrect: false },
      { text: '5', isCorrect: true },
      { text: '7', isCorrect: false },
    ],
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion((prev) => ({ ...prev, title: e.target.value }));
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion((prev) => ({ ...prev, points: Number(e.target.value) }));
  };

  const handleQuestionChange = (content: string) => {
    setQuestion((prev) => ({ ...prev, question: content }));
  };

  const handleChoiceChange = (index: number, text: string) => {
    setQuestion((prev) => ({
      ...prev,
      choices: prev.choices.map((choice, i) =>
        i === index ? { ...choice, text } : choice
      ),
    }));
  };

  const handleCorrectAnswerChange = (index: number) => {
    setQuestion((prev) => ({
      ...prev,
      choices: prev.choices.map((choice, i) => ({
        ...choice,
        isCorrect: i === index,
      })),
    }));
  };

  const addChoice = () => {
    setQuestion((prev) => ({
      ...prev,
      choices: [...prev.choices, { text: '', isCorrect: false }],
    }));
  };

  const removeChoice = (index: number) => {
    setQuestion((prev) => ({
      ...prev,
      choices: prev.choices.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container p-3">
      <div className="d-flex justify-content-between mb-3">
        {/* <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            value={question.title}
            onChange={handleTitleChange}
          />
          <select className="form-select" style={{ width: '200px' }}>
            <option>Multiple Choice</option>
          </select>
        </div> */}
        <div className="d-flex align-items-center">
          <span className="me-2">pts:</span>
          <input
            type="number"
            className="form-control"
            style={{ width: '60px' }}
            value={question.points}
            onChange={handlePointsChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <ReactQuill
          theme="snow"
          value={question.question}
          onChange={handleQuestionChange}
          placeholder="Type your question here"
        />
      </div>

      <div className="mb-3">
        {question.choices.map((choice, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <div className="form-check me-2">
              <input
                type="radio"
                className="form-check-input"
                name="correctAnswer"
                checked={choice.isCorrect}
                onChange={() => handleCorrectAnswerChange(index)}
              />
            </div>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Possible Answer"
              value={choice.text}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
            />
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => removeChoice(index)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))}
      </div>

      <button
        className="btn btn-link text-danger text-decoration-none mb-3"
        onClick={addChoice}
      >
        + Add Another Answer
      </button>

      <div className="d-flex justify-content-start">
        <button className="btn btn-light me-2">Cancel</button>
        <button className="btn btn-danger">Update Question</button>
      </div>
    </div>
  );
}
