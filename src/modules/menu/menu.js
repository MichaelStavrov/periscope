import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import './menu-mobile.css';
import Button from '../button/button';
import { pages } from '../../data/pages.js';

function Menu({ isMenuVisible, hideMenu, isXhidden }) {
  const { global } = require('../../data.json');

  useEffect(() => {
    const menuElem = document.getElementById('menu-container');
    document.documentElement.style.overflowY = isMenuVisible ? 'hidden' : 'auto'

    if (menuElem) {
      menuElem.style.overflowY = isMenuVisible ? 'auto' : 'hidden'
    }
  }, [isMenuVisible])

  return (
    <div className='menu' id="menu-container" style={{ display: isMenuVisible ? 'flex' : 'none' }}>
      {isXhidden ? null : <img className='menu__close' src='./images/global/close.svg' onClick={hideMenu} alt='menu' />}
      <div className='menu__text'>{global.text}</div>
      <div className='menu__buttons'>
        <MapButton hideMenu={hideMenu} />
        <Button text='Страница фонда' color='#EE8208' link='https://ok.ru/vnimanie.f' />
      </div>
      <div className='menu__pages'>
        {
          pages.map((page, index) =>
              <Link key={page.id} to={`/page/${page.id}`}>
                <div className='menu__page' style={{ backgroundImage: `url(./images/pages/${page.image}-small.png)` }} onClick={() => {
                  hideMenu();
                  window.scrollTo(0, 0);
                }} />
              </Link>
          )
        }
      </div>
      <div className='menu__logos'>
        <img className='menu__attention-icon' src={'./images/global/menu-attention.svg'} alt='logo' />
        <img className='menu__logo-black' src={'./images/global/menu-logo-black.svg'} alt='logo' />
      </div>
    </div>
  )
}

// <Button text='Помочь фонду' color='#7D8083' link='https://fondvnimanie.ru/donate' />

function MapButton({ hideMenu }) {
  return (
    <Link to="/map">
      <Button text='Страница карты' color='#7D8083' link='#'/>
    </Link>
  )
}

export default Menu;
