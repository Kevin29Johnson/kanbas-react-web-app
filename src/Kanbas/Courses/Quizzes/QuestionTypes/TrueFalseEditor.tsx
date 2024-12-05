import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type TrueFalseQuestion = {
  title: string;
  points: number;
  question: string;
  correctAnswer: boolean;
};

export default function TrueFalseEditor() {
  const [question, setQuestion] = useState<TrueFalseQuestion>({
    title: 'Sample Question',
    points: 1,
    question: 'Is the sky blue?',
    correctAnswer: true,
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

  const handleCorrectAnswerChange = (value: boolean) => {
    setQuestion((prev) => ({ ...prev, correctAnswer: value }));
  };

  const handleCancel = () => {
    // Reset the question state (you can customize this to discard unsaved changes)
    setQuestion({
      title: 'Sample Question',
      points: 1,
      question: 'Is the sky blue?',
      correctAnswer: true,
    });
  };

  const handleSave = () => {
    console.log('Saved Question:', question);
    alert('Question saved successfully!');
  };

  return (
    <div className="container p-3">
      <div className="d-flex justify-content-between mb-3">
        {/* Title Input */}
        <input
          type="text"
          className="form-control me-2"
          value={question.title}
          placeholder="Question Title"
          onChange={handleTitleChange}
        />

        {/* Points Input */}
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

      {/* WYSIWYG Editor */}
      <div className="mb-3">
        <label className="form-label">Question:</label>
        <ReactQuill
          theme="snow"
          value={question.question}
          onChange={handleQuestionChange}
        />
      </div>

      {/* True/False Selection */}
      <div className="mb-3">
        <label className="form-label">Correct Answer:</label>
        <div>
          <label className="me-3">
            <input
              type="radio"
              name="correctAnswer"
              className="form-check-input me-1"
              checked={question.correctAnswer === true}
              onChange={() => handleCorrectAnswerChange(true)}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name="correctAnswer"
              className="form-check-input me-1"
              checked={question.correctAnswer === false}
              onChange={() => handleCorrectAnswerChange(false)}
            />
            False
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-start">
        <button className="btn btn-light me-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleSave}>
          Save Question
        </button>
      </div>
    </div>
  );
}
