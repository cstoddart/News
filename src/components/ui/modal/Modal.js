import React from 'react';

import {
  BackgroundOverlay,
  ModalContent,
} from './ModalStyles';

const Modal = ({ children, closeModal }) => (
  <BackgroundOverlay>
    <ModalContent>
      <button onClick={closeModal}>
        Back
      </button>
      {children}
    </ModalContent>
  </BackgroundOverlay>
);

export default Modal;
