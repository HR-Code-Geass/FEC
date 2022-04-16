import styled from 'styled-components';

export const Button = styled.button`
  display: block;
  margin: auto;
  background: #3C3C3C;
  color: white;
  border-radius: 50px;
  padding: 0.75em 2em;
  border-style: none;
  border: 2px solid #333333;
  font-family: 'Poppins', sans-serif;
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
  background-color: black;
  cursor: pointer;
  };
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
`;

export const Disclaimer = styled.span`
  display: block;
  width: fit-content;
  font-size: 10px;
`;

export const Error = styled.h6`
  color: red;
  padding: 0;
  margin: 0;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
`;

export const PhotoInput = styled.input`
  width: 100%;
`;

export const TextArea = styled.textarea`
  display: block;
  width: 100%
`;

export const Success = styled.h6`
  color: green;
  padding: 0;
  margin: 0;
`;
