import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';

const AnswerText = styled.p`
  padding: 0;
  margin: 2px 0 0;
  font-size: 14px;
`;

const ByLine = styled.p`
  color: #666;
  font-size: 12px;
`;

const Report = styled.span`
  color: red;
`;

const QuestionListEntryAnswer = ({ answer }) => {
  const [markedHelpful, setMarkedHelpful] = useState(false);
  const [reported, setReported] = useState(false);

  let {
    id, body, date, answerer_name, helpfulness, photos,
  } = answer;
  date = moment(date).format('MMMM dS, yyyy');

  const sendReport = () => {
    axios.put(`/qa/answers/${answer.id}/report`)
      .then(() => setReported(true))
      .catch((err) => console.error(`Error reporting answer: ${err}`));
  };

  const markHelpful = () => {
    if (markedHelpful) return; // can only mark an answer helpful once

    axios.put(`/qa/answers/${answer.id}/helpful`)
      .then(() => setMarkedHelpful(true))
      .catch((err) => console.error(`Error marking question helpful: ${err}`));
  };

  const reportAnswer = reported
    ? <Report>Reported</Report>
    : <button type="button" onClick={sendReport}>Report</button>;

  return (
    <>
      {/* {JSON.stringify(answer, null, 2)} */}
      <AnswerText>{body}</AnswerText>
      <ByLine>
        by
        {' '}
        {answerer_name}
        ,
        {' '}
        {date}
        {' '}
        |
        Helpful?
        {' '}
        <button
          type="button"
          onClick={markHelpful}
        >
          Yes
        </button>
        {' '}
        (
        {helpfulness + markedHelpful}
        ) |&nbsp;
        {reportAnswer}
      </ByLine>
    </>
  );
};

export default QuestionListEntryAnswer;
