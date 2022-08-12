import React from 'react';
import { Link } from 'react-router-dom';
import './page.css';
import './navigation.css';
import './comment.css';
import HeaderPage from '../header-page/header-page';
import Slider from '../slider/slider';
import { pages } from '../../data/pages.js';


function Page(props) {

  const {pk} = props;
  // let { pages } = require('../../data.json');
  const currentPageId = Number.parseInt(pk || 0, 10);

  const pageId = {
    currentPageId: currentPageId,
    prevPageId: currentPageId === 1 ? pages.length : currentPageId - 1,
    nextPageId: currentPageId === pages.length ? 1 : currentPageId + 1
  };

  const page = pages[pageId.currentPageId - 1];

  return (
    <div className='page'>
      <HeaderPage pageId={pageId} pages={pages} page={page} />
      <Link to='/map'>
        <div className='page__close' style={{ backgroundColor: page.color }}>
          <img className='page__close-icon' src='./images/global/close-small.svg' alt='button' />
        </div>
      </Link>
      <div className='page__container'>
        <div className='page__image-container'>
          <img className='page__image' src={`./images/pages/${page && page.image}.png`} alt='sight' />
        </div>
        <div className='page__data-container'>
          <div className='page__player'>
            <iframe className='page__player-frame' src={page.video} frameBorder="0" title="achitecture-video">
            </iframe>
          </div>
          <div className='page__location' style={{ color: page.color }} dangerouslySetInnerHTML={{ __html: page.location }}></div>
          <div className='page__years' style={{ color: page.color }} dangerouslySetInnerHTML={{ __html: page.years }}></div>
          <div className='page__text' dangerouslySetInnerHTML={{ __html: page.text }}></div>
          <Comment page={page} />
          <Slider slides={page.slider} />
          <PageNavigation pageId={pageId} pages={pages} />
        </div>
      </div>
    </div>
  )
}


function Comment({ page }) {
  return (
    <div className='page-comment'>
      <img className='page-comment__photo' src={`./images/photo/${page.comment.photo}`} alt="author" />
      <div className='page-comment__container'>
        <div className='page-comment__author' dangerouslySetInnerHTML={{ __html: page.comment.author }} style={{ color: page.color }}/>
        <div className='page-comment__comment'>Комментарий эксперта</div>
        <div className='page-comment__text' dangerouslySetInnerHTML={{ __html: page.comment.text }}/>
      </div>
    </div>
  )
}


function PageNavigation({ pageId, pages }) {
  return (
    <div className='page-navigation'>
      <Link className='page-navigation__link' to={`/page/${pageId.prevPageId}`}>

          <div className='page-navigation__next' onClick={(() => {window.scrollTo(0, 0)})}>
            <div className='page-navigation__title' style={{ color: pages[pageId.prevPageId - 1].color}}>{pages[pageId.prevPageId - 1].title}</div>
            <div className='page-navigation__location'>{pages[pageId.prevPageId - 1].location}</div>
          </div>

      </Link>
      <Link className='page-navigation__link' to={`/page/${pageId.nextPageId}`}>

          <div className='page-navigation__prev' onClick={(() => {window.scrollTo(0, 0)})}>
            <div className='page-navigation__title' style={{ color: pages[pageId.nextPageId - 1].color}}>{pages[pageId.nextPageId - 1].title}</div>
            <div className='page-navigation__location'>{pages[pageId.nextPageId - 1].location}</div>
          </div>

      </Link>
    </div>
  )
}

export default Page;
