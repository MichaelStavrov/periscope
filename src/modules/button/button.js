import React from 'react';
import './button.css';

function Button({ text, color, link }) {
  return (
    <a href={link} target='_blank'>
      <div className='button' style={{ backgroundColor: `${color}` }}>
        <div className='button__text'>{text}</div>
      </div>
    </a>
  )
}

export default Button;
