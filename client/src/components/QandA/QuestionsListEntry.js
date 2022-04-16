import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import QuestionsListEntryAnswer from './QuestionsListEntryAnswer';
import AddAnswer from './AddAnswer';

const Button = styled.button`
  display: flex;
  color: black;
  margin: 0 1em;
  padding: 0.75em 2em;
  background: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
`;

const UnstyledButton = styled.button`
  all: unset;
  text-decoration: underline;

  &:hover {
    color: #006;
    cursor: pointer;
  }
`;

const QA = styled.td`
  vertical-align: top;
  width: fit-content;
`;

const QAText = styled.td`
  vertical-align: top;
`;

const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Question = styled.div`
`;

const QuestionLinks = styled.div`
`;

// Comparator to help sort by "helpfulness"
function helpfulnessComparator(a, b) {
  return b.helpfulness - a.helpfulness;
}

// Comparator to prioritize answers from sellers
function sellerComparator(a, b) {
  return (b.answerer_name === 'Seller') - (a.answerer_name === 'Seller');
}

const QuestionsListEntry = ({ question, productName }) => {
  const [displayLimit, setDisplayLimit] = useState(2); // number of answers to display
  const [markedHelpful, setMarkedHelpful] = useState(false);
  const [answers, setAnswers] = useState(
    Object.values(question.answers || {}).sort(helpfulnessComparator).sort(sellerComparator),
  );

  const { question_id: questionID, question_body: questionBody } = question;

  const markHelpful = () => {
    if (markedHelpful) return; // can only mark an answer helpful once

    axios.put(`/qa/questions/${question.question_id}/helpful`)
      .then(() => setMarkedHelpful(true))
      .catch((err) => console.error(`Error marking question helpful: ${err}`));
  };

  const addAnswerToList = (newAnswer) => setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);

  const buttonToDisplay = () => {
    if (answers.length <= 2) return null;

    if (answers.length > displayLimit) {
      return (
        <Button type="button" onClick={() => setDisplayLimit(Number.POSITIVE_INFINITY)}>
          <ChevronDownIcon style={{ width: '20px' }} />
          SEE MORE ANSWERS
        </Button>
      );
    }

    return (
      <Button type="button" onClick={() => setDisplayLimit(2)}>
        <ChevronUpIcon style={{ width: '20px' }} />
        COLLAPSE ANSWERS
      </Button>
    );
  };

  return (
    <>
      <tr>
        <QA><b>Q:</b></QA>
        <QAText>
          <QuestionContainer>
            <Question>
              {questionBody}
            </Question>
            <QuestionLinks>
              Helpful?&nbsp;
              <UnstyledButton type="button" onClick={markHelpful}>Yes</UnstyledButton>
              {` (${question.question_helpfulness + markedHelpful}) | `}
              <AddAnswer
                productName={productName}
                questionID={questionID}
                questionBody={questionBody}
                addAnswerToList={addAnswerToList}
              />
            </QuestionLinks>
          </QuestionContainer>
        </QAText>
      </tr>
      <tr>
        <QA><b>A:</b></QA>
        <QAText>
          {answers.map((ans, i) => (
            (i >= displayLimit)
              ? null
              : <QuestionsListEntryAnswer answer={ans} key={ans.id} />
          ))}
        </QAText>
      </tr>
      <tr>
        <td />
        <td>
          {buttonToDisplay()}
        </td>
      </tr>
    </>
  );
};

QuestionsListEntry.propTypes = {
  question: PropTypes.instanceOf(Object).isRequired,
  productName: PropTypes.string.isRequired,
};

export default QuestionsListEntry;
