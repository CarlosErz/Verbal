import { useState, useEffect } from 'react';
import { RuleLetras } from '../components/RuleLetras';
import { FontColor } from '../components/FontColor';
import PropTypes from 'prop-types';

export function Azar({ selectedLetter, setSelectedLetter }) {
  const [showLetter, setShowLetter] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedLetter !== '') {
      setShowLetter(false);
      setShowModal(true); // Mostrar el modal inmediatamente después de seleccionar una letra
  
      setTimeout(() => {
        setShowLetter(true);
      }, 3000);
  
      setTimeout(() => {
        setShowModal(false); // Cerrar el modal después de 2 segundos
      }, 6000); // 2 segundos después de mostrar el modal
    }
  }, [selectedLetter]);
  

  return (
    <>
      <div className="contendis">
        {showModal && (
          <div className="Letra">
            <div className="flex">
              <p className="letra_conten">{selectedLetter}</p>
            </div>
          </div>
        )}
        <div className="contenbtn">
          <RuleLetras
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
          />
          {selectedLetter.length ? (
            <h2 className="title">
              Tu letra es la <span className={`revealing-letter ${showLetter ? 'visible' : ''}`}>{selectedLetter}</span>
            </h2>
          ) : (
            <h1 className="title">Gira para obtener tu letra</h1>
          )}
        </div>
      </div>
      <FontColor />
    </>
  );
}

Azar.propTypes = {
  selectedLetter: PropTypes.string.isRequired,
  setSelectedLetter: PropTypes.func.isRequired,
};
