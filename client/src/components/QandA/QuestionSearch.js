import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const QuestionInput = styled.input`
  width: 90%;
  border-radius: 50px;
  border-style: none;
  border: 1px solid black;
  padding: 10px;
`;

const QuestionSearch = ({ setQuestionFilter }) => {
  const [userQuery, setUserQuery] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`Searching for question: '${userQuery}'`);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setUserQuery(query);
    const filter = query.length > 2
      ? query
      : '';
    setQuestionFilter(filter);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <QuestionInput
          type="text"
          value={userQuery}
          onChange={handleInputChange}
          placeholder="Search Keyword"
          autoComplete="off"
        />
      </form>
    </div>
  );
};

QuestionSearch.propTypes = {
  setQuestionFilter: PropTypes.func.isRequired,
};

export default QuestionSearch;
