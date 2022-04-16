import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import AskQuestion from './AskQuestion';
import QuestionSearch from './QuestionSearch';
import QuestionsList from './QuestionsList';
import MoreQuestionsButton from './MoreQuestionsButton';
import { Line } from '../presentation/Line.styles';
import * as QA from './styles/Questions.styles';

const LIMIT_INCREMENT = 2;

const Questions = ({ productID, productName }) => {
  const [questions, setQuestions] = useState([]);
  const [numberQuestions, setNumberQuestions] = useState(0);
  const [questionFilter, setQuestionFilter] = useState('');
  const [questionsDisplayLimit, setQuestionsDisplayLimit] = useState(2);
  const [nextPage, setNextPage] = useState(1);
  const [allQuestionsLoaded, setAllQuestionsLoaded] = useState(false);

  const filteredQuestions = questionFilter
    ? questions.filter((q) => q.question_body.toLowerCase().includes(questionFilter.toLowerCase()))
    : questions;

  const fetchNextQuestions = () => {
    if (!allQuestionsLoaded) {
      const count = (nextPage > 1) ? LIMIT_INCREMENT : LIMIT_INCREMENT * 3;
      const pageIncrement = (nextPage > 1) ? 1 : 3;

      axios.get(
        '/qa/questions',
        { params: { product_id: productID, page: nextPage, count } },
      )
        .then((res) => {
          const { results } = res.data;
          if (!results.length || (nextPage === 1 && results.length < 6)) {
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
  useEffect(fetchNextQuestions, [questionsDisplayLimit]);

  return (
    <QA.QAContainer>
      <Line />
      <h3 style={{ marginBottom: '5px' }}>Questions & Answers</h3>
      <AskQuestion productID={productID} productName={productName} />
      <QA.QABody>
        <QA.QALeftDiv>
          <QuestionSearch setQuestionFilter={setQuestionFilter} />
        </QA.QALeftDiv>
        <QA.QARightDiv>
          {(questions.length
          && (
          <QuestionsList
            questions={filteredQuestions}
            displayLimit={questionsDisplayLimit}
            productName={productName}
          />
          )) || null}
        </QA.QARightDiv>
      </QA.QABody>
      <QA.ButtonContainer>
        <MoreQuestionsButton
          numberQuestions={numberQuestions}
          displayLimit={questionsDisplayLimit}
          setDisplayLimit={setQuestionsDisplayLimit}
        />
      </QA.ButtonContainer>
    </QA.QAContainer>
  );
};

Questions.propTypes = {
  productID: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};

export default Questions;
