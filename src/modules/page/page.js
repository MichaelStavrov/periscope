import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './page.css';
import './navigation.css';
import './comment.css';
import './player.css';
import './info.css';
import './help.css';
import HeaderPage from '../header-page/header-page';
import Slider from '../slider/slider';
import Video from '../video/video';
import { pages } from '../../data/pages.js';


function Page(props) {

  let [ video, toggleVideo ] = useState(false);

  const {pk} = props;
  const currentPageId = Number.parseInt(pk || 0, 10);

  const pageId = {
    currentPageId: currentPageId,
    prevPageId: currentPageId === 1 ? pages.length : currentPageId - 1,
    nextPageId: currentPageId === pages.length ? 1 : currentPageId + 1
  };

  const page = pages[pageId.currentPageId - 1];

  function togglePlayer(par) {
    toggleVideo(par);
  }

  return (
    <Fragment>
      {
        window.innerWidth > 600
        ?
        <PageDesktop
          pageId={pageId}
          page={page}
          currentPageId={currentPageId}
          togglePlayer={togglePlayer}
        />
        :
        <PageMobile
          pageId={pageId}
          page={page}
          currentPageId={currentPageId}
          togglePlayer={togglePlayer}
        />
      }
      <Video
        togglePlayer={togglePlayer}
        video={video}
        page={page}
      />
    </Fragment>
  )
}

function PageDesktop({ pageId, page, currentPageId, togglePlayer }) {
  return (
    <div className='page'>
      <HeaderPage pageId={pageId} pages={pages} page={page} />
      <Link to='/map'>
        <div className='page__close' style={{ backgroundColor: page.color }}>
          <img className='page__close-icon' src='./images/global/close-small.svg' alt='button' />
        </div>
      </Link>

      <div className='page__container'>
        <div className='page__left-container'>
          <Slider slides={page.slider} />
          <Player currentPageId={currentPageId} togglePlayer={togglePlayer} />
          <div className='page__location' style={{ color: page.color }} dangerouslySetInnerHTML={{ __html: page.location }}></div>
          <div className='page__years page-title' style={{ color: page.color }} dangerouslySetInnerHTML={{ __html: page.years }} />
          <div className='page__text page-text' dangerouslySetInnerHTML={{ __html: page.text }} />
          <div className='page__info'>
            <Info
              image={`${currentPageId}-state.svg`}
              title={page.info.stateTitle}
              text={page.info.stateText}
              color={page.color}
            />
            <Info
              image={`${currentPageId}-help.svg`}
              title={page.info.helpTitle}
              text={page.info.helpText}
              color={page.color}
            />
          </div>
          <PageNavigation pageId={pageId} pages={pages} />
        </div>
        <div className='page__right-container'>
          <img className='page__image' src={`./images/pages/${page && page.image}.png`} alt='sight' />
          <img className='page__close-icon' src='./images/global/close-small.svg' alt='button' />
          <h2 className="page__how-should-look" style={{ color: page.color }}>Как должно выглядеть</h2>
          <Comment page={page} />
          <Help currentPageId={currentPageId} link={page.helpLink} />
        </div>
      </div>
    </div>
  )
}








function PageMobile({ pageId, page, currentPageId, togglePlayer }) {
  return (
    <div className='page'>
      <HeaderPage pageId={pageId} pages={pages} page={page} />
      <Link to='/map'>
        <div className='page__close' style={{ backgroundColor: page.color }}>
          <img className='page__close-icon' src='./images/global/close-small.svg' alt='button' />
        </div>
      </Link>

      <div className='page__container'>
        <Slider slides={page.slider} />
        <div className="page__image-container">
          <h2 className="page__how-should-look" style={{ color: page.color }}>Как должно выглядеть</h2>
          <img className='page__image' src={`./images/pages/${page && page.image}.png`} alt='sight' />
        </div>
        <Player currentPageId={currentPageId} togglePlayer={togglePlayer} />
        <div className="page__mobile-content">
          <div className='page__location page-title' style={{ color: page.color }} dangerouslySetInnerHTML={{ __html: page.location }}></div>
          <div className='page__years page-title' style={{ color: page.color }} dangerouslySetInnerHTML={{ __html: page.years }} />
          <div className='page__text page-text' dangerouslySetInnerHTML={{ __html: page.text }} />
          <Comment page={page} />
          <div className='page__info'>
            <Info
              image={`${currentPageId}-state.svg`}
              title={page.info.stateTitle}
              text={page.info.stateText}
              color={page.color}
            />
            <Info
              image={`${currentPageId}-help.svg`}
              title={page.info.helpTitle}
              text={page.info.helpText}
              color={page.color}
            />
          </div>
          <PageNavigation pageId={pageId} pages={pages} />
        </div>
        <Help currentPageId={currentPageId} link={page.helpLink} />
        <img className='page__close-icon' src='./images/global/close-small.svg' alt='button' />
      </div>
    </div>
  )
}

function Help({ currentPageId, link }) {
  return (
    <a className="help" href={link} target="_blank">
      <img className="help__image" src={`./images/help/${currentPageId}.png`} />
      <div className="help__text-container">
        <h3 className="help__title player__text">Хочу помочь</h3>
        <p className="help__text">Об способах поддержки можно почитать <a  className="help__link" href="#" target="_blank">тут</a></p>
      </div>
    </a>
  )
}

function Info({ title, text, image, color }) {
  return (
    <Link className="info">
      <img className="info__image" src={`./images/icons/${image}`} />
      <div className="info__text-container">
        <h3 className="info__title page-title" style={{ color: color }} dangerouslySetInnerHTML={{ __html: title }} />
        <p className="info__text page-text" dangerouslySetInnerHTML={{ __html: text }}></p>
      </div>
    </Link>
  )
}

function Player({ currentPageId, togglePlayer }) {

  let [ containerHeight, setContainerHeight ] = useState('');
  let [ audio, setAudio ] = useState(false);

  function handleResize(e) {
    if (window.innerWidth > 600) {
      const playerContainer = document.querySelector('.player');
      const containerHeight = playerContainer.offsetWidth / 3.5625;
      setContainerHeight(containerHeight);
    }
  }

  window.addEventListener('resize', handleResize);

  useEffect(handleResize);

  return (
    <div
      className="player"
      style={{
        backgroundImage: `url(./images/player/${currentPageId}.png)`,
        height: `${containerHeight}px`
      }}
      onClick={() => togglePlayer(true)}
    >
      <div className="player__container">
        <img className="player__button" src="./images/global/play.png" />
        <p className="player__text">Слушать здание</p>
      </div>
      <audio className="player__audio" src="./holiday.mp3"></audio>
    </div>
  )
}


function Comment({ page }) {
  return (
    <div className='page-comment'>
      <img className='page-comment__photo' src={`./images/photo/${page.comment.photo}`} alt="author" />
      <div className='page-comment__container'>
        <div className='page-comment__author page-title' dangerouslySetInnerHTML={{ __html: page.comment.author }} style={{ color: page.color }}/>
        <div className='page-comment__comment'>Комментарий эксперта</div>
        <div className='page-comment__text page-text' dangerouslySetInnerHTML={{ __html: page.comment.text }}/>
      </div>
    </div>
  )
}


function PageNavigation({ pageId, pages }) {
  return (
    <div className='page-navigation'>
      <Link className='page-navigation__link' to={`/page/${pageId.prevPageId}`}>

          <div className='page-navigation__next' onClick={(() => {window.scrollTo(0, 0)})}>
            <img className='page-navigation__image' src={`./images/pages/${pages[pageId.prevPageId - 1].image}-small.png`} />
            <div className='page-navigation__title' style={{ color: pages[pageId.prevPageId - 1].color}}>{pages[pageId.prevPageId - 1].title}</div>
            <div className='page-navigation__location'>{pages[pageId.prevPageId - 1].location}</div>
          </div>

      </Link>
      <Link className='page-navigation__link' to={`/page/${pageId.nextPageId}`}>

          <div className='page-navigation__prev' onClick={(() => {window.scrollTo(0, 0)})}>
            <img className='page-navigation__image' src={`./images/pages/${pages[pageId.nextPageId - 1].image}-small.png`} />
            <div className='page-navigation__title' style={{ color: pages[pageId.nextPageId - 1].color}}>{pages[pageId.nextPageId - 1].title}</div>
            <div className='page-navigation__location'>{pages[pageId.nextPageId - 1].location}</div>
          </div>

      </Link>
    </div>
  )
}

export default Page;
