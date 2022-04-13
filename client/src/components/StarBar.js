import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Bar = styled.div`
  background-color: #F9F7F7;
  width: 100px;
  height: 25px;
  position: relative
`;

const InsideBar = styled.div`
  background-color: black;
  margin-left: 1px;
  margin-right: 1px;
  height: 100%;
`;

const StarBar = ({ rate }) => {
  const percentage = `${(rate / 5) * 100}%`;
  return (
    <Bar>
      <InsideBar style={{
        width: percentage,
      }}
      />
      <img
        className="star-scale"
        src="https://i.ibb.co/rZpmkb3/5-star.png"
        alt="starbar"
        style={{
          width: '101%', position: 'absolute', top: '-3%',
        }}
      />
    </Bar>
  );
};

StarBar.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default StarBar;
