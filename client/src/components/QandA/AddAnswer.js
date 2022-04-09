import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LinkButton } from '../presentation/Button.styles';
import Modal from '../Modal';
import AddAnswerModalContent from './AddAnswerModalContent';

const AddAnswer = ({ productID, questionID, questionBody }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <LinkButton onClick={() => setIsModalOpen(true)}>
        Add Answer
      </LinkButton>
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

AddAnswer.propTypes = {
  productID: PropTypes.number.isRequired,
  questionID: PropTypes.number.isRequired,
  questionBody: PropTypes.string.isRequired,
};

export default AddAnswer;
