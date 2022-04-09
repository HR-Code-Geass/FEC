import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import AskQuestion from './AskQuestion';
import QuestionSearch from './QuestionSearch';
import QuestionsList from './QuestionsList';

// This is just for me to quickly see my own work. This will be removed.
const QAContainer = styled.div`
  background: transparent;
  color: #111;
  border-radius: 3px;
  border-color: red;
  background-color: #eee;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [questionFilter, setQuestionFilter] = useState('');
  const productID = 62634; // this will obviously need to be passed as a prop/through context

  const filteredQuestions = questionFilter
    ? questions.filter((q) => q.question_body.includes(questionFilter))
    : questions;

  // comparator to sort questions by "question_helpfulness" property
  const helpfulnessComparator = (a, b) => b.question_helpfulness - a.question_helpfulness;

  useEffect(() => {
    axios.get('/qa/questions', { params: { product_id: productID } })
      .then((res) => setQuestions(res.data.results.sort(helpfulnessComparator)))
      .catch((err) => console.error(`Error getting questions & answers: ${err}`));
  }, []);

  return (
    <QAContainer>
      Questions & Answers Component
      <AskQuestion productID={productID} />
      <QuestionSearch setQuestionFilter={setQuestionFilter} />
      <QuestionsList questions={filteredQuestions} productID={productID} />
    </QAContainer>
  );
};

export default Questions;
