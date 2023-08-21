import { useState, useEffect } from 'react';
import { dataGameSolo } from '../data/dataGameSolo';
import './Sala.css';
import enviar from '/src/assets/Subtract.svg';
import Countdown from 'react-countdown';
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';

export function SalaSolo() {
  const [questions, setQuestions] = useState(dataGameSolo);
  const [selectedQuestionIndexes, setSelectedQuestionIndexes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [scoreerror, setScoreerror] = useState(0);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(Date.now() + 500000);
  const [, setGameLost] = useState(false);
  const [, setShowScore] = useState(false);
  const [ShowModalLost, setShowModalLost] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);



  const options = currentQuestionIndex !== null ? questions[currentQuestionIndex].options : [];

  const getRandomQuestionIndex = () => {
    const availableIndexes = questions.map((_, index) => index).filter(index => !selectedQuestionIndexes.includes(index));
    if (availableIndexes.length === 0) {
      return null; // Todas las preguntas han sido respondidas
    }
    const randomIndex = Math.floor(Math.random() * availableIndexes.length);
    return availableIndexes[randomIndex];
  };

  const goToNextRandomQuestion = () => {
    const randomIndex = getRandomQuestionIndex();
    if (randomIndex !== null) {
      setSelectedQuestionIndexes([...selectedQuestionIndexes, randomIndex]);
      setCurrentQuestionIndex(randomIndex);
      setUserAnswer('');
    } else {
      // Aquí puedes manejar el final del juego
    }
  };

  const handleAnswerSelection = (answer) => {
    setUserAnswer(answer);
  };
  const restartGame = () => {
    setGameLost(false);
    setSelectedQuestionIndexes([]);
    setCurrentQuestionIndex(null);
    setUserAnswer('');
    setScore(0);
    setScoreerror(0);
    setShowModalLost(false);
    setCurrentQuestionStartTime(Date.now() + 10000);
    location.reload();
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
        goToNextRandomQuestion();
        setIsAnswerCorrect(null);
        setCurrentQuestionStartTime(Date.now() + 10000);
      }, 2000);
    } else {
      setScoreerror(scoreerror + 1);
      setIsAnswerCorrect(false);
      setTimeout(() => {
        goToNextRandomQuestion();
        setIsAnswerCorrect(null);
        setCurrentQuestionStartTime(Date.now() + 10000);
      }, 1000);
    }
  };

  const handleCountdownComplete = () => {
    goToNextRandomQuestion();
    setShowModalLost(true);
    setGameLost(true);



  };

  useEffect(() => {
    setQuestions(dataGameSolo);
    setSelectedQuestionIndexes([]);
    setCurrentQuestionIndex(null);
    setUserAnswer('');
    setScore(0);
    setShowScore(false);
    setCurrentQuestionStartTime(Date.now() + 10000);
  }, []);

  useEffect(() => {
    if (currentQuestionIndex === null && selectedQuestionIndexes.length < questions.length) {
      goToNextRandomQuestion();
    }
  }, [selectedQuestionIndexes, currentQuestionIndex]);

  return (
    <div className="SalaSolo">
      {ShowModalLost && 
        <div className="lostGame">
        <div className='lostGame_content'>
        <h1 className='lostGame_title'>Oooops Perdiste</h1>
        <p className='lostGame_text'>Vuelve a intentarlo</p>
        <p className='lostGame_puntaje'>Tu puntaje fue de</p>
        <div className="losGame_score">
          
          <div className="scores">
            <div className="score">
              <p>✓</p>
              <span>{score}</span>
            </div>
            <div className="score_negative">
              <p>✖</p>
              <span>{scoreerror}</span>
            </div>
          </div>
        </div>
        <Link to='/SalaSolo' onClick={restartGame}>Volver a jugar</Link>
        </div>
      </div>
      }
      
      {showConfetti && <Confetti />}
      <nav className="SalaNav">
        <Link to='/'>Ruleta De Preguntas</Link>
        <div className="scores">
          <div className="score">
            <p>✓</p>
            <span>{score}</span>
          </div>
          <div className="score_negative">
            <p>✖</p>
            <span>{scoreerror}</span>
          </div>
        </div>

      </nav>
      <div className="SalaContent">
        <section className="SalaGame">
          <div className="SalaGameHeader">
            <h2 className="SalaQuestion">
              {currentQuestionIndex !== null ? questions[currentQuestionIndex].question : "Cargando pregunta..."}
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
