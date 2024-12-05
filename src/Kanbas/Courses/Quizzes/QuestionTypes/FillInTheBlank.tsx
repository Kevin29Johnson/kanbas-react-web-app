import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type FillInTheBlankQuestion = {
  title: string;
  points: number;
  question: string;
  answers: string[];
};

export default function FillInTheBlankEditor() {
  const [question, setQuestion] = useState<FillInTheBlankQuestion>({
    title: 'Sample Question',
    points: 1,
    question: 'What is 2 + 2 = ______?',
    answers: ['4', 'four'],
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

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...question.answers];
    updatedAnswers[index] = value;
    setQuestion((prev) => ({ ...prev, answers: updatedAnswers }));
  };

  const handleAddAnswer = () => {
    setQuestion((prev) => ({ ...prev, answers: [...prev.answers, ''] }));
  };

  const handleRemoveAnswer = (index: number) => {
    const updatedAnswers = question.answers.filter((_, i) => i !== index);
    setQuestion((prev) => ({ ...prev, answers: updatedAnswers }));
  };

  const handleCancel = () => {
    // Reset the question state to initial values or clear changes
    setQuestion({
      title: 'Sample Question',
      points: 1,
      question: 'What is 2 + 2 = ______?',
      answers: ['4', 'four'],
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

      {/* Possible Answers */}
      <div className="mb-3">
        <label className="form-label">Answers:</label>
        {question.answers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Possible Answer"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
            <button
              className="btn btn-outline-danger"
              onClick={() => handleRemoveAnswer(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className="btn btn-outline-primary" onClick={handleAddAnswer}>
          + Add Another Answer
        </button>
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
