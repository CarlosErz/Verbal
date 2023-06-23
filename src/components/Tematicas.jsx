
import PropTypes from 'prop-types';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { dataTemas } from '../data/dataTemas.js';

function Tematica({ tema, imagenes, alt1 }) {
  const responsive = {
    1024: { items: 3 },
    768: { items: 2 },
    480: { items: 2 },
    0: { items: 1 },
  };

  return (
    <div className="tema-container">
      <p className="temas">{tema}</p>
      <br />
      <AliceCarousel
        mouseTracking
        items={imagenes.map((imagen, imgIndex) => (
          <div className='bt' key={imgIndex}>
            <img className="Tematica" src={imagen} alt={alt1} />
            <br />
          </div>
        ))}
        responsive={responsive}
        autoPlay
        autoPlayInterval={2000}
        infinite
      />
    </div>
  );
}

Tematica.propTypes = {
  tema: PropTypes.string.isRequired,
  imagenes: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt1: PropTypes.string.isRequired,
};

export function Tematicas({ alt1 }) {
  return (
    <div className="prueba">
      {dataTemas.map(({ tema, imagenes }, temas) => (
        <Tematica
          key={temas}
          tema={tema}
          imagenes={imagenes}
          alt1={alt1}
        />
      ))}
    </div>
  );
}

Tematicas.propTypes = {
  alt1: PropTypes.string.isRequired,
};
