import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as Form from '../presentation/ModalForm.styles';

const AskQuestionModalContent = ({ productID, onClose, productName }) => {
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
    axios.post('/qa/questions', {
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

    return null;
  };

  return (
    <Form.Container>
      <h3 style={{ margin: '5px' }}>{`About the ${productName}`}</h3>
      {errorMessage && <Form.Error>{errorMessage}</Form.Error>}
      {successMessage && <Form.Success>{successMessage}</Form.Success>}
      <Form.Form onSubmit={handleFormSubmit}>
        <label htmlFor="question">Question</label>
        <Form.TextArea
          name="question"
          rows="4"
          cols="50"
          maxLength="1000"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder=""
        />
        <label htmlFor="nickname">Nickname</label>
        <Form.Input
          name="nickname"
          type="text"
          maxLength="60"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Example: jackson11!"
        />
        <Form.Disclaimer>
          For privacy reasons, do not use your full name or email address.
        </Form.Disclaimer>
        <label htmlFor="email">Email address</label>
        <Form.Input
          name="email"
          type="text"
          maxLength="60"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
        <Form.Disclaimer>
          For authentication reasons, you will not be emailed.
        </Form.Disclaimer>

        <Form.Button type="submit">Submit Question</Form.Button>

      </Form.Form>
    </Form.Container>
  );
};

AskQuestionModalContent.propTypes = {
  productID: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
};

export default AskQuestionModalContent;
