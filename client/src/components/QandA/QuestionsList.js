import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QuestionsListEntry from './QuestionsListEntry';

const QuestionsTable = styled.table`
  border: none;
  width: 100%;
`;

const QAColumn = styled.col`
  width: 10px;
`;

const QATextColumn = styled.col`
  width: 100%;
`;

const QAContainer = styled.div`
  width: 100%;
  max-height: 40vh;
  overflow-y: auto;
  text-align: left;
`;

const QLContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const QuestionsList = ({ questions, displayLimit, productID }) => (
  <QLContainer>
    <QAContainer>
      <QuestionsTable>
        <colgroup>
          <QAColumn span="1" />
          <QATextColumn span="1" />
        </colgroup>
        <tbody>
          {questions?.map((q, i) => (
            (i >= displayLimit)
              ? null
              : <QuestionsListEntry question={q} key={q.question_id} productID={productID} />
          ))}
        </tbody>
      </QuestionsTable>
    </QAContainer>
  </QLContainer>
);
QuestionsList.propTypes = {
  questions: PropTypes.instanceOf(Array).isRequired,
  displayLimit: PropTypes.number.isRequired,
  productID: PropTypes.number.isRequired,
};

export default QuestionsList;
