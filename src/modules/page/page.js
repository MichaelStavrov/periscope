import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './page.css';
import './page-mobile.css';
import HeaderPage from '../header-page/header-page';
import Button from '../button/button';
import Slider from '../slider/slider';

function Page(props) {

  const {pk} = props;
  let { pages } = require('../../data.json');
  const currentPageId = Number.parseInt(pk || 0, 10);

  const pageId = {
    currentPageId: currentPageId,
    prevPageId: currentPageId === 1 ? pages.length : currentPageId - 1,
    nextPageId: currentPageId === pages.length ? 1 : currentPageId + 1
  };

  const page = pages[pageId.currentPageId - 1];

  return (
    <div className='page'>
      <HeaderPage />
      <Link to='/'>
        <div className='page__close' style={{ backgroundColor: page.color }}>
          <img className='page__close-icon' src='./images/global/close-small.svg' alt='button' />
        </div>
      </Link>
      <div className='page__container'>
        <div className='page__image-container'>
          <img className='page__image' src={`./images/pages/${page && page.image}.png`} alt='sight' />
          <Button text='Помочь фонду' color={page && page.color} link='#' />
        </div>
        <div className='page__data-container'>
          <div className='page__player'>
            <iframe className='page__player-frame' src={page.video} frameBorder="0" title="achitecture-video">
            </iframe>
          </div>
          <div className='page__location' style={{ color: page.color }} dangerouslySetInnerHTML={{ __html: page.location }}></div>
          <div className='page__years' style={{ color: page.color }} dangerouslySetInnerHTML={{ __html: page.years }}></div>
          <div className='page__text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
          <div className='page__comment'>
            <img className='page__comment-photo' src={`./images/photo/${page.comment.photo}`} alt="author" />
            <div className='page__comment-container'>
              <div className='page__comment-author' dangerouslySetInnerHTML={{ __html: page.comment.author }} style={{ color: page.color }}/>
              <div className='page__comment-comment'>Комментарий эксперта</div>
              <div className='page__comment-text' dangerouslySetInnerHTML={{ __html: page.comment.text }}/>
            </div>
          </div>
          <Slider slides={page.slider} />
          <div className='page__navigation'>
            <Link className='page__link' to={`/page/${pageId.prevPageId}`}>
              <div className='page__navigation-next'>
                <div className='page__navigation-title' style={{ color: pages[pageId.prevPageId - 1].color}}>{pages[pageId.prevPageId - 1].title}</div>
                <div className='page__navigation-location'>{pages[pageId.prevPageId - 1].location}</div>
              </div>
            </Link>
            <Link className='page__link' to={`/page/${pageId.nextPageId}`}>
              <div className='page__navigation-prev'>
                <div className='page__navigation-title' style={{ color: pages[pageId.nextPageId - 1].color}}>{pages[pageId.nextPageId - 1].title}</div>
                <div className='page__navigation-location'>{pages[pageId.nextPageId - 1].location}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;
