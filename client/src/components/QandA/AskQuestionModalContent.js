import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
`;

const QuestionForm = styled.form`
  width: 100%;
`;

const QuestionTextArea = styled.textarea`
  display: block;
  width: 100%
`;

const FormInput = styled.input`
  width: 100%;
`;

const Disclaimer = styled.span`
  display: block;
  width: fit-content;
  font-size: 10px;
`;

const Button = styled.button`
  display: block;
  margin: auto;
`;

const Error = styled.h6`
  color: red;
  padding: 0;
  margin: 0;
`;

const Success = styled.h6`
  color: green;
  padding: 0;
  margin: 0;
`;

const AskQuestionModalContent = ({ productID, onClose }) => {
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // One of the required fields is empty
    if (!question || !nickname || !email) {
      const errmsg = 'You must enter the following: '
        + `${(!question && 'Question') || ''}`
        + `${(!question && !nickname && ', ') || ''}${(!nickname && 'Nickname') || ''}`
        + `${((!question || !nickname) && !email && ', ') || ''}${(!email && 'Email') || ''}`;
      return setErrorMessage(errmsg);
    }

    // Email address is invalid
    if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
      return setErrorMessage('You must enter the following: A valid email address');
    }

    setErrorMessage('');
    return axios.post('/qa/questions', {
      body: question,
      name: nickname,
      email,
      product_id: productID,
    })
      .then(() => {
        setSuccessMessage('Question submitted!');
        setTimeout(onClose, 500);
      })
      .catch((err) => console.error(`Error posting new question: ${err}`));
  };

  return (
    <Container>
      <h2>{`About the [Product w/ ID ${productID}]`}</h2>
      {errorMessage && <Error>{errorMessage}</Error>}
      {successMessage && <Success>{successMessage}</Success>}
      <QuestionForm onSubmit={handleFormSubmit}>
        <label htmlFor="question">Question</label>
        <QuestionTextArea
          name="question"
          rows="4"
          cols="50"
          maxLength="1000"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder=""
        />
        <label htmlFor="nickname">Nickname</label>
        <FormInput
          name="nickname"
          type="text"
          maxLength="60"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Example: jackson11!"
        />
        <Disclaimer>For privacy reasons, do not use your full name or email address.</Disclaimer>
        <label htmlFor="email">Email address</label>
        <FormInput
          name="email"
          type="text"
          maxLength="60"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
        <Disclaimer>For authentication reasons, you will not be emailed.</Disclaimer>
        <Button type="submit">Submit Question</Button>
      </QuestionForm>
    </Container>
  );
};

AskQuestionModalContent.propTypes = {
  productID: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AskQuestionModalContent;
