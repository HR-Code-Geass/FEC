import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const ModalContent = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 650px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
`;

const ModalHeader = styled.div`
padding: 2px 16px;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
background-color: #555;
color: white;
`;

const ModalBody = styled.div`
  padding: 2px 16px;
`;

const CloseSpan = styled.span`
  color: #222;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: #a00;
    text-decoration: none;
    cursor: pointer;
  }
`;

/*
* To use this properly, create a piece of state in your component where you want
* to create a modal that determines whether the modal is visible and pass a
* function that sets it to false as the `onClose` prop. Clicking the x or clicking
* outside the modal should then properly close it.
*/
const Modal = ({ title, content, onClose }) => ReactDOM.createPortal(
  <ModalContainer onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <ModalHeader>
        <CloseSpan onClick={onClose}>
          &times;
        </CloseSpan>
        <h2>{title}</h2>
      </ModalHeader>
      <ModalBody>
        {content}
      </ModalBody>
    </ModalContent>
  </ModalContainer>,
  document.querySelector('#modal'),
);

export default Modal;
