import  { useState } from 'react';
import Confetti from 'react-confetti';
import '../css/components.css';
import ruletaAudio from '../assets/sounds/ruleta.mp3';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const anglePerLetter = 360 / letters.length;

const getSelectedLetter = rotation => {
  const normalizedRotation = (rotation % 360 + 360) % 360;
  const letterIndex = Math.floor(normalizedRotation / anglePerLetter);
  return letters.charAt(letterIndex);
};

export function RuleLetras() {
  const [rotation, setRotation] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isStopped, setIsStopped] = useState(true);

  const rouletteSound = new Audio(ruletaAudio);

  const spin = () => {
    const vueltasCompletas = 2;
    const rotacionTotal = 360 * vueltasCompletas + Math.random() * anglePerLetter * letters.length;

    setRotation(rotation + rotacionTotal);
    setSelectedLetter(getSelectedLetter(rotation + rotacionTotal));
    setShowModal(true);
    setShowConfetti(true);
    setIsStopped(false);
    rouletteSound.play(); // Reproduce el sonido de la ruleta al iniciar el giro

    setTimeout(() => {
      setShowConfetti(false);
      setShowModal(false);
      
      setIsStopped(true);
      rouletteSound.pause(); // Detiene el sonido de la ruleta después de 4 segundos
      rouletteSound.currentTime = 0; // Reinicia el audio para que esté listo para reproducirse nuevamente
    }, 7000); 
  };

  return (
    <>
      {showModal && (
        <div className="Letra">
          <div className="flex">
            <p className="letra_conten">{selectedLetter}</p>
          </div>
        </div>
      )}
      <div className="rueda-container">
        <div className="Spin" onClick={spin}>
          <h1 className="title">Gira</h1>
        </div>
        <div className={`rueda ${isStopped ? 'stopped' : ''}`}>
          {showConfetti && <Confetti />}
          <div style={{ transform: `rotate(${rotation}deg)` }}>A</div>

          <div style={{ transform: `rotate(${rotation + 14.2 * 1}deg)` }}>B</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 2}deg)` }}>C</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 3}deg)` }}>D</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 4}deg)` }}>E</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 5}deg)` }}>F</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 6}deg)` }}>G</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 7}deg)` }}>H</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 8}deg)` }}>I</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 9}deg)` }}>J</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 10}deg)` }}>K</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 11}deg)` }}>L</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 12}deg)` }}>M</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 13}deg)` }}>N</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 14}deg)` }}>Ñ</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 15}deg)` }}>O</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 16}deg)` }}>P</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 17}deg)` }}>Q</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 18}deg)` }}>R</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 19}deg)` }}>S</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 20}deg)` }}>T</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 21}deg)` }}>V</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 22}deg)` }}>X</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 23}deg)` }}>W</div>
          <div style={{ transform: `rotate(${rotation + 14.2 * 24}deg)` }}>Y</div>
        </div>
      </div>
    </>
  );
}
