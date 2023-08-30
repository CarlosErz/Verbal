import { useState, useEffect } from "react";
import { CardSectionGame } from "../components/CardSectionGame";
import { dataChooseGame } from "../data/DataChooseGame.js";

export function TypeOfGame() {
  const cardWidth = 80; 
  
  // Ajusta este valor según el ancho de tus tarjetas
  const maxScrollPosition = (dataChooseGame.length - 1) * cardWidth;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [centerIndex, setCenterIndex] = useState(0);

  const scrollLeft = () => {
    const newPosition = scrollPosition - cardWidth;
    if (newPosition < 0) {
      setScrollPosition(maxScrollPosition);
    } else {
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    const newPosition = scrollPosition + cardWidth;
    if (newPosition > maxScrollPosition) {
      setScrollPosition(0);
    } else {
      setScrollPosition(newPosition);
    }
  };

  useEffect(() => {
    const centerIndex = Math.round(scrollPosition / cardWidth);

    const clampedCenterIndex = Math.max(0, Math.min(centerIndex, dataChooseGame.length - 1));

    setCenterIndex(clampedCenterIndex);
  }, [scrollPosition]);

  return (
    <div className="CardContentCards">
      <section className="CardSection">
        <button className="CardSectionscrollLeft" onClick={scrollLeft}>
          &#10094;
        </button>
        <div className="movedsection">
          
        
        <div className="CardSectionFlex" style={{ marginLeft: -scrollPosition }}>
          {dataChooseGame.map((item, index) => (
            <CardSectionGame
              key={index}
              Game={item.Game}
              img={item.image}
              isCenter={index === centerIndex}
            />
          ))}
        </div>
        </div>
        <button className="CardSectionscrollRight" onClick={scrollRight}>
          &#10095;
        </button>
      </section>
    </div>
  );
}
