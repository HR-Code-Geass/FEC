import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ThumbnailBar from './ThumbnailBar';
import * as Form from '../presentation/ModalForm.styles';

const AddAnswerModalContent = ({
  productID, questionBody, questionID, onClose,
}) => {
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!images.length) return;
    setImageURLs(images.map((img) => URL.createObjectURL(img)));
  }, [images]);

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // One of the required fields is empty
    if (!answer || !nickname || !email) {
      const errmsg = 'You must enter the following: '
        + `${(!answer && 'Answer') || ''}`
        + `${(!answer && !nickname && ', ') || ''}${(!nickname && 'Nickname') || ''}`
        + `${((!answer || !nickname) && !email && ', ') || ''}${(!email && 'Email') || ''}`;
      return setErrorMessage(errmsg);
    }

    // Email address is invalid
    if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
      return setErrorMessage('You must enter the following: A valid email address');
    }

    setErrorMessage('');
    axios.post(`/qa/questions/${questionID}/answers`, {
      body: answer,
      name: nickname,
      email,
      photos: imageURLs,
    })
      .then(() => {
        setSuccessMessage('Answer submitted!');
        setTimeout(onClose, 500);
      })
      .catch((err) => console.error(`Error posting new question: ${err}`));

    return null;
  };

  return (
    <Form.Container>
      <h2>{`[Product w/ ID ${productID}]: ${questionBody}`}</h2>
      {errorMessage && <Form.Error>{errorMessage}</Form.Error>}
      {successMessage && <Form.Success>{successMessage}</Form.Success>}
      <Form.Form onSubmit={handleFormSubmit}>
        <label htmlFor="answer">Answer(*)</label>
        <Form.TextArea
          name="answer"
          rows="4"
          cols="50"
          maxLength="1000"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder=""
        />
        <label htmlFor="nickname">Nickname(*)</label>
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
        <label htmlFor="email">Email address(*)</label>
        <Form.Input
          name="email"
          type="text"
          maxLength="60"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jack@email.com"
        />
        <Form.Disclaimer>
          For authentication reasons, you will not be emailed.
        </Form.Disclaimer>
        <label htmlFor="photos">Upload photos:</label>
        <Form.PhotoInput type="file" name="photos" accept="image/*" onChange={handleImageChange} />
        {(imageURLs?.length && <ThumbnailBar thumbnails={imageURLs} />) || null}
        <Form.Button type="submit">Submit Answer</Form.Button>
      </Form.Form>
    </Form.Container>
  );
};

AddAnswerModalContent.propTypes = {
  productID: PropTypes.number.isRequired,
  questionBody: PropTypes.string.isRequired,
  questionID: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddAnswerModalContent;
