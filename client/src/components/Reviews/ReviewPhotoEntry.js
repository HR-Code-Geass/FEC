import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from './PhotoModal';

const Photos = styled.div`
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;

const ReviewPhotoEntry = ({ photo, setPhotoOnClick, photoOnClick }) => (
  <Photos>
    <div
      role="button"
      key={photo.id}
      onClick={() => { setPhotoOnClick(false); }}
      onKeyPress={() => {}}
      tabIndex="0"
    >
      <Modal
        title="photo"
        content={(
          <img
            style={{ width: '650px' }}
            src={photo.url}
            alt="productPhoto"
          />
            )}
        onClose={setPhotoOnClick}
        close={photoOnClick}
      />
      <img
        src={photo.url}
        width="150"
        alt="productPhoto"
      />
    </div>
  </Photos>
);

ReviewPhotoEntry.propTypes = {
  photo: PropTypes.instanceOf(Object).isRequired,
  setPhotoOnClick: PropTypes.func.isRequired,
  photoOnClick: PropTypes.bool.isRequired,
};

export default ReviewPhotoEntry;
