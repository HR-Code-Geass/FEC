import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Searchinput = styled.input`
  width: 100%
`;

const ReviewSearch = ({ data, setReviewsData }) => {
  const [searchdata, setData] = useState(data);
  const [key, setKey] = useState('');
  useEffect(() => {
    setData(data);
    if (key.length >= 3) {
      const searchedData = data.filter((item) => item.body.toLowerCase().includes(key.toLowerCase())
        || item.summary.toLowerCase().includes(key.toLowerCase()));
      setReviewsData(searchedData);
    } else if (key.length < 3 && key.length > 1) {
      setReviewsData(data);
    }
  }, [data, searchdata, key]);
  return (
    <Searchinput onChange={(e) => { setKey(e.target.value); }} />
  );
};

ReviewSearch.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setReviewsData: PropTypes.func.isRequired,
};

export default ReviewSearch;
