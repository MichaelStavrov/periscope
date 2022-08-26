import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import './main-mobile.css';
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
        <Header isMenuOpen isXhidden />
      </div>
    </div>
  )
}

export default Main;
