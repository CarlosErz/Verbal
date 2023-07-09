import { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import Confetti from 'react-confetti';
import '../css/components.css';
import { Modal } from './Modal';

export function RuleLetras() {
  const [rotation, setRotation] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [isStopped, setIsStopped] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const dragAreaRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth <= 768); // Establecer el tamaño de pantalla deseado
    };

    handleResize(); // Llamar a la función para establecer el estado inicial

    window.addEventListener('resize', handleResize); // Escuchar los cambios de tamaño de la ventana

    return () => {
      window.removeEventListener('resize', handleResize); // Limpiar el listener al desmontar el componente
    };
  }, []);
  const stopRoulette = () => {
    if (!isStopped) {
      setIsStopped(true);
      setSelectedLetter(getSelectedLetter(rotation));
      setShowConfetti(true);
      setShowModal(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowModal(false);
      }, 3000);
    }
    else {
      setIsStopped(false);
    }
  };

  const bind = useDrag(
    ({ down, movement: [deltaX], event }) => {
      if (!down) {
        setIsStopped(true);
        setSelectedLetter(getSelectedLetter(rotation));
      }
      if (isMobile && event.type === 'touchmove') {
        setRotation(prevRotation => prevRotation + deltaX * 1000);
      } else {
        setRotation(prevRotation => prevRotation + deltaX * 0.1);
      }
    },
    { dragArea: dragAreaRef }
  );

  useEffect(() => {
    if (!isStopped) {
      let animationId;
      let timeoutId;

      const startAnimation = () => {
        animationId = requestAnimationFrame(() => {
          setRotation(prevRotation => prevRotation + 22);
          startAnimation();
        });
      };

      const stopAnimation = () => {
        cancelAnimationFrame(animationId);
        clearTimeout(timeoutId);
        setSelectedLetter(getSelectedLetter(rotation));
        
      };

      timeoutId = setTimeout(stopAnimation, 3000);

      startAnimation();

      return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(animationId);
      };
    }
  }, [isStopped, rotation]);

  const getSelectedLetter = rotation => {
    const normalizedRotation = (rotation % 360 + 360) % 360;
    const letterIndex = Math.floor(normalizedRotation / 22.5);
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const selected = letters.charAt(letterIndex);
    console.log(selected);
    setShowConfetti(true);
    setShowModal(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowModal(false);
    }, 3000);
    return selected;
  };


  return (
    <div className="rueda-container" ref={dragAreaRef}>
      {showConfetti && <Confetti />}
      {showModal && <Modal Title={`Letra ${selectedLetter}`} />}
      <div
        ref={dragAreaRef}
        className={`rueda ${isStopped ? '' : 'rotating'}`}
        {...bind()}
      >
        <div style={{ transform: `rotate(${rotation}deg)` }}>A</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 1}deg)` }}>B</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 2}deg)` }}>C</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 3}deg)` }}>D</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 4}deg)` }}>E</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 5}deg)` }}>B</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 6}deg)` }}>C</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 7}deg)` }}>D</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 8}deg)` }}>E</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 9}deg)` }}>F</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 10}deg)` }}>G</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 11}deg)` }}>H</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 12}deg)` }}>I</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 13}deg)` }}>J</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 14}deg)` }}>K</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 15}deg)` }}>L</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 16}deg)` }}>M</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 17}deg)` }}>N</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 18}deg)` }}>Ñ</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 19}deg)` }}>O</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 20}deg)` }}>P</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 21}deg)` }}>Q</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 22}deg)` }}>R</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 23}deg)` }}>S</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 24}deg)` }}>T</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 25}deg)` }}>V</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 26}deg)` }}>X</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 28}deg)` }}>Y</div>
      </div>
      <div className="btns">
        <button className='RunRulet' onClick={stopRoulette}>
          {isStopped ? 'Girar' : 'Detener'}
        </button>
      </div>
    </div>
  );
}
