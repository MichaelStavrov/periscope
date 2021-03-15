import React, { useState } from 'react';
import './header.css';
import Menu from '../menu/menu';

function Header() {
  let [ menuLine, setMenuLine ] = useState('retracted');
  let [ menu, setMenu ] = useState('hidden');
  function handleLine() {
    if (menuLine === 'retracted') {
      setMenuLine('expanded');
    } else {
      setMenuLine('retracted');
    }
  }
  function handleMenu() {
    if (menu === 'hidden') {
      setMenu('visible');
    } else {
      setMenu('hidden');
    }
  }
  return (
    <div className='header'>
      <Menu display={menu} hideMenu={handleMenu} />
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
