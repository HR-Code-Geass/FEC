import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ThumbnailBar from './ThumbnailBar';
import * as Form from '../presentation/ModalForm.styles';

const AddAnswerModalContent = ({
  productName, questionBody, questionID, onClose, addAnswerToList,
}) => {
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [imageURLs, setImageURLs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /* Each time a user selects a file to upload, send it to the back-end to
  try to upload it to ImageBB. Upon success, the server will send a URL
  which we can append to the ImageURLs state. Upon failure, a (hopefully)
  useful message will be sent. We can choose how to handle this gracefully. */
  const handleImageChange = (e) => {
    const fd = new FormData();
    fd.append('image', e.target.files[0]);
    axios.post('/uploadimage', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res) => {
        const { displayURL, message } = res.data;
        if (displayURL) setImageURLs((prevImageURLs) => [...prevImageURLs, displayURL]);
        else console.error(message);
      })
      .catch((err) => console.error(err));
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
        const newAnswer = {
          answerer_name: nickname,
          body: answer,
          helpfulness: 0,
          photos: imageURLs,
          date: new Date(),
          id: Math.floor(Math.random() * 555555555),
        };
        addAnswerToList(newAnswer);
        setTimeout(onClose, 500);
      })
      .catch((err) => console.error(`Error posting new question: ${err}`));

    return null;
  };

  return (
    <Form.Container>
      <h2>{`${productName}: ${questionBody}`}</h2>
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
        {(imageURLs.length < 5)
          && <Form.PhotoInput type="file" name="photos" accept="image/*" onChange={handleImageChange} />}
        {(imageURLs?.length && <ThumbnailBar thumbnails={imageURLs} clickable={false} />) || null}
        <Form.Button type="submit">Submit Answer</Form.Button>
      </Form.Form>
    </Form.Container>
  );
};

AddAnswerModalContent.propTypes = {
  productName: PropTypes.string.isRequired,
  questionBody: PropTypes.string.isRequired,
  questionID: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  addAnswerToList: PropTypes.func.isRequired,
};

export default AddAnswerModalContent;
