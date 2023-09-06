
import Slider from "react-slick";
import { CardSectionGame } from "../components/CardSectionGame";
import { dataChooseGame } from "../data/DataChooseGame.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function TypeOfGame() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3, // Mostrar 3 tarjetas en pantallas grandes
    slidesToScroll: 1,
    autoplay: true,
    variableWidth: true,
    centerMode: true,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1024, // Pantallas medianas y más pequeñas
        settings: {
          infinite: true,
          slidesToShow: 2, // Mostrar 2 tarjetas en pantallas medianas
        },
      },
      {
        breakpoint: 768, // Pantallas pequeñas
        settings: {
          infinite: true,
          slidesToShow: 1, // Mostrar 1 tarjeta en pantallas pequeñas
        },
      },
    ],
  };
  return (
    <div className="CardContentCards">
      <h1 className="title">Escoge tu modo de juego</h1>
      <section className="CardSection">
        <Slider {...settings}>
          {dataChooseGame.map((item, index) => (
            <CardSectionGame key={index} Game={item.Game} img={item.image} />
          ))}
        </Slider>
      </section>
    </div>
  );
}
