import { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import '../css/components.css';
import { Modal } from './Modal';

export function RuleLetras() {
  const [rotation, setRotation] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [isStopped, setIsStopped] = useState(true); // Nuevo estado para controlar si la ruleta se ha detenido
  const dragAreaRef = useRef(null);

  const bind = useDrag(
    ({ down, movement: [deltaX] }) => {
      if (!down) {
        setIsStopped(true);
        setSelectedLetter(getSelectedLetter(rotation)); // Llamar a getSelectedLetter para actualizar la letra seleccionada
      }
      setRotation(prevRotation => prevRotation + deltaX * 0.1);
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
        setSelectedLetter(getSelectedLetter(rotation)); // Llamar a getSelectedLetter para actualizar la letra seleccionada;
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
    return selected;
  };

  return (

    <div className="rueda-container" ref={dragAreaRef}>
      <Modal Title={`Letra ${selectedLetter}`} />
      <div className={`rueda ${isStopped ? '' : 'rotating'}`} {...bind()}>
        <div style={{ transform: `rotate(${rotation}deg)` }}>A</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 1}deg)` }}>B</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 2}deg)` }}>C</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 3}deg)` }}>D</div>
        <div style={{ transform: `rotate(${rotation + 22.5 * 4}deg)` }}>E</div>
        <li style={{ transform: `rotate(${rotation + 22.5 * 1}deg)` }}>B</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 2}deg)` }}>C</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 3}deg)` }}>D</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 4}deg)` }}>E</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 6}deg)` }}>F</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 7}deg)` }}>G</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 8}deg)` }}>H</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 9}deg)` }}>I</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 10}deg)` }}>J</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 11}deg)` }}>K</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 12}deg)` }}>L</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 13}deg)` }}>M</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 14}deg)` }}>N</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 15}deg)` }}>Ñ</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 16}deg)` }}>O</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 17}deg)` }}>P</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 18}deg)` }}>Q</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 19}deg)` }}>R</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 20}deg)` }}>S</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 21}deg)` }}>T</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 22}deg)` }}>V</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 23}deg)` }}>X</li>
        <li style={{ transform: `rotate(${rotation + 22.5 * 24}deg)` }}>Y</li>
        {/* Resto de las letras */}
      </div>
      <div className="btns">
      </div>
    </div>
  );
}
