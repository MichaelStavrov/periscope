import React, { useState, useEffect, useRef, useCallback } from 'react';
import './slider.css';

function Slider({ slides, page }) {
  let [ currentImageIndex, setCurrentImageIndex ] = useState(1);
  let [ containerHeight, setContainerHeight ] = useState('');
  const playerContainerRef = useRef(null);

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

  const handleSliderResize = useCallback(() => {
    const containerHeight = playerContainerRef.current.offsetWidth / 1.56;
    setContainerHeight(containerHeight);
  }, [])

  useEffect(() => {
    handleSliderResize()
    window.addEventListener('resize', handleSliderResize);

    return () => {
      window.removeEventListener('resize', handleSliderResize);
    }
  }, [handleSliderResize]);

  return (
    <div className='slider'>
      <div className='slider__image' ref={playerContainerRef} src={`./images/slider/${slides[currentImageIndex - 1]}`} alt='slide' style={{ height: containerHeight, backgroundImage: `url(./images/slider/${slides[currentImageIndex - 1]})` }}/>
      <div className='slider__buttons'>
        <img className='slider__button-left' src='./images/global/left.svg' data-direction="prev" onClick={switchSlide} alt='left-button' />
        <img className='slider__button-right' src='./images/global/right.svg' data-direction="next" onClick={switchSlide} alt='right-button' />
      </div>
      {
        page.author ?
        <div className="slider__author">
          <div className="slider__author-name">{page.author}</div>
          <div className="slider__author-text">Как выглядит сейчас</div>
        </div>
        :
        <div className="slider__how-looks-now">Как выглядит сейчас</div>
      }
    </div>
  )
}

export default Slider;
