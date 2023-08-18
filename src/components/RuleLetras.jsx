import { useState } from 'react';
import Confetti from 'react-confetti';
import '../css/components.css';
import PropTypes from 'prop-types';

const anglePerLetter = 360 / 27.5;
const lettersAndAngles = [
  { letter: 'A', angle: 0 },
  { letter: 'B', angle: anglePerLetter * 1 },
  { letter: 'C', angle: anglePerLetter * 2 },
  { letter: 'D', angle: anglePerLetter * 3 },
  { letter: 'E', angle: anglePerLetter * 4 },
  { letter: 'F', angle: anglePerLetter * 5 },
  { letter: 'G', angle: anglePerLetter * 6 },
  { letter: 'H', angle: anglePerLetter * 7 },
  { letter: 'I', angle: anglePerLetter * 8 },
  { letter: 'J', angle: anglePerLetter * 9 },
  { letter: 'K', angle: anglePerLetter * 10 },
  { letter: 'L', angle: anglePerLetter * 11 },
  { letter: 'M', angle: anglePerLetter * 12 },
  { letter: 'N', angle: anglePerLetter * 13 },
  { letter: 'Ñ', angle: anglePerLetter * 14 },
  { letter: 'O', angle: anglePerLetter * 15 },
  { letter: 'P', angle: anglePerLetter * 16 },
  { letter: 'Q', angle: anglePerLetter * 17 },
  { letter: 'R', angle: anglePerLetter * 18 },
  { letter: 'S', angle: anglePerLetter * 19 },
  { letter: 'T', angle: anglePerLetter * 20 },
  { letter: 'U', angle: anglePerLetter * 21 },
  { letter: 'V', angle: anglePerLetter * 22 },
  { letter: 'W', angle: anglePerLetter * 23 },
  { letter: 'X', angle: anglePerLetter * 24 },
  { letter: 'Y', angle: anglePerLetter * 25 },
  { letter: 'Z', angle: anglePerLetter * 26 },
];

export function RuleLetras({ setSelectedLetter }) {
  const [showConfetti, setShowConfetti] = useState(false);

  const getRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  };
  
  const startSpin = () => {
    setShowConfetti(true);

    const rotationDuration = 100;
    const minRevolutions = 5;
    const maxRevolutions = 15;
    const totalRevolutions = Math.floor(Math.random() * (maxRevolutions - minRevolutions + 1)) + minRevolutions;

    const angleIncrement = 360 / (rotationDuration / 30);
    const randomStopAngle = Math.random() * 360; // Genera un ángulo aleatorio

    let currentAngle = 0;
    let revolutions = 0;

    const intervalId = setInterval(() => {
      currentAngle = (currentAngle + angleIncrement) % 360;
      document.querySelector(".rueda").style.transform = `rotate(${currentAngle}deg)`;

      if (currentAngle === 0) {
        revolutions++;
        console.log(`Giro ${revolutions} completado.`);
      }

      if (revolutions >= totalRevolutions && currentAngle >= randomStopAngle) {
        clearInterval(intervalId);
        stopSpin(currentAngle);
      }
    }, 30); // Intervalo en milisegundos
  };

  const stopSpin = (finalAngle) => {
    setShowConfetti(false);
    
    const normalizedFinalAngle = (finalAngle + 360) % 360;
    const selectedLetter = getRandomLetter(normalizedFinalAngle);
    
    setSelectedLetter(selectedLetter);
    console.log(`La letra seleccionada es ${selectedLetter}`);
    console.log(`La ruleta se detuvo en el ángulo ${normalizedFinalAngle}°`);
  };


  return (
    <>
      <div className="rueda-container">
        <div className="Spin" onClick={startSpin}>
          <h1 className="title">Gira</h1>
        </div>
        <div className="rueda">
          {showConfetti && <Confetti />}
          {lettersAndAngles.map(item => (
            <div key={item.letter} style={{ transform: `rotate(${item.angle}deg)` }}>
              {item.letter}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

RuleLetras.propTypes = {
  setSelectedLetter: PropTypes.func
};

