import  { useState } from 'react';
import { RuleLetras } from '../components/RuleLetras';
import { FontColor } from '../components/FontColor';

export function Azar() {
  const [selectedLetterOutside, setSelectedLetterOutside] = useState('');

  const handleLetterSelected = (letter) => {
    setSelectedLetterOutside(letter);
  };

  return (
    <>
      <div className="contendis">
        <div className="contenbtn">
          <RuleLetras onLetterSelected={handleLetterSelected} />
          <h1 className="title">Gira para obtener tu letra {selectedLetterOutside}</h1>
        </div>
      </div>
      <FontColor />
    </>
  );
}
