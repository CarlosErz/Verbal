
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { dataTemas } from '../data/dataTemas.js';
import { useState } from 'react';


function Tematica({ tema, imagenes, alt1, Sala,Click }) {

 const [loggedIn] = useState(false);
  const numSlidesToShow = Math.min(3, imagenes.length); // Limitar el número de slides a mostrar
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: numSlidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <>
      <div className="tema-container">
        <p className="temas">{tema}</p>
        <br />
        <Slider className="img" {...settings}>
          {imagenes.map((imagen, imgIndex) => (
            <div key={imgIndex} className="carousel-item">
              <Link
                to={loggedIn ? Sala[imgIndex] : '#'}
                className="carousel-link"
                onClick={Click}
              >
                <img className="Tematica" src={imagen} alt={alt1} />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
   
    </>
  );
}

Tematica.propTypes = {
  tema: PropTypes.string.isRequired,
  imagenes: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt1: PropTypes.string.isRequired,
  Sala: PropTypes.arrayOf(PropTypes.string).isRequired,
  Click: PropTypes.func.isRequired,
};

export function Tematicas({ alt1,Click }) {
  return (
    <div className="prueba">
      {dataTemas.map(({ tema, imagenes, Sala, }, temas) => (
        <Tematica
          key={temas}
          tema={tema}
          imagenes={imagenes}
          alt1={alt1}
          Sala={Sala}
          Click={Click}
        />
      ))}
    </div>
  );
}

Tematicas.propTypes = {
  alt1: PropTypes.string.isRequired,
  Click: PropTypes.func.isRequired,

};
