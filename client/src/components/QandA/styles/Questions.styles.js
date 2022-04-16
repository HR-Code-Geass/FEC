import styled from 'styled-components';

export const QAContainer = styled.div`
  background: transparent;
  /* color: #111; */
  border-radius: 3px;
  border-color: red;
  /* background-color: #eee; */
  width: 1000px;
  margin: 0 1em;
  padding: 0.25em 1em;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export const QABody = styled.div`
  display: flex;
`;

export const QALeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-right: 20px;
`;

export const QARightDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
