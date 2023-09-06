
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function CardSectionGame ({ img, Game, isCenter }) {
  return (
    <article className={`CardSectionGame ${isCenter ? 'centered' : ''}`}>
      <Link to={Game}>
        <header className="CardSectionContent">
          <img src={img} alt={Game} />
        </header>
      </Link>
    </article>
  );
}

CardSectionGame.propTypes = {
  img: PropTypes.string,
  Game: PropTypes.string,
  isCenter: PropTypes.bool // Asegurarse de que isCenter sea una prop requerida
};
