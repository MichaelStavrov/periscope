import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import Button from '../button/button';

function Menu({ display, hideMenu, openPage }) {
  const { pages, global } = require('../../data.json');
  function handlePage(index) {
    if (openPage) {
      openPage(index)
    }
    hideMenu();
  }
  return (
    <div className='menu' style={ display === 'visible' ? { display: 'flex' } : { display: 'none' } }>
      <img className='menu__close' src='./images/global/close.svg' onClick={() => hideMenu()} alt='menu' />
      <div className='menu__text'>{global.text}</div>
      <div className='menu__buttons'>
        <Button text='Помочь фонду' color='#7D8083' link='#' />
        <Button text='Страница фонда' color='#EE8208' link='#' />
      </div>
      <div className='menu__pages'>
        {
          pages.map((page, index) => {
            return (
              <Link to={{ pathname: '/page', state: page.id }}>
                <div className='menu__page' style={{ backgroundImage: `url(./images/pages/${page.image}.png)` }} data-direction='none' onClick={() => handlePage(page.id)} />
              </Link>
            )
          })
        }
      </div>
      <img className='menu__logos' src={'./images/global/menu-logos.svg'} alt='logo' />
    </div>
  )
}

export default Menu;
