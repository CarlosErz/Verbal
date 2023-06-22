import PropTypes from 'prop-types';
export function Tematicas({ imagen1,imagen2,imagen3, alt1, alt2, alt3 }) {
  return (
    <>
      <div className="Card-tematica">
        <img className='Tematica' src={imagen1} alt={alt1} />
      </div>
      <div className="Card-tematica">
        <img className='Tematica' src={imagen2} alt={alt2} />
      </div>
      <div className="Card-tematica">
        <img className='Tematica' src={imagen3} alt={alt3} />
      </div>
    </>

  )
}
Tematicas.propTypes = {
  imagen1: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  imagen2: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  imagen3: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  alt1: PropTypes.string.isRequired,
  alt2: PropTypes.string.isRequired,
  alt3: PropTypes.string.isRequired,
}