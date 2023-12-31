import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './header-page.css';
import './header-page-mobile.css';
import Menu from '../menu/menu';

function HeaderPage({ pageId, pages, page }) {
  let [ menuLine, setMenuLine ] = useState('retracted');
  let [ isMenuVisible, setIsMenuVisible ] = useState(false);

  const toggleLine = () => setMenuLine(menuLine === 'retracted' ? 'expanded' : 'retracted')
  const hideMenu = () => setIsMenuVisible(false);
  const openMenu = () => setIsMenuVisible(true);



  return (
    <div className='header-page'>
      <Menu isMenuVisible={isMenuVisible} hideMenu={hideMenu} />
      <div className='header-page__logos'>
        <Link className='header-page__logos-attention-wrapper' to={`/`}>
          <img className='header-page__logos-attention' src='./images/global/attention2.svg' alt='logo'/>
        </Link>
        <img className='header-page__logos-ok' src='./images/global/ok2.svg' alt='logo'/>
      </div>
      {/* <div className="header-page__navigation">
        <Link className='header-page__link' to={`/page/${pageId.prevPageId}`}>
          <img className="header-page__link-image header-page__prev-page" src="./images/global/leftarrow.svg" />
          <p className="header-page__link-text">{pages[pageId.prevPageId - 1].title}</p>
        </Link>
        <div className="header-page__navigation-line" />
        <Link className='header-page__link' to={`/page/${pageId.nextPageId}`}>
          <p className="header-page__link-text">{pages[pageId.nextPageId - 1].title}</p>
          <img className="header-page__link-image header-page__next-page" src="./images/global/rightarrow.svg" />
        </Link>
      </div> */}
      <div
        className='header-page__menu-button'
        onMouseEnter={toggleLine}
        onMouseLeave={toggleLine}
        onClick={openMenu}
      >
        <div className='header-page__menu-button-line' />
        <div className='header-page__menu-button-line' style={ menuLine === 'expanded' ? { width: '100%' } : { width: '50%' }} />
        <div className='header-page__menu-button-line' />
      </div>
    </div>
  )
}

export default HeaderPage;
