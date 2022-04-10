import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../presentation/Button.styles';
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

const QuestionsList = ({ questions, displayLimit, productID }) =>
// const [displayLimit, setDisplayLimit] = useState(2); // number of questions to display

// const MoreAnsweredQuestionsButton = (
//   <Button
//     type="button"
//     onClick={() => setDisplayLimit(Number.POSITIVE_INFINITY)}
//   >
//     MORE ANSWERED QUESTIONS
//   </Button>
// );

// const CollapseQuestionsButton = (
//   <Button
//     type="button"
//     onClick={() => setDisplayLimit(2)}
//   >
//     COLLAPSE QUESTIONS
//   </Button>
// );

  (
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
      {/* {questions.length > displayLimit
        ? MoreAnsweredQuestionsButton
        : (questions.length > 2 && CollapseQuestionsButton) || null} */}
    </QLContainer>
  );
QuestionsList.propTypes = {
  questions: PropTypes.instanceOf(Array).isRequired,
  displayLimit: PropTypes.number.isRequired,
  productID: PropTypes.number.isRequired,
};

export default QuestionsList;
