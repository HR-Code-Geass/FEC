import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';

const UnstyledButton = styled.button`
  all: unset;
  text-decoration: underline;

  &:hover {
    color: #006;
    cursor: pointer;
  }
`;

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
  date = moment(date, 'YYYY-MM-DDT00:00.00.000Z').format('MMMM DD, yyyy');

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
    : <UnstyledButton type="button" onClick={sendReport}>Report</UnstyledButton>;

  return (
    <>
      {/* {JSON.stringify(answer, null, 2)} */}
      <AnswerText>{body}</AnswerText>
      <ByLine>
        {`by ${answerer_name}, ${date} | Helpful? `}
        <UnstyledButton type="button" onClick={markHelpful}>Yes</UnstyledButton>
        {` (${helpfulness + markedHelpful}) | `}
        {reportAnswer}
      </ByLine>
    </>
  );
};

export default QuestionListEntryAnswer;
