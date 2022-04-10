import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../presentation/Button.styles';

const LIMIT_INCREMENT = 2;

const MoreQuestionsButton = ({ numberQuestions, displayLimit, setDisplayLimit }) => {
  const mode = (displayLimit < numberQuestions) ? 'expand' : 'collapse';
  const buttonText = (mode === 'expand') ? 'MORE ANSWERED QUESTIONS' : 'COLLAPSE QUESTIONS';

  const handleButtonClick = () => {
    setDisplayLimit((prevLimit) => ((mode === 'expand')
      ? prevLimit + LIMIT_INCREMENT
      : LIMIT_INCREMENT
    ));
  };

  return <Button type="button" onClick={handleButtonClick}>{buttonText}</Button>;
};

MoreQuestionsButton.propTypes = {
  numberQuestions: PropTypes.number.isRequired,
  displayLimit: PropTypes.number.isRequired,
  setDisplayLimit: PropTypes.func.isRequired,
};

export default MoreQuestionsButton;
