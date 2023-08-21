import { useState, useEffect } from 'react';
import { dataGameSolo } from '../data/dataGameSolo';
import './Sala.css';
import enviar from '/src/assets/Subtract.svg';
import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';
import logo from '/src/assets/logo.svg';

export function SalaSolo() {
  const [questions, setQuestions] = useState(dataGameSolo);
  const [selectedQuestionIndexes, setSelectedQuestionIndexes] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [scoreerror, setScoreerror] = useState(0);
  const [scoreTotal, setScoreTotal] = useState(0);

  const [ShowModalLost, setShowModalLost] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const options = currentQuestionIndex !== null ? questions[currentQuestionIndex].options : [];


  //barra de progreso 
  const [time, setTime] = useState(20);
  const initialTime = 20; // Duración inicial en segundos


  const decreaseTime = () => {
    if (time > 0) {
      setTime(time - 1);
      const progressBar = document.getElementById('myBar');
      const progressPercentage = (time / initialTime) * 100;
      progressBar.style.width = `${progressPercentage}%`;

      if (time <= 5) {
        progressBar.style.backgroundColor = '#f54242'; // Cambia el color a rojo cuando queda poco tiempo
      } else if (time <= 10) {
        progressBar.style.backgroundColor = 'rgba(255, 196, 0, 1)' // Cambia el color a amarillo cuando queda poco tiempo
      } else {
        progressBar.style.backgroundColor = 'rgba(46, 204, 113, 1)'; // Establece el color de la barra en verde
      }
    } else {
      const progressBar = document.getElementById('myBar');
      progressBar.style.width = '0%'; // Establece la barra en 0% visualmente
      setTimeout(() => {
        setShowModalLost(true);
      }, 1000);
    }
  };

  useEffect(() => {
    const timer = setInterval(decreaseTime, 1000); // Decrementa el tiempo cada segundo
    return () => {
      clearInterval(timer); // Limpia el intervalo cuando el componente se desmonta
    };
  }, [time]);

  const resetTime = () => {
    setTime(initialTime);
    const progressBar = document.getElementById('myBar');
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = 'rgba(46, 204, 113, 1)';
  };


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
      setShowModalLost(true);
    }
  };

  const checkAnswer = () => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    let newScoreTotal = scoreTotal;
  
    if (userAnswer === correctAnswer) {
      setScore(score + 1);
      newScoreTotal += 1000;
      setIsAnswerCorrect(true);
      setShowConfetti(true);
    } else {
      newScoreTotal = Math.max(0, newScoreTotal - 500);
      setScoreerror(scoreerror + 1);
      setIsAnswerCorrect(false);
    }
  
    setScoreTotal(newScoreTotal);
  
    setTimeout(() => {
      setShowConfetti(false);
      goToNextRandomQuestion();
      setIsAnswerCorrect(null);
      resetTime();
    }, 1000);
  };
  
  const handleAnswerSelection = (answer) => {
    setUserAnswer(answer);
  };


  const restartGame = () => {
    setSelectedQuestionIndexes([]);
    setCurrentQuestionIndex(null);
    setUserAnswer('');
    setScore(0);
    setScoreerror(0);
    setShowModalLost(false);
    resetTime();
    location.reload();

  };

  useEffect(() => {
    setQuestions(dataGameSolo);
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
            <h1 className='lostGame_title'>¡Oops, Tiempo Agotado!</h1>
            <p className='lostGame_text'>No te desanimes, sigue desafiándote</p>
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
        
        <Link to='/'><img className='logo' src={logo} alt="" /></Link>
        <p>Ruleta De Preguntas</p>
      

      </nav>
      <div className="SalaContent">
        <section className="SalaGame">
          <div className="SalaGameHeader">
            <h2 className="SalaQuestion">
              {currentQuestionIndex !== null ? questions[currentQuestionIndex].question : "Cargando pregunta..."}
            </h2>
            <div className="scores">
          <div className="SalaPuntaje">
            <p>Puntaje</p>
            <span>{scoreTotal}</span>
          </div>
        </div>
            <div className="progress-container ">
              <div className="progress-bar" id="myBar"></div>
            </div>


          </div>

          <div className="SalaAnswersContent">
            {options.slice(0, 2).map((option, index) => (
              <div className="SalaAnswer" key={index} onClick={() => handleAnswerSelection(option)}>
                <span className="SalaInciso">{String.fromCharCode(65 + index)}</span>
                <button className={`SalaBtn ${isAnswerCorrect === true ? 'green' : isAnswerCorrect === false ? 'red' : ''}`}>
                  {option}
                </button>
              </div>
            ))}
          </div>
          <div className="SalaAnswersContent">
            {options.slice(2, 4).map((option, index) => (
              <div className="SalaAnswer" key={index + 2} onClick={() => handleAnswerSelection(option)}>
                <span className="SalaInciso">{String.fromCharCode(67 + index)}</span>
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
              id='userAnswer'
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button
              className="EnviarButton"
              onClick={checkAnswer}
            >
              <img src={enviar} alt="" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
