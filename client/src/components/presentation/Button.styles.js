import styled from 'styled-components';

export const Button = styled.button`
  background: #3C3C3C;
  color: white;
  border-radius: 50px;
  margin: 0 1em;
  padding: 0.75em 2em;
  border-style: none;
  border: 2px solid #333333;
  font-family: 'Poppins', sans-serif;

  &:hover {
  background-color: black;
  cursor: pointer;
  };

`;

export const LargeButton = styled.button`
  background-color: #3C3C3C;
  color: white;
  border-radius: 10px;
  border-style: none;
  margin-bottom: 40px;
  font-size: 14px;
  height: 50px;
  width: 100%;

  &:hover {
    background-color: black;
    cursor: pointer;
  };
`;

export const LinkButton = styled.button`
  all: unset;
  text-decoration: none;
  color: #3F72AF;

  &:hover {
    color: #3F72AF;
    cursor: pointer;
    text-decoration: underline;
  }
`;
