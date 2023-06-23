import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { dataJuegos } from '../data/dataJuegos.js';

function Juego({ tema, imagenes, alt1 }) {
  const numSlidesToShow = Math.min(3, imagenes.length); // Limitar el número de slides a mostrar
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: numSlidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, imagenes.length), // Ajustar slidesToShow en la versión responsive
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(2, imagenes.length), // Ajustar slidesToShow en la versión responsive
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="tema-container">
      <p className="temas">{tema}</p>
      <br />
      <Slider className="img" {...settings}>
        {imagenes.map((imagen, imgIndex) => (
          <div key={imgIndex} className="carousel-item">
            <img className="Tematica" src={imagen} alt={alt1} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

Juego.propTypes = {
  tema: PropTypes.string.isRequired,
  imagenes: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt1: PropTypes.string.isRequired,
};

export function Juegos({ alt1 }) {
  return (
    <div className="prueba">
      {dataJuegos.map(({ tema, imagenes }, temas) => (
        <Juego
          key={temas}
          tema={tema}
          imagenes={imagenes}
          alt1={alt1}
        />
      ))}
    </div>
  );
}

Juegos.propTypes = {
  alt1: PropTypes.string.isRequired,
};
