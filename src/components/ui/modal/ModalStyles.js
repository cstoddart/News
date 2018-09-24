import styled from 'styled-components';

export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000bf;
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  background-color: white;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 15px;
  border-radius: 5px;
`;
