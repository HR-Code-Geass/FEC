/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from '../Modal';

const Photos = styled.div`
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;

const ReviewPhotoEntry = ({ photo }) => {
  const [photoOnClick, setPhotoOnClick] = useState(false);

  return (
    <Photos>
      {(photoOnClick)
        ? (
          <Modal
            title="Photo"
            content={(
              <img
                style={{ width: '600px', height: 'auto' }}
                src={photo.url}
                alt="productPhoto"
              />
              )}
            onClose={() => setPhotoOnClick(false)}
          />
        )
        : ''}
      <div
        style={{
          backgroundImage: `url(${photo.url})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '150px', height: '100px',
        }}
        role="button"
        name="photo"
        key={photo.id}
        onClick={() => { setPhotoOnClick(true); }}
        onKeyPress={() => {}}
        tabIndex="0"
        aria-label="photo"
      />
    </Photos>
  );
};

ReviewPhotoEntry.propTypes = {
  photo: PropTypes.instanceOf(Object).isRequired,
};

export default ReviewPhotoEntry;
