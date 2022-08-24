import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import './menu-mobile.css';
import Button from '../button/button';
import { pages } from '../../data/pages.js';

function Menu({ isMenuVisible, hideMenu }) {
  const { global } = require('../../data.json');

  return (
    <div className='menu' style={{ display: isMenuVisible ? 'flex' : 'none' }}>
      <img className='menu__close' src='./images/global/close.svg' onClick={hideMenu} alt='menu' />
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
      <img className='menu__logos' src={'./images/global/menu-logos.svg'} alt='logo' />
    </div>
  )
}

// <Button text='Помочь фонду' color='#7D8083' link='https://fondvnimanie.ru/donate' />

function MapButton({ hideMenu }) {
  return (
    <Link to="/" onClick={hideMenu}>
      <Button text='Страница карты' color='#7D8083' link='#' />
    </Link>
  )
}

export default Menu;
