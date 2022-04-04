import React from 'react';
import styled from 'styled-components';

import AskQuestion from './AskQuestion';
import QuestionSearch from './QuestionSearch';
import QuestionsList from './QuestionsList';

// This is just for me to quickly see my own work. This will be removed.
const Container = styled.div`
  background: transparent;
  color: #111;
  border-radius: 3px;
  border-color: red;
  background-color: #eee;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const Questions = () => (
  <Container>
    Questions & Answers Component
    <AskQuestion />
    <QuestionSearch />
    <QuestionsList />
  </Container>
);

export default Questions;
