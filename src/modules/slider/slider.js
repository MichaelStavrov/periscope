import React, { useState } from 'react';
import './slider.css';

function Slider({ slides }) {
  let [ currentImageIndex, setCurrentImageIndex ] = useState(1);

  function switchSlide(event) {
    const direction = event.currentTarget.dataset.direction;

    setCurrentImageIndex(previousState => {
      let newIndex = previousState;
      if (direction === 'next') {
          newIndex += 1;
      } else {
          newIndex -= 1;
      }

      if (newIndex === 0) {
          newIndex = slides.length;
      } else if (newIndex === slides.length + 1) {
          newIndex = 1;
      }

      return newIndex;
    })
  }

  return (
    <div className='slider'>
      <img className='slider__image' src={`./images/slider/${slides[currentImageIndex - 1]}`} alt='slide'/>
      <div className='slider__buttons'>
        <img className='slider__button-left' src='./images/global/left.svg' data-direction="prev" onClick={switchSlide} alt='left-button' />
        <img className='slider__button-right' src='./images/global/right.svg' data-direction="next" onClick={switchSlide} alt='right-button' />
      </div>
      <div className="slider__how-looks-now">Как выглядит сейчас</div>
    </div>
  )
}

export default Slider;
