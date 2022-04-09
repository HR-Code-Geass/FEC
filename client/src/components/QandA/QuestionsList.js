import React, { useState } from 'react';
import styled from 'styled-components';

import QuestionsListEntry from './QuestionsListEntry';

const Button = styled.button`
  background: transparent;
  color: white;
  border-radius: 3px;
  background-color: #112D4E;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

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

const QuestionsList = ({ questions, productID }) => {
  const [displayLimit, setDisplayLimit] = useState(4); // number of questions to display

  const MoreAnsweredQuestionsButton = (
    <Button
      type="button"
      onClick={() => setDisplayLimit(Number.POSITIVE_INFINITY)}
    >
      MORE ANSWERED QUESTIONS
    </Button>
  );

  const CollapseQuestionsButton = (
    <Button
      type="button"
      onClick={() => setDisplayLimit(4)}
    >
      COLLAPSE QUESTIONS
    </Button>
  );

  return (
    <QuestionsTable>
      <colgroup>
        <QAColumn span="1" />
        <QATextColumn span="1" />
      </colgroup>
      <tbody>
        {questions?.map((q, i) => (
          (i >= displayLimit)
            ? null
            : <QuestionsListEntry question={q} key={i} productID={productID} />
        ))}
        <tr>
          <td colSpan="2" style={{ textAlign: 'center' }}>
            {questions.length > displayLimit
              ? MoreAnsweredQuestionsButton
              : (questions.length > 2 && CollapseQuestionsButton) || null}
          </td>
        </tr>
      </tbody>
    </QuestionsTable>
  );
};

export default QuestionsList;
