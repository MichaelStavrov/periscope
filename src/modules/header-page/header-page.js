import React, { useState } from 'react';
import './header-page.css';
import './header-page-mobile.css';
import Menu from '../menu/menu';

function HeaderPage({ openPage }) {
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
    <div className='header-page'>
      <Menu display={menu} hideMenu={handleMenu} openPage={openPage} />
      <div className='header-page__logos'>
        <img className='header-page__logos-attention' src='./images/global/attention2.svg'/>
        <img className='header-page__logos-ok' src='./images/global/ok2.svg'/>
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
