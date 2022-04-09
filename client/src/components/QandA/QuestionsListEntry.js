import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import QuestionsListEntryAnswer from './QuestionsListEntryAnswer';

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

const QuestionsListEntry = ({ question }) => {
  const [displayLimit, setDisplayLimit] = useState(2); // number of answers to display
  const [markedHelpful, setMarkedHelpful] = useState(false);

  const markHelpful = () => {
    if (markedHelpful) return; // can only mark an answer helpful once

    axios.put(`/qa/questions/${question.question_id}/helpful`)
      .then(() => setMarkedHelpful(true))
      .catch((err) => console.error(`Error marking question helpful: ${err}`));
  };

  let { question_body: questionBody, answers } = question;

  // comparator to sort questions by "question_helpfulness" property
  const helpfulnessComparator = (a, b) => b.helpfulness - a.helpfulness;
  // TODO: Put answers by seller at the top!
  answers = Object.values(answers).sort(helpfulnessComparator);

  const buttonToDisplay = () => {
    if (answers.length <= 2) return null;

    if (answers.length > displayLimit) {
      return (
        <button type="button" onClick={() => setDisplayLimit(Number.POSITIVE_INFINITY)}>
          SEE MORE ANSWERS
        </button>
      );
    }

    return (<button type="button" onClick={() => setDisplayLimit(2)}>COLLAPSE ANSWERS</button>);
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
              <button type="button" onClick={markHelpful}>Yes</button>
              {` (${question.question_helpfulness + markedHelpful}) | `}
              <button type="button" onClick={() => {}}>Add Answer</button>
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
              : <QuestionsListEntryAnswer answer={ans} key={i} />
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

export default QuestionsListEntry;
