import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchDiv = styled.div`
  width: 100%
`;

const Searchinput = styled.input`
  width: 100%;
  border-radius: 50px;
  border-style: none;
  border: 1px solid black;
  padding: 10px
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
    <SearchDiv>
      <label htmlFor="search">
        <Searchinput style={{ width: '100%' }} placeholder="Find Reviews" onChange={(e) => { setKey(e.target.value); }} />
      </label>
    </SearchDiv>
  );
};

ReviewSearch.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  setReviewsData: PropTypes.func.isRequired,
};

export default ReviewSearch;
