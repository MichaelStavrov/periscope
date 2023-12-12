import React from "react";
import "./video.css";

function Video({ togglePlayer, video, page }) {
  return (
    <div className="video" style={ video ? { display: "flex" } : { display: "none" }}>
      <div className="video__container">
        <div className="video__player-container">
          <iframe className='video__player-frame' src={page.video} frameBorder="0" title="achitecture-video"></iframe>
        </div>
        <div className="video__buttons">
          <div className="video__button video__button-name" style={{ backgroundColor: page.color, textAlign: 'center' }}>
            <p className="video__text" dangerouslySetInnerHTML={{ __html: page.title }} />
          </div>
          <div className="video__button video__button-location">
            <p className="video__text" dangerouslySetInnerHTML={{ __html: page.location }} style={{ color: page.textColor }} />
            <p className="video__text" dangerouslySetInnerHTML={{ __html: page.years }} style={{ color: page.textColor }} />
          </div>
        </div>
        <div className="video__close-button" style={{ backgroundColor: '#F9B94D' }}>
          <img
            className="video__close-icon"
            src="./images/global/close-small.svg"
            onClick={() => togglePlayer(false)}
          />
        </div>
      </div>
    </div>
  )
}

export default Video;
