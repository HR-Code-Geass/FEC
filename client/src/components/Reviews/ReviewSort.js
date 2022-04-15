import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Sort = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Select = styled.select`
  border: none;
`;

const ReviewSort = ({ changeSort, totalCount }) => (
  <div>
    <Sort>
      <p style={{ fontSize: '100%', fontWeight: 'bold' }}>
        {totalCount}
        {' '}
        reviews, sorted by
      </p>
      <Select onChange={(e) => { changeSort(e.target.value); }}>
        <option value="relevant">Relevant</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </Select>
    </Sort>
  </div>
);

ReviewSort.propTypes = {
  changeSort: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default ReviewSort;
