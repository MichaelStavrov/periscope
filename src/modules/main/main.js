import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import Header from '../header/header';

function Main() {
  const { global } = require('../../data.json');
  let [ button, setButton ] = useState('retracted');
  function handleButton() {
    if (button === 'retracted') {
      setButton('expanded');
    } else {
      setButton('retracted');
    }
  }
  return (
    <div className='main'>
    <div className='main__header'>
      <Header />
      <div className='main__text'>{global.text}</div>
      <Link to='/map'>
      <div className='main__button' onMouseEnter={() => handleButton()}
      onMouseLeave={() => handleButton()}>
        <div className='main__button-outer' />
        <div className='main__button-inner' style={ button === 'expanded' ? { width: '150px', height: '150px' } : null }>
          <img className='main__button-arrow' src='./images/global/arrow.svg' alt='arrow' />
          <div className='main__button-text'>смотреть</div>
        </div>
      </div>
      </Link>
      </div>
      <div className='main__map' style={{ backgroundImage: 'url(./images/global/testmap.png)' }} />
    </div>
  )
}

export default Main;
