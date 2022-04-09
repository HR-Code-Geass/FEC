import React, { useState, useEffect } from 'react';
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

const AnswerForm = styled.form`
  width: 100%;
`;

const AnswerTextArea = styled.textarea`
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

const PhotoInput = styled.input`
  width: 100%;
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
`;

const Thumbnail = styled.img`
  width: 15%;
  padding: 0 0 5px 0;
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

const AskQuestionModalContent = ({
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
    // const newImageURLs = [];
    // images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));
    setImageURLs(images.map((im) => URL.createObjectURL(im)));
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
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)) {
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
  };

  return (
    <Container>
      <h2>{`[Product w/ ID ${productID}]: ${questionBody}`}</h2>
      {errorMessage && <Error>{errorMessage}</Error>}
      {successMessage && <Success>{successMessage}</Success>}
      <AnswerForm onSubmit={handleFormSubmit}>
        <label htmlFor="answer">Answer(*)</label>
        <AnswerTextArea
          name="answer"
          rows="4"
          cols="50"
          maxLength="1000"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder=""
        />
        <label htmlFor="nickname">Nickname(*)</label>
        <FormInput
          name="nickname"
          type="text"
          maxLength="60"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Example: jackson11!"
        />
        <Disclaimer>For privacy reasons, do not use your full name or email address.</Disclaimer>
        <label htmlFor="email">Email address(*)</label>
        <FormInput
          name="email"
          type="text"
          maxLength="60"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jack@email.com"
        />
        <Disclaimer>For authentication reasons, you will not be emailed.</Disclaimer>
        <label htmlFor="photos">Upload photos:</label>
        <PhotoInput type="file" name="photos" accept="image/*" onChange={handleImageChange} />
        <ThumbnailContainer>
          {(imageURLs?.length && imageURLs.map((url, i) => (
            <Thumbnail src={url} alt="" key={i} />
          ))) || null}
        </ThumbnailContainer>
        <Button type="submit">Submit Answer</Button>
      </AnswerForm>
    </Container>
  );
};

export default AskQuestionModalContent;
