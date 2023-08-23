
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
export function ModalGame({scoreTotal, score, scoreerror, restartGame, title, subtitle, btn}){
  return(
      <div className="lostGame">
        <div className='lostGame_content'>
          <h1 className='lostGame_title'>{title}</h1>
          <p className='lostGame_text'>{subtitle}</p>
          <p className='lostGame_puntaje'>Tu puntaje fue de <span>{scoreTotal} pts</span></p>

          <div className="losGame_score">

            <div className="scores">
              <div className="score">
                <p>✓</p>
                <span>{score}</span>
              </div>
              <div className="score_negative">
                <p>✖</p>
                <span>{scoreerror}</span>
              </div>
            </div>
          </div>
          <Link  onClick={restartGame}>{btn}</Link>
        </div>
      </div>
  )
}
ModalGame.propTypes = {
  scoreTotal: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  scoreerror: PropTypes.number.isRequired,
  restartGame: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  btn: PropTypes.string.isRequired,
}