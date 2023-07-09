import { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import '../css/components.css';

export function RuleLetras() {
  const [rotation, setRotation] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isStopped, setIsStopped] = useState(false); // Nuevo estado para controlar si la ruleta se ha detenido
  const draggableRef = useRef(null);

  const handleDrag = (_, { deltaX }) => {
    setIsDragging(true);
    const newRotation = rotation + deltaX * 0.1;
    setRotation(newRotation);
  };

  const stopRotation = () => {
    setIsStopped(true); // Establecer el estado isStopped en true para detener la rotación
  };

  useEffect(() => {
    if (!isDragging && !isStopped) { // Verificar que la ruleta no se esté arrastrando y no se haya detenido
      let animationId;
      let timeoutId;

      const startAnimation = () => {
        animationId = requestAnimationFrame(() => {
          setRotation((prevRotation) => prevRotation + 22);
          startAnimation();
        });
      };

      const stopAnimation = () => {
        cancelAnimationFrame(animationId);
        clearTimeout(timeoutId);
        setSelectedLetter(getSelectedLetter(rotation)); // Llamar a getSelectedLetter para actualizar la letra seleccionada
      };

      timeoutId = setTimeout(stopAnimation, 3000);

      startAnimation();

      return () => {
        clearTimeout(timeoutId);
        cancelAnimationFrame(animationId);
      };
    }
  }, [isDragging, isStopped, rotation]); 

  const getSelectedLetter = (rotation) => {
    const normalizedRotation = (rotation % 360 + 360) % 360;
    const letterIndex = Math.floor(normalizedRotation / 22.5);
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const selected = letters.charAt(letterIndex);
    return selected;
  };

  return (
    <div className="rueda-container">
      <Draggable
        axis="x"
        bounds="parent"
        onDrag={handleDrag}
        onStop={() => setIsDragging(false)}
        onStart={() => setIsDragging(true)}
        nodeRef={draggableRef}
      >
        <ul className={`rueda ${isDragging ? 'rotating' : ''}`} ref={draggableRef}>
          <li style={{ transform: `rotate(${rotation}deg)` }}>A</li>
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
          <li style={{ transform: `rotate(${rotation + 22.5 * 25}deg)` }}>Z</li>
        </ul>
      </Draggable>
      <div className="selected-letter">Letra seleccionada: {selectedLetter}</div>
      <button className='StoRulet' onClick={stopRotation}>
        Parar
      </button>
    </div>
  );
}
