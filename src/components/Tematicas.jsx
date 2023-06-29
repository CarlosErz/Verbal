import { ModalError } from '../components/ModalError.jsx';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { dataTemas } from '../data/dataTemas.js';
import { dataModalLog } from '../data/dataModalLog.js';
import { useState, useEffect } from 'react';

function Tematica({ tema, imagenes, alt1, Sala }) {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setLoggedIn(true);
    }
  }, []);
  alt1 = 'Imagen de Tematica';
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

  const [showModal, setShowModal] = useState(false);


  const handleTematicaClick = () => {
    if (!loggedIn) {
      setShowModal(true);
    } else {
      // Acción adicional para el caso en que el usuario esté registrado
      // ...
    }
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
                onClick={handleTematicaClick}
              >
                <img className="Tematica" src={imagen} alt={alt1} />
              </Link>
            </div>
          ))}
        </Slider>

      </div>
      {showModal && !loggedIn && (
        <ModalError
          Title={dataModalLog[0].Title}
          TipoError={dataModalLog[0].TipoError}
          bt1={dataModalLog[0].bt1}
          bt2={dataModalLog[0].bt2}
          link1={dataModalLog[0].link1}
          link2={dataModalLog[0].link2}
        />
      )}

    </>
  );
}

Tematica.propTypes = {
  tema: PropTypes.string.isRequired,
  imagenes: PropTypes.arrayOf(PropTypes.string).isRequired,
  alt1: PropTypes.string.isRequired,
  Sala: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export function Tematicas({ alt1 }) {
  return (
    <div className="prueba">
      {dataTemas.map(({ tema, imagenes, Sala }, temas) => (
        <Tematica
          key={temas}
          tema={tema}
          imagenes={imagenes}
          alt1={alt1}
          Sala={Sala}
        />
      ))}
    </div>
  );
}

Tematicas.propTypes = {
  alt1: PropTypes.string.isRequired,
};
