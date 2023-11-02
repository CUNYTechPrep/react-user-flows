import React, { useState } from 'react';
import architectureImage from '../assets/ArchitectureWalkSpan.png';
import access from "../assets/access.png"
import comfort from "../assets/comfort.png"
import Activities from "../assets/Activities.png"
import Nature from "../assets/Nature.jpg"
import Vibes from "../assets/Vibes.png"
import Quiet from "../assets/Quiet.png"

import '../css/Quiz.css';

const questions = [
  { id: 1, text: "Architecture", options: ["Pre-War", "Modern", "Post War", "Don't Care"] },
  {id: 2, text: "Access", options:["< 3 blocks", "> 3 and < 6", "> 6 blocks","Dont matter"]},
  {id: 3, text: "Comfort",options:["Plenty of shading and seating","Some shading or seating","No shading/seating","Dont care"]},
  {id: 4, text: "Activities", options:["Lots of Activities > 10 Total", "Some Activities 1-9 Total", "No Activities","Dont matter"]},
  {id: 5, text: "Nature", options:["Lots of trees", "Some trees", "No trees","Dont matter"]},
  {id: 6, text: "Vibe", options:["Mixed", "Homogenous", "No Vibe","Dont matter"]},
  {id: 7, text: "Quiet", options:["Quiet", "Moderate","Loud","Dont matter"]},

];
const images = [
  architectureImage,
  access,
  comfort,
  Activities,
  Nature,
  Vibes,
  Quiet,  
];

function QuizComponent() {
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submit, setSubmit] = useState(false); 

  const handleAnswerChange = (option) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestionIndex].id]: option }));
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);  
    }else{
      setSubmit(true);
    }
  };

  const handleBackClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);  
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-background">
      <div className="quiz-card">
        <div className="quiz-icon">
          <img src={images[currentQuestionIndex]} alt={`${questions[currentQuestionIndex].text} Icon`} />
        </div>
        <label className="question-label">{questions[currentQuestionIndex].text}</label>
        {questions[currentQuestionIndex].options.map((option, index) => (
          <div 
            key={index} 
            className={`option ${selectedOption === option ? 'option-selected' : ''}`} 
            onClick={() => handleAnswerChange(option)}
          >
            {option}
          </div>
        ))}
        <div className="progress-bar" style={{width: `${progress}%`}}></div>
        <div className="buttons-container">
          <button className="button back" onClick={handleBackClick}>BACK</button>
          <button 
            className="button next" 
            onClick={handleNextClick} 
            disabled={!selectedOption} 
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizComponent;