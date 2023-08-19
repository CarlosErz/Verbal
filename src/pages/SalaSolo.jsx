import { useState, useEffect } from 'react';
import { dataGameSolo } from '../data/dataGameSolo';
import './Sala.css';
import enviar from '/src/assets/Subtract.svg';
import Countdown from 'react-countdown';
import Confetti from 'react-confetti';



export function SalaSolo() {
  const [questions, setQuestions] = useState(dataGameSolo);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(Date.now() + 20000);
  const [showScore, setShowScore] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const options = questions[currentQuestionIndex].options;

  const handleAnswerSelection = (answer) => {
    setUserAnswer(answer);

  };


  const handleAnswerSubmit = () => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    setShowScore(true);

    if (userAnswer === correctAnswer) {
      setScore(score + 1);
      setIsAnswerCorrect(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        goToNextQuestion();
        setIsAnswerCorrect(null);
      }, 2000);
    } else {
      setScore(score - 1);
      setIsAnswerCorrect(false);
      setTimeout(() => {
        goToNextQuestion();
        setIsAnswerCorrect(null);
      }, 1000);
    }
  };
  const goToNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setCurrentQuestionStartTime(Date.now() + 20000);
      setUserAnswer('');
  
  
    } else {
      // Aquí puedes manejar el final del juego
    }
  };

  const handleCountdownComplete = () => {
    // Lógica cuando el tiempo se agota
    
    goToNextQuestion();



  };

  useEffect(() => {
    setQuestions(dataGameSolo);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setScore(0);
    setShowScore(false);
    setCurrentQuestionStartTime(Date.now() + 20000);
  }, []);


  return (
    <div className="SalaSolo">

      {showConfetti && <Confetti />}
      <nav className="SalaNav">
        <h1>Ruleta De Preguntas</h1>
        <p>{showScore}</p>
      </nav>
      <div className="SalaContent">
        <section className="SalaGame">
          <div className="SalaGameHeader">
            <h2 className="SalaQuestion">
              {questions[currentQuestionIndex].question}
            </h2>
            <section className="SalaTime">
              <h2 className="SalaTitleTime">SEGUNDOS</h2>
              <div className="SalaTimeContent">
                <Countdown
                  date={currentQuestionStartTime}
                  onComplete={handleCountdownComplete}
                  renderer={({ seconds }) => <p className="SalaTimer">{seconds}</p>}
                />
              </div>
            </section>
          </div>
          <div className="SalaAnswersContent">
            {options.slice(0, 2).map((option, index) => (
              <div className="SalaAnswer" key={index} onClick={() => handleAnswerSelection(option)}>
                <span className="SalaInciso">{String.fromCharCode(65 + index)}) </span>
                <button className={`SalaBtn ${isAnswerCorrect === true ? 'green' : isAnswerCorrect === false ? 'red' : ''}`}>
                  {option}
                </button>
              </div>
            ))}
          </div>
          <div className="SalaAnswersContent">
            {options.slice(2, 4).map((option, index) => (
              <div className="SalaAnswer" key={index + 2} onClick={() => handleAnswerSelection(option)}>
                <span className="SalaInciso">{String.fromCharCode(67 + index)}) </span>
                <button className={`SalaBtn ${isAnswerCorrect === true ? 'green' : isAnswerCorrect === false ? 'red' : ''}`}>
                  {option}
                </button>
              </div>
            ))}
          </div>
          <div className="SalaInputAnwswer">
            <input
              className="SalaInput"
              type="text"
              placeholder="Escribe tu respuesta"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button
              className="EnviarButton"
              onClick={handleAnswerSubmit}
            >
              <img src={enviar} alt="" />
            </button>
          </div>

        </section>
      </div>
    </div>
  );
}
