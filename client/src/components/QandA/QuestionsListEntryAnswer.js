import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import { LinkButton } from '../presentation/Button.styles';
import ThumbnailBar from './ThumbnailBar';

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

  const {
    body, answerer_name: answererName, helpfulness, photos,
  } = answer;
  let { date } = answer;
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
    : <LinkButton type="button" onClick={sendReport}>Report</LinkButton>;

  const user = (answererName === 'Seller')
    ? <b>Seller</b>
    : answererName;

  return (
    <>
      <AnswerText>{body}</AnswerText>
      <ThumbnailBar thumbnails={photos} clickable />
      <ByLine>
        {'by '}
        {user}
        {`, ${date} | Helpful? `}
        <LinkButton type="button" onClick={markHelpful}>Yes</LinkButton>
        {` (${helpfulness + markedHelpful}) | `}
        {reportAnswer}
      </ByLine>
    </>
  );
};

QuestionListEntryAnswer.propTypes = {
  answer: PropTypes.instanceOf(Object).isRequired,
};

export default QuestionListEntryAnswer;
