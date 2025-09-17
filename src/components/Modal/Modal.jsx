import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button.jsx";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalActions,
} from "./StyledModal.jsx";

const Modal = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <Button variant="secondary" size="small" onClick={onClose}>
            X
          </Button>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
        {actions && <ModalActions>{actions}</ModalActions>}
      </ModalContainer>
    </Overlay>,
    document.body
  );
};

export default Modal;
