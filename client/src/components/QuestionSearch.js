import React, { useState } from 'react';
import styled from 'styled-components';

const QuestionInput = styled.input`
  width: 100%;
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
          placeholder="Have a question? Search for answers..."
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default QuestionSearch;
