import React, { useState, useEffect } from 'react';
import './header.css';
import './header-mobile.css';
import Menu from '../menu/menu';

function Header() {
  let [ menuLine, setMenuLine ] = useState('retracted');
  let [ isMenuVisible, setIsMenuVisible ] = useState(true);
  function handleLine() {
    if (menuLine === 'retracted') {
      setMenuLine('expanded');
    } else {
      setMenuLine('retracted');
    }
  }
  function handleMenu() {
    setIsMenuVisible(!isMenuVisible);
  }
  useEffect(() => {
    setIsMenuVisible(true);
  }, [])
  return (
    <div className='header'>
      <Menu isMenuVisible={isMenuVisible} hideMenu={handleMenu} />
      <div
        className='header__menu-button'
        onMouseEnter={() => handleLine()}
        onMouseLeave={() => handleLine()}
        onClick={() => handleMenu()}
      >
        <div className='header__menu-button-line' />
        <div className='header__menu-button-line' style={ menuLine === 'expanded' ? { width: '100%' } : { width: '50%' }} />
        <div className='header__menu-button-line' />
      </div>
      <div className='header__logos'>
        <img className='header__logos-attention' src='./images/global/attention.svg' alt='logo'/>
        <img className='header__logos-ok' src='./images/global/ok.svg' alt='logo'/>
      </div>
    </div>
  )
}

export default Header;
