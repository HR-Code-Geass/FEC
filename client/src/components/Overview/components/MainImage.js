import React, { useState } from 'react';
import PropTypes from 'prop-types';

function MainImage({ image }) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  return (
    <div
      style={{
        height: '600px',
        width: '550px',
        position: 'relative',
        transform: 'translateX(-40px)',
      }}
    >
      <img
        src={image}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          cursor: `${showMagnifier ? 'zoom-out' : 'zoom-in'}`,
        }}
        onClick={(e) => {
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(!showMagnifier);
        }}
        onMouseMove={(e) => {
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();
          const x1 = e.pageX - left - window.pageXOffset;
          const y1 = e.pageY - top - window.pageYOffset;
          setXY([x1, y1]);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
        aria-hidden="true"
        alt="img"
      />

      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',
          pointerEvents: 'none',
          height: `${imgHeight}px`,
          width: `${imgWidth}px`,
          transform: 'translateY(-606.5px)',
          backgroundImage: `url('${image}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${imgWidth * 2.5}px ${
            imgHeight * 2.5
          }px`,
          backgroundPositionX: `${(-x * 2.5) / 1.7}px`,
          backgroundPositionY: `${(-y * 2.5) / 1.7}px`,
        }}
      />
    </div>
  );
}

MainImage.propTypes = {
  image: PropTypes.string.isRequired,
};

export default MainImage;
