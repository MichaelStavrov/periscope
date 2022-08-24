import React, { useState, useEffect } from 'react';
import './header.css';
import './header-mobile.css';
import Menu from '../menu/menu';

function Header({isMenuOpen}) {
  let [ menuLine, setMenuLine ] = useState('retracted');
  let [ isMenuVisible, setIsMenuVisible ] = useState(isMenuOpen);

  const toggleLine = () => setMenuLine(menuLine === 'retracted' ? 'expanded' : 'retracted')
  const hideMenu = () => setIsMenuVisible(false);
  const openMenu = () => setIsMenuVisible(true);

  return (
    <div className='header'>
      <Menu isMenuVisible={isMenuVisible} hideMenu={hideMenu} />
      <div
        className='header__menu-button'
        onMouseEnter={toggleLine}
        onMouseLeave={toggleLine}
        onClick={openMenu}
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
