import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import AskQuestionModalContent from './AskQuestionModalContent';
import { Button } from '../presentation/Button.styles';

const AskQuestion = ({ productID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Ask a question</Button>
      {isModalOpen
        && (
        <Modal
          title="Ask Your Question"
          onClose={() => setIsModalOpen(false)}
          content={(
            <AskQuestionModalContent
              onClose={() => setIsModalOpen(false)}
              productID={productID}
            />
          )}
        />
        )}
    </>
  );
};

AskQuestion.propTypes = {
  productID: PropTypes.number.isRequired,
};

export default AskQuestion;
