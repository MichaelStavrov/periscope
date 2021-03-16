import React, { useState } from 'react';
import './header-page.css';
import './header-page-mobile.css';
import Menu from '../menu/menu';

function HeaderPage() {
  let [ menuLine, setMenuLine ] = useState('retracted');
  let [ isMenuVisible, setIsMenuVisible ] = useState(false);
  function handleLine() {
    if (menuLine === 'retracted') {
      setMenuLine('expanded');
    } else {
      setMenuLine('retracted');
    }
  }
  function handleMenu() {
    setIsMenuVisible(!isMenuVisible)
  }
  return (
    <div className='header-page'>
      <Menu isMenuVisible={isMenuVisible} hideMenu={handleMenu} />
      <div className='header-page__logos'>
        <img className='header-page__logos-attention' src='./images/global/attention2.svg' alt='logo'/>
        <img className='header-page__logos-ok' src='./images/global/ok2.svg' alt='logo'/>
      </div>
      <div
        className='header-page__menu-button'
        onMouseEnter={() => handleLine()}
        onMouseLeave={() => handleLine()}
        onClick={() => handleMenu()}
      >
        <div className='header-page__menu-button-line' />
        <div className='header-page__menu-button-line' style={ menuLine === 'expanded' ? { width: '100%' } : { width: '50%' }} />
        <div className='header-page__menu-button-line' />
      </div>
    </div>
  )
}

export default HeaderPage;
