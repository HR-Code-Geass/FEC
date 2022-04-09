import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const ThumbnailBar = ({ thumbnails }) => (
  <ThumbnailContainer>
    {thumbnails.map((imgURL) => (
      <Thumbnail
        src={imgURL}
        alt=""
        key={imgURL}
      />
    ))}
  </ThumbnailContainer>
);

ThumbnailBar.propTypes = {
  thumbnails: PropTypes.instanceOf(Array).isRequired,
};

export default ThumbnailBar;
