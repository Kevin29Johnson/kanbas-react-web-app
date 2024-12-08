import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


interface TrueFalseEditorProps {
  question: {
    id: number;
    title: string;
    points: number;
    text: string;  // Changed from 'question' to match schema
    correctAnswer: boolean;
    isEditing: boolean;
  };
  onUpdate: (updatedData: Partial<TrueFalseEditorProps['question']>) => void;
}

export default function TrueFalseEditor({
  question,
  onUpdate,
}: TrueFalseEditorProps) {
  const [localQuestion, setLocalQuestion] = useState(question);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuestion((prev:any) => ({ ...prev, title: e.target.value }));
  };
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuestion((prev) => ({ ...prev, points: Number(e.target.value) }));
  };

  const handleQuestionChange = (content: string) => {
    setLocalQuestion((prev) => ({ ...prev, text: content }));
  };

  const handleCorrectAnswerChange = (value: boolean) => {
    setLocalQuestion((prev) => ({ ...prev, correctAnswer: value }));
  };

  const handleUpdate = () => {
    const { isEditing, ...updateData } = localQuestion;
    onUpdate(updateData);
  };

  return (
    <div className="container p-3">
      <div className="d-flex justify-content-between mb-3">
         Title Input
         <input
          type="text"
          className="form-control me-2"
          value={localQuestion.title}
          placeholder="Question Title"
          onChange={handleTitleChange}
        />
        <div className="d-flex align-items-center">
          <span className="me-2">pts:</span>
          <input
            type="number"
            className="form-control"
            style={{ width: '60px' }}
            value={localQuestion.points}
            onChange={handlePointsChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <ReactQuill
          theme="snow"
          value={localQuestion.text}
          onChange={handleQuestionChange}
          placeholder="Type your question here"
        />
      </div>

      <div className="mb-3">
        <div>
          <label className="me-3">
            <input
              type="radio"
              name="correctAnswer"
              className="form-check-input me-1"
              checked={localQuestion.correctAnswer === true}
              onChange={() => handleCorrectAnswerChange(true)}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name="correctAnswer"
              className="form-check-input me-1"
              checked={localQuestion.correctAnswer === false}
              onChange={() => handleCorrectAnswerChange(false)}
            />
            False
          </label>
        </div>
      </div>

      <div className="d-flex justify-content-start">
        <button 
          className="btn btn-light me-2" 
          onClick={() => onUpdate({...question, isEditing: false})}
        >
          Cancel
        </button>
        <button 
          className="btn btn-danger" 
          onClick={handleUpdate}
        >
          Update Question
        </button>
      </div>
    </div>
  );
}