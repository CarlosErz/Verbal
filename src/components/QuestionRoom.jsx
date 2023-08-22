import { useState, useEffect } from 'react';
import '../pages/Sala.css';
import enviar from '/src/assets/Subtract.svg';
import Confetti from 'react-confetti';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { ModalGame } from '../components/ModalGame';



export function QuestionRoom({ questionData }) {
  const [questions, setQuestions] = useState(questionData);
  const [selectedQuestionIndexes, setSelectedQuestionIndexes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [scoreerror, setScoreerror] = useState(0);
  const [scoreTotal, setScoreTotal] = useState(0);

  const [ShowModalLost, setShowModalLost] = useState(false);
  const [ShowModafin, setShowModafin] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const options = currentQuestionIndex !== null ? questions[currentQuestionIndex].options : [];

  const getInitialTime = () => {
    if (scoreTotal >= 0 && scoreTotal <= 1000) {
      return 25;
    } else if (scoreTotal > 1000 && scoreTotal <= 5000) {
      return 20;
    } else if (scoreTotal > 5000 && scoreTotal <= 30000) {
      return 15;
    } else if (scoreTotal > 30000 && scoreTotal <= 50000) {
      return 12;
    } else if (scoreTotal > 50000 && scoreTotal <= 100000) {
      return 8;
    } else if (scoreTotal > 100000 && scoreTotal <= 200000) {
      return 4;
    } else if (scoreTotal > 200000 && scoreTotal <= 300000) {
      return 3;
    } else if (scoreTotal > 300000 && scoreTotal <= 400000) {
      return 2;
    }
    return 25; // Default time
  };


  //barra de progreso 
  const [time, setTime] = useState(getInitialTime());
  const initialTime = getInitialTime();

  useEffect(() => {
    const decreaseTime = () => {

      if (time > 0) {
        setTime(time - 1);
        const progressBar = document.getElementById('myBar');
        const progressPercentage = (time / initialTime) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        if (time <= 5) {
          progressBar.style.backgroundColor = '#f54242';
        } else if (time <= 10) {
          progressBar.style.backgroundColor = 'rgba(255, 196, 0, 1)'
        } else {
          progressBar.style.backgroundColor = 'rgba(46, 204, 113, 1)';
        }
      } else {
        const progressBar = document.getElementById('myBar');
        progressBar.style.width = '0%';
        if (progressBar.style.width === '0%') {
          setShowModalLost(true);
        }
      }
    };


    const timer = setInterval(decreaseTime, 1000); // Decrementa el tiempo cada segundo
    return () => {
      clearInterval(timer); // Limpia el intervalo cuando el componente se desmonta
    };
  }, [time, initialTime]);

  const resetTime = () => {
    setTime(initialTime);
    const progressBar = document.getElementById('myBar');
    const progressPercentage = (time / initialTime) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.style.backgroundColor = 'rgba(46, 204, 113, 1)';
  };


  const getRandomQuestionIndex = useCallback(() => {
    const availableIndexes = questions.map((_, index) => index).filter(index => !selectedQuestionIndexes.includes(index));
    if (availableIndexes.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * availableIndexes.length);
    return availableIndexes[randomIndex];
  }, [questions, selectedQuestionIndexes]);


  const goToNextRandomQuestion = useCallback(() => {
    const randomIndex = getRandomQuestionIndex();
    if (randomIndex !== null) {
      setSelectedQuestionIndexes([...selectedQuestionIndexes, randomIndex]);
      setCurrentQuestionIndex(randomIndex);
      setUserAnswer('');
    } else {
      setShowModafin(true);
    }
  }, [selectedQuestionIndexes, getRandomQuestionIndex]);

  const checkAnswer = () => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    let newScoreTotal = scoreTotal;

    if (userAnswer === correctAnswer) {
      setScore(score + 1);
      newScoreTotal += 1000;
      setIsAnswerCorrect(true);
      setShowConfetti(true);
      setSelectedOption(null); // Corregido

      resetTime();
    } else {
      newScoreTotal = Math.max(0, newScoreTotal - 500);
      setScoreerror(scoreerror + 1);
      setIsAnswerCorrect(false);
    }

    setScoreTotal(newScoreTotal);

    setTimeout(() => {
      setShowConfetti(false);
      setSelectedOption(null); // Corregido
      goToNextRandomQuestion();
      setIsAnswerCorrect(null);
    }, 1000);
  };




  const handleAnswerSelection = (option) => {
    setSelectedOption(option);
    setUserAnswer(option);
  };

  const restartGame = () => {
    setSelectedQuestionIndexes([]);
    setCurrentQuestionIndex(null);
    setUserAnswer('');
    setScore(0);
    setScoreTotal(0); // Corregido
    setScoreerror(0);
    setShowModalLost(false);
    setShowModafin(false);
    setShowConfetti(false);
    resetTime();
  };


  useEffect(() => {
    setQuestions(questionData);
  }, [questionData]);

  useEffect(() => {
    if (currentQuestionIndex === null && selectedQuestionIndexes.length < questions.length) {
      goToNextRandomQuestion();
    }
  }, [selectedQuestionIndexes, currentQuestionIndex, questions.length, goToNextRandomQuestion]);


  return (
    <div className="SalaSolo">
      
      {ShowModalLost && (
        <ModalGame
        title='¡Perdiste!'
        subtitle='No te desanimes, inténtalo de nuevo'
        scoreTotal={scoreTotal}
        score={score}
        scoreerror={scoreerror}
        restartGame={restartGame}
        btn='Volver a jugar'
        />
      )}
      {ShowModafin && (
      <ModalGame
      title='¡Felicidades!'
      subtitle='Acabaste con todas las preguntas'
      scoreTotal={scoreTotal}
      score={score}
      scoreerror={scoreerror}
      restartGame={restartGame}
      btn='Volver a jugar'
      />
      )}

      {showConfetti && <Confetti />}



      <div className="SalaContent">
        <section className="SalaGame">
          <div className="SalaGameHeader">
            <div className="progress-container ">
              <div className="progress-bar" id="myBar"></div>
            </div>
            <h2 className="SalaQuestion">

              {currentQuestionIndex !== null ? questions[currentQuestionIndex].question : "Cargando pregunta..."}
            </h2>
            <div className="scores">
              <div className="SalaPuntaje">
                <p>Puntaje</p>
                <span>{scoreTotal}</span>
              </div>
            </div>
          </div>
          <div className="SalAnswerContentR">
            <div className="SalaAnswersContent">
              {options.slice(0, 2).map((option, index) => (
                <div className={`SalaAnswer ${selectedOption === option ? 'active' : ''}`}
                  key={index}
                  onClick={() => handleAnswerSelection(option)}>
                  <span className="SalaInciso">{String.fromCharCode(65 + index)}</span>
                  <button className={`SalaBtn ${isAnswerCorrect === true ? 'green' : isAnswerCorrect === false ? 'red' : ''}`}>
                    {option}
                  </button>
                </div>
              ))}
            </div>
            <div className="SalaAnswersContent">
              {options.slice(2, 4).map((option, index) => (
                <div className={`SalaAnswer ${selectedOption === option ? 'active' : ''}`}
                  key={index + 2}
                  onClick={() => handleAnswerSelection(option)}>
                  <span className="SalaInciso">{String.fromCharCode(67 + index)}</span>
                  <button className={`SalaBtn ${isAnswerCorrect === true ? 'green' : isAnswerCorrect === false ? 'red' : ''}`}>
                    {option}
                  </button>
                </div>
              ))}
            </div>
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

QuestionRoom.propTypes = {
  questionData: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    correctAnswer: PropTypes.string.isRequired,
  })).isRequired,

}