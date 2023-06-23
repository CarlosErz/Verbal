import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { dataTemas } from '../data/dataTemas.js';

function Tematica({ tema, imagenes, alt1 }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="tema-container">
      <p className="temas">{tema}</p>
      <br />
      <Slider className='img' {...settings}>
        {imagenes.map((imagen, imgIndex) => (
          <div className='bt' key={imgIndex}>
            <img className="Tematica" src={imagen} alt={alt1} />
            <br />
          </div>
        ))}
      </Slider>
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
