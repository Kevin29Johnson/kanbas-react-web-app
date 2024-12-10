import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface FillInTheBlankEditorProps {
  question: {
    id: number;
    title: string;
    points: number;
    text: string;
    choices: string[];  // Changed from choices since it's fill in the blank
    isEditing: boolean;
  };
  onUpdate: (updatedData: Partial<FillInTheBlankEditorProps['question']>) => void;
}

export default function FillInTheBlankEditor({
  question,
  onUpdate,
}: FillInTheBlankEditorProps) {
  const [localQuestion, setLocalQuestion] = useState(question);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuestion((prev:any) => ({ ...prev, title: e.target.value }));
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuestion((prev:any) => ({ ...prev, points: Number(e.target.value) }));
  };

  const handleQuestionChange = (content: string) => {
    setLocalQuestion((prev:any) => ({ ...prev, text: content }));
  };

  const handleAnswerChange = (index: number, value: string) => {
    setLocalQuestion((prev:any) => {
      const updatedAnswers = [...prev.choices];
      updatedAnswers[index] = value;
      return { ...prev, choices: updatedAnswers };
    });
  };

  const handleAddAnswer = () => {
    setLocalQuestion((prev:any) => ({
      ...prev,
      choices: [...prev.choices, '']
    }));
  };
;

const handleRemoveAnswer = (index: number) => {
  setLocalQuestion((prev:any) => ({
    ...prev,
    choices: prev.choices.filter((_:any, i:any) => i !== index)
  }));
};

const handleUpdate = () => {
  const { isEditing, ...updateData } = localQuestion;
  onUpdate(updateData);
};

  const handleSave = () => {
    console.log('Saved Question:', localQuestion);
    alert('Question saved successfully!');
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

        {/* Points Input */}
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

      {/* WYSIWYG Editor */}
      <div className="mb-3">
        <label className="form-label">Question:</label>
        <ReactQuill
          theme="snow"
          value={localQuestion.text}
          onChange={handleQuestionChange}
        />
      </div>

      {/* Possible Answers */}
      <div className="mb-3">
        <label className="form-label">Answers:</label>
        {localQuestion.choices.map((answer:any, index:any) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Possible Answer"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
            {/* <button
              className="btn btn-outline-danger"
              onClick={() => handleRemoveAnswer(index)}
            >
              Remove
            </button> */}
          </div>
        ))}
        {/* <button className="btn btn-outline-primary" onClick={handleAddAnswer}>
          + Add Another Answer
        </button> */}
      </div>

      {/* Buttons */}
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
