import styled from 'styled-components';

export const Button = styled.button`
  background: transparent;
  color: white;
  border-radius: 3px;
  background-color: #112D4E;
  margin: 0 1em;
  padding: 0.25em 1em;
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
  text-decoration: underline;

  &:hover {
    color: #006;
    cursor: pointer;
  }
`;
