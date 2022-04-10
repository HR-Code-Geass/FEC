import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import AskQuestion from './AskQuestion';
import QuestionSearch from './QuestionSearch';
import QuestionsList from './QuestionsList';
import MoreQuestionsButton from './MoreQuestionsButton';

const LIMIT_INCREMENT = 2;

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

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [numberQuestions, setNumberQuestions] = useState(0);
  const [questionFilter, setQuestionFilter] = useState('');
  const [questionsDisplayLimit, setQuestionsDisplayLimit] = useState(2);
  const [nextPage, setNextPage] = useState(1);
  const [allQuestionsLoaded, setAllQuestionsLoaded] = useState(false);
  const productID = 62631; // this will obviously need to be passed as a prop/through context

  const filteredQuestions = questionFilter
    ? questions.filter((q) => q.question_body.toLowerCase().includes(questionFilter.toLowerCase()))
    : questions;

  // comparator to sort questions by "question_helpfulness" property
  // const helpfulnessComparator = (a, b) => b.question_helpfulness - a.question_helpfulness;
  // NOTE: Questions appear to be pre-sorted by helpfulness; do double-check!

  const fetchNextQuestions = () => {
    if (!allQuestionsLoaded) {
      const count = (nextPage > 1) ? LIMIT_INCREMENT : LIMIT_INCREMENT * 3;
      const pageIncrement = (nextPage > 1) ? 1 : 3;

      axios.get(
        '/qa/questions',
        { params: { product_id: productID, page: nextPage, count } },
      )
        .then((res) => {
          // setQuestions(res.data.results.sort(helpfulnessComparator));
          const { results } = res.data;
          if (!results.length || (nextPage === 1 && results.length < 4)) {
            setAllQuestionsLoaded(true);
          }
          setNumberQuestions((prev) => prev + results.length);
          setQuestions((prev) => [...prev, ...res.data.results]);
          setNextPage((prev) => prev + pageIncrement);
        })
        .catch((err) => console.error(`Error getting questions & answers: ${err}`));
    }
  };

  // When the display limit changes, pre-fetch the next 2 questions
  useEffect(
    () => fetchNextQuestions(),
    [questionsDisplayLimit],
  );

  return (
    <QAContainer>
      Questions & Answers Component
      <AskQuestion productID={productID} />
      <QuestionSearch setQuestionFilter={setQuestionFilter} />
      <QuestionsList
        questions={filteredQuestions}
        displayLimit={questionsDisplayLimit}
        productID={productID}
      />
      <ButtonContainer>
        <MoreQuestionsButton
          numberQuestions={numberQuestions}
          displayLimit={questionsDisplayLimit}
          setDisplayLimit={setQuestionsDisplayLimit}
        />
      </ButtonContainer>
    </QAContainer>
  );
};

export default Questions;
