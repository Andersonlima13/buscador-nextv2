// components/GenericModal.jsx
"use client"
import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  /* Estilos do modal container */
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const GenericModal = ({
  isOpen,
  onClose,
  title,
  children,
  footerActions
}) => {
  if (!isOpen) return null;

  return (
    <ModalContainer>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalHeader>
          
          <ModalContent>
            {children}
          </ModalContent>
          
          {footerActions && (
            <ModalFooter>
              {footerActions}
            </ModalFooter>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};