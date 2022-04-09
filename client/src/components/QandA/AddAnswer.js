import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import AddAnswerModalContent from './AddAnswerModalContent';

const Button = styled.button`
  all: unset;
  text-decoration: underline;

  &:hover {
    color: #006;
    cursor: pointer;
  }
`;

const AddAnswer = ({ productID, questionID, questionBody }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Add Answer
      </Button>
      {isModalOpen
        && (
        <Modal
          title="Submit your Answer"
          content={(
            <AddAnswerModalContent
              onClose={() => setIsModalOpen(false)}
              productID={productID}
              questionID={questionID}
              questionBody={questionBody}
            />
          )}
          onClose={() => setIsModalOpen(false)}
        />
        )}
    </>
  );
};

export default AddAnswer;
