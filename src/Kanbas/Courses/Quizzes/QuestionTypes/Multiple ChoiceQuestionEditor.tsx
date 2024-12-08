import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface MultipleChoiceQuestionEditorProps {
  question: {
    id: number;
    title: string;
    points: number;
    text: string;
    choices: { text: string; isCorrect: boolean }[];
    isEditing:boolean
  };
  onUpdate: (updatedData: Partial<MultipleChoiceQuestionEditorProps['question']>) => void;
}

export default function MultipleChoiceQuestionEditor({
  question,
  onUpdate,
}: MultipleChoiceQuestionEditorProps)  {
  
  
  const [localQuestion, setLocalQuestion] = useState(question);
  const handleUpdate = () => {
    // Remove isEditing from the data being sent to parent
    const { isEditing, ...updateData } = localQuestion;
    onUpdate(updateData);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuestion((prev:any) => ({ ...prev, title: e.target.value }));
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuestion((prev:any) => ({ ...prev, points: Number(e.target.value) }));
  };

  const handleQuestionChange = (content: string) => {
    setLocalQuestion((prev:any) => ({ ...prev, text: content }));
  };

  const handleChoiceChange = (index: number, text: string) => {
    setLocalQuestion((prev:any) => ({
      ...prev,
      choices: prev.choices.map((choice:any, i:any) =>
        i === index ? { ...choice, text } : choice
      ),
    }));
  };

  const handleCorrectAnswerChange = (index: number) => {
    setLocalQuestion((prev:any) => ({
      ...prev,
      choices: prev.choices.map((choice:any, i:any) => ({
        ...choice,
        isCorrect: i === index,
      })),
    }));
  };

  const addChoice = () => {
    setLocalQuestion((prev:any) => ({
      ...prev,
      choices: [...prev.choices, { text: '', isCorrect: false }],
    }));
  };

  const removeChoice = (index: number) => {
    setLocalQuestion((prev:any) => ({
      ...prev,
      choices: prev.choices.filter((_:any, i:any) => i !== index),
    }));
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
            defaultValue={localQuestion.points}
            onChange={handlePointsChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <ReactQuill
          theme="snow"
          defaultValue={localQuestion.text}
          onChange={handleQuestionChange}
          placeholder="Type your question here"
        />
      </div>

      <div className="mb-3">
        {localQuestion.choices.map((choice:any, index:any) => (
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
              defaultValue={choice.text}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
            />
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => removeChoice(index)}
            >
              Remove
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
        <button className="btn btn-light me-2"  onClick={() => onUpdate({...question, isEditing: false})}>Cancel</button>
        <button className="btn btn-danger"  onClick={handleUpdate}>Update Question</button>
      </div>
    </div>
  );
}
