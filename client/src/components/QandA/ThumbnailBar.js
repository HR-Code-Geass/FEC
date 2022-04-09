import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../Modal';

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: start;
  padding: 0;
  margin: 0;
`;

const Thumbnail = styled.img`
  max-width: 15%;
  max-height: 50px;
  margin: 0 5px 0 0;
`;

const ThumbnailBar = ({ thumbnails, clickable = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleThumbnailClick = (imgURL) => {
    if (clickable) {
      setSelectedImage(imgURL);
      setIsModalOpen(true);
    }
  };

  return (
    <ThumbnailContainer>
      {thumbnails.map((imgURL) => (
        <Thumbnail
          src={imgURL}
          alt=""
          key={imgURL}
          onClick={() => handleThumbnailClick(imgURL)}
        />
      ))}
      {clickable && isModalOpen
        && (
          <Modal
            title=""
            onClose={() => setIsModalOpen(false)}
            content={<Image src={selectedImage} alt="" />}
          />
        )}
    </ThumbnailContainer>
  );
};

ThumbnailBar.propTypes = {
  thumbnails: PropTypes.instanceOf(Array).isRequired,
  clickable: PropTypes.bool.isRequired,
};

export default ThumbnailBar;
