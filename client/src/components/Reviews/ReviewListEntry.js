import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import {
  CheckIcon,
} from '@heroicons/react/solid';
import ReviewPhotoEntry from './ReviewPhotoEntry';
import StarBar from '../StarBar';

const RatingUser = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Response = styled.div`
  color: black;
  background-color: #F9F7F7;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
`;

const UnstyledButton = styled.button`
  all: unset;
  text-decoration: underline;
  color: #3F72AF;
  &:hover {
    color: #3F72AF;
    cursor: pointer;
  }
`;

const Photos = styled.div`
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;

const ReviewListEntry = ({ review, setDataUpdate }) => {
  const displayLength = 250;
  const [showMoreonClick, setShowMoreonClick] = useState(false);

  const reviewReport = (reviewID) => {
    axios.put(`/reviews/${reviewID}/report`)
      .then((res) => setDataUpdate(res))
      .catch();
  };
  const reviewHelpful = (reviewID) => {
    axios.put(`/reviews/${reviewID}/helpful`)
      .then((res) => setDataUpdate(res))
      .catch();
  };
  return (
    <div>
      <RatingUser>
        <div>
          <StarBar rate={review.rating} />
        </div>
        <div>
          { review.reviewer_name }
          ,
          {' '}
          {(moment(review.date).format('MMM DD, YYYY'))}
        </div>
      </RatingUser>
      <p style={{ fontSize: '140%', fontWeight: 'bold' }} className="title">{review.summary}</p>
      <Photos>
        {review.photos.map((photo) => (
          <ReviewPhotoEntry
            key={photo.id}
            photo={photo}
          />
        ))}
      </Photos>
      {(!showMoreonClick) ? (
        <p>
          {review.body.substring(0, displayLength)}
          {(review.body.length > displayLength) ? (
            <button
              style={{ backgroundColor: 'white', border: 'none', fontWeight: 'bold' }}
              type="button"
              onClick={() => setShowMoreonClick(true)}
            >
              ...Read more
            </button>
          ) : '' }
        </p>
      ) : (
        <p>
          {review.body}
          <button
            style={{ backgroundColor: 'white', border: 'none', fontWeight: 'bold' }}
            type="button"
            onClick={() => setShowMoreonClick(false)}
          >
            ...Read less
          </button>
        </p>
      )}
      <br />

      <div className={(!review.recommend) ? 'hidden' : ''} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <CheckIcon style={{ height: '20px' }} />
        I recommend this product
      </div>

      <Response className={(!review.response) ? 'hidden' : ''}>
        Response:
        {' '}
        { review.response }
      </Response>
      <div style={{ padding: '15px' }}>
        Helpful?
        <UnstyledButton
          type="button"
          style={{ border: 'none', backgroundColor: 'white' }}
          onClick={() => { reviewHelpful(review.review_id); }}
        >
          Yes
        </UnstyledButton>
        (
        {review.helpfulness}
        ) |
        {' '}
        <UnstyledButton
          type="button"
          style={{ border: 'none', backgroundColor: 'white' }}
          onClick={() => { reviewReport(review.review_id); }}
        >
          Report
        </UnstyledButton>
        <hr />
      </div>
    </div>
  );
};

ReviewListEntry.propTypes = {
  review: PropTypes.instanceOf(Object).isRequired,
  setDataUpdate: PropTypes.func.isRequired,
};

export default ReviewListEntry;
