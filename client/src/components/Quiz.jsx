import React, { useState } from 'react';
import '../css/Quiz.css';

const questions = [
  { id: 1, text: "Do you like nature?", placeholder: "e.g. Yes/No/Maybe" },
  { id: 2, text: "Do you like entertainment?", placeholder: "e.g. Yes/No/Maybe" },
  { id: 3, text: "Do you like food areas?", placeholder: "e.g. Yes/No/Maybe" }
];

function QuizComponent() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    const answeredCount = Object.values(answers).filter(answer => answer.toLowerCase() === 'yes').length;
    const percentage = (answeredCount / questions.length) * 100;
    setResult(percentage);
  };

  return (
    <div className="quiz-background">
      <div className="quiz-card">
        {questions.map(question => (
          <div className="question" key={question.id}>
            <label>{question.text}</label>
            <input type="text" placeholder={question.placeholder} onChange={(e) => handleAnswerChange(question.id, e.target.value)} />
          </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
        {result !== null && <div>You answered 'Yes' to {result}% of the questions!</div>}
      </div>
    </div>
  );
}

export default QuizComponent;
